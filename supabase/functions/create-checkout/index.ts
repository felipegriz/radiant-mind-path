
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { Stripe } from "https://esm.sh/stripe@13.10.0?target=deno";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  try {
    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
      return new Response(null, {
        headers: corsHeaders
      });
    }

    // Verificar que tenemos la clave secreta de Stripe
    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeSecretKey) {
      console.error('Error: STRIPE_SECRET_KEY no está configurada');
      throw new Error('Error de configuración del servidor');
    }

    // Inicializar Stripe
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2023-10-16',
      httpClient: Stripe.createFetchHttpClient(),
    });

    // Obtener los datos del request
    const { event_name, price_amount } = await req.json();
    console.log('Creando sesión de checkout para:', { event_name, price_amount });

    if (!event_name || !price_amount) {
      throw new Error('Faltan datos requeridos para crear la sesión');
    }

    // Obtener la URL base para los redirects
    const origin = req.headers.get('origin') || 'http://localhost:3000';

    // Crear la sesión de Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Entrada ${event_name}`,
              description: 'Despertar 360',
            },
            unit_amount: price_amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/events/despertar-360`,
      locale: 'es',
    });

    console.log('Sesión de Stripe creada exitosamente:', session.id);

    return new Response(
      JSON.stringify({ sessionId: session.id }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );

  } catch (error) {
    console.error('Error detallado en create-checkout:', error);
    
    return new Response(
      JSON.stringify({
        error: error.message || 'Error interno del servidor',
        details: error.toString()
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 500,
      }
    );
  }
});
