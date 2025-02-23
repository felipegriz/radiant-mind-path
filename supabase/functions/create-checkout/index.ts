
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
    console.log('¿Existe STRIPE_SECRET_KEY?:', !!stripeSecretKey);

    if (!stripeSecretKey) {
      throw new Error('La clave secreta de Stripe no está configurada');
    }

    const { event_name, priceId } = await req.json();
    console.log('Datos recibidos:', { event_name, priceId });

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2023-10-16',
      httpClient: Stripe.createFetchHttpClient(),
    });

    console.log('Creando sesión de Stripe...');
    
    const origin = req.headers.get('origin') || 'http://localhost:3000';
    console.log('URL de origen:', origin);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: 'price_1QpbniLMf9X10TxuPxNFb3dE', // Precio fijo para pruebas
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/events/despertar-360`,
      client_reference_id: `${event_name}_${priceId}`,
      locale: 'es',
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
