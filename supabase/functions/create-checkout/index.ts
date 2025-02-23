
import { Stripe } from 'https://esm.sh/stripe@13.10.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const handler = async (req: Request) => {
  console.log('Iniciando función create-checkout');
  
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeKey) {
      console.error('Error: Missing Stripe secret key');
      throw new Error('Missing Stripe secret key');
    }

    const stripe = new Stripe(stripeKey, {
      apiVersion: '2023-10-16',
      httpClient: Stripe.createFetchHttpClient(),
    });

    const { event_name, price_amount } = await req.json();
    console.log('Datos recibidos:', { event_name, price_amount });

    // Validar los datos recibidos
    if (!event_name || !price_amount) {
      throw new Error('Faltan datos requeridos para crear la sesión');
    }

    const origin = req.headers.get('origin') || 'https://2b4b6960-3aca-4278-9261-37a1a21f9176.lovableproject.com';
    console.log('Origin URL:', origin);

    // Configurar la sesión con un tiempo de expiración más corto
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
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      customer_creation: 'always',
      expires_at: Math.floor(Date.now() / 1000) + (30 * 60), // 30 minutos de expiración
    });

    console.log('Sesión creada exitosamente:', session.id);
    console.log('Tiempo de expiración:', new Date(session.expires_at! * 1000).toISOString());

    return new Response(
      JSON.stringify({ 
        sessionId: session.id,
        expiresAt: session.expires_at
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );

  } catch (error) {
    console.error('Error detallado:', error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        details: error instanceof Error ? error.stack : undefined,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
};

Deno.serve(handler);
