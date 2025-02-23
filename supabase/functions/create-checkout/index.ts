
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { Stripe } from "https://esm.sh/stripe@13.10.0?target=deno";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
});

// Mapeo de eventos a IDs de precios de Stripe
const STRIPE_PRICE_IDS = {
  'despertar-360-general': 'price_1Op8UjLsUYD3w5DwVbxxxxxxxGEN', // Reemplazar con tu ID de precio real
  'despertar-360-vip': 'price_1Op8UjLsUYD3w5DwVbxxxxxxxVIP',    // Reemplazar con tu ID de precio real
  'despertar-360-platinum': 'price_1Op8UjLsUYD3w5DwVbxxxxxxxPLAT' // Reemplazar con tu ID de precio real
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { event_name } = await req.json();
    console.log('Creating checkout session for event:', event_name);

    const stripePrice = STRIPE_PRICE_IDS[event_name];
    if (!stripePrice) {
      throw new Error('Precio no encontrado para este evento');
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: stripePrice, // Usar el ID del precio predefinido en Stripe
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/events/despertar-360`,
    });

    console.log('Session created successfully:', { sessionId: session.id });

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
