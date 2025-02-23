
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { Stripe } from "https://esm.sh/stripe@13.10.0?target=deno";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeSecretKey) {
      console.error('STRIPE_SECRET_KEY no está configurada');
      throw new Error('Error de configuración del servidor');
    }

    const { event_name } = await req.json();
    console.log('Creating checkout session for event:', event_name);

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2023-10-16',
      httpClient: Stripe.createFetchHttpClient(),
    });

    // Mapeo de eventos a IDs de precios de Stripe
    const STRIPE_PRICE_IDS: { [key: string]: string } = {
      'despertar-360-general': 'price_1QpbniLMf9X10TxuPxNFb3dE',
      'despertar-360-vip': 'price_1QvVnrLMf9X10TxuvN6PVKA5',
      'despertar-360-platinum': 'price_1QvVqBLMf9X10TxuctBAazPc'
    };

    const stripePrice = STRIPE_PRICE_IDS[event_name];
    if (!stripePrice) {
      console.error('Precio no encontrado para el evento:', event_name);
      throw new Error('Tipo de entrada no válida');
    }

    console.log('Creating Stripe session with price:', stripePrice);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: stripePrice,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/events/despertar-360`,
      client_reference_id: event_name,
    });

    console.log('Session created successfully:', { sessionId: session.id });

    return new Response(JSON.stringify({ 
      sessionId: session.id 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error('Error creating checkout session:', error);
    
    return new Response(JSON.stringify({ 
      error: error.message || 'Error al procesar el pago'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
