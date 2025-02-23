
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { Stripe } from "https://esm.sh/stripe@13.10.0?target=deno";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  console.log('Iniciando función create-checkout');

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      headers: corsHeaders,
      status: 200
    });
  }

  try {
    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');
    console.log('Verificando configuración de Stripe');
    console.log('¿Existe STRIPE_SECRET_KEY?:', !!stripeSecretKey);

    if (!stripeSecretKey) {
      throw new Error('La clave secreta de Stripe no está configurada');
    }

    const { event_name } = await req.json();
    console.log('Nombre del evento recibido:', event_name);

    // Configurar Stripe con manejo de errores detallado
    let stripe;
    try {
      stripe = new Stripe(stripeSecretKey, {
        apiVersion: '2023-10-16',
        httpClient: Stripe.createFetchHttpClient(),
      });
      console.log('Stripe inicializado correctamente');
    } catch (error) {
      console.error('Error al inicializar Stripe:', error);
      throw new Error('Error al inicializar la conexión con Stripe');
    }

    // Mapeo de precios con manejo de errores específico
    const STRIPE_PRICE_IDS = {
      'despertar-360-general': 'price_1QpbniLMf9X10TxuPxNFb3dE',
      'despertar-360-vip': 'price_1QvVnrLMf9X10TxuvN6PVKA5',
      'despertar-360-platinum': 'price_1QvVqBLMf9X10TxuctBAazPc'
    };

    const stripePrice = STRIPE_PRICE_IDS[event_name];
    console.log('Precio seleccionado:', { event_name, priceId: stripePrice });

    if (!stripePrice) {
      throw new Error(`No se encontró un precio configurado para: ${event_name}`);
    }

    // Verificar que el precio existe en Stripe
    try {
      await stripe.prices.retrieve(stripePrice);
      console.log('Precio verificado en Stripe');
    } catch (error) {
      console.error('Error al verificar el precio en Stripe:', error);
      throw new Error('El precio especificado no existe en Stripe');
    }

    const origin = req.headers.get('origin') || 'http://localhost:3000';
    console.log('URL de origen:', origin);

    console.log('Creando sesión de checkout...');
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: stripePrice,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/events/despertar-360`,
      client_reference_id: event_name,
      locale: 'es',
      allow_promotion_codes: true,
      customer_creation: 'always',
      billing_address_collection: 'auto',
      payment_intent_data: {
        setup_future_usage: 'off_session',
      },
    });

    console.log('Sesión creada exitosamente:', {
      sessionId: session.id,
      url: session.url
    });

    return new Response(
      JSON.stringify({ 
        sessionId: session.id,
        status: 'success'
      }), {
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json'
        },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error detallado en create-checkout:', error);
    
    return new Response(
      JSON.stringify({
        status: 'error',
        message: error.message || 'Error al procesar el pago',
        details: error.toString()
      }), {
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json'
        },
        status: 200,
      }
    );
  }
});
