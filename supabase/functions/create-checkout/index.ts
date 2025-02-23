
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { Stripe } from "https://esm.sh/stripe@13.10.0?target=deno";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');
    console.log('Longitud de STRIPE_SECRET_KEY:', stripeSecretKey?.length);
    console.log('Primeros caracteres de la clave:', stripeSecretKey?.substring(0, 10));

    if (!stripeSecretKey || !stripeSecretKey.startsWith('sk_')) {
      throw new Error('La clave secreta de Stripe no es válida');
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2023-10-16',
    });

    // Prueba simple de conexión con Stripe
    try {
      const account = await stripe.accounts.retrieve();
      console.log('Conexión con Stripe exitosa:', !!account);
    } catch (error) {
      console.error('Error al conectar con Stripe:', error);
      throw new Error('No se pudo establecer conexión con Stripe');
    }

    const { event_name } = await req.json();
    const priceId = 'price_1QpbniLMf9X10TxuPxNFb3dE'; // Usando un precio fijo para prueba

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'payment',
      success_url: `${req.headers.get('origin') || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin') || 'http://localhost:3000'}/events/despertar-360`,
      locale: 'es',
    });

    return new Response(
      JSON.stringify({ sessionId: session.id }), 
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error completo:', error);
    return new Response(
      JSON.stringify({ error: error.message }), 
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
