
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { Stripe } from "https://esm.sh/stripe@13.10.0?target=deno";

// Asegurarnos de usar la clave de prueba de Stripe
const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16', // Especificar versión de la API
  httpClient: Stripe.createFetchHttpClient(),
});

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { priceId, eventName } = await req.json();
    console.log('Received request:', { priceId, eventName }); // Debug log

    if (!priceId || !eventName) {
      throw new Error('Missing required parameters');
    }

    // Log the Stripe key mode being used (without revealing the actual key)
    console.log('Stripe mode:', stripe.getClientSecretKey().startsWith('sk_test_') ? 'test' : 'live');

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: eventName === 'despertar-360-platinum' ? 'Entrada Platinum' :
                    eventName === 'despertar-360-vip' ? 'Entrada VIP' : 'Entrada General',
              description: 'Acceso al evento Despertar 360',
            },
            unit_amount: eventName === 'despertar-360-platinum' ? 39900 :
                        eventName === 'despertar-360-vip' ? 29900 : 19900,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/success`,
      cancel_url: `${req.headers.get('origin')}/events/despertar-360`,
    });

    console.log('Session created:', { sessionId: session.id }); // Debug log

    return new Response(JSON.stringify({ sessionId: session.id }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
