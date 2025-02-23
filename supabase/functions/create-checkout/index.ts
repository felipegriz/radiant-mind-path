
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
    console.log('¿Existe STRIPE_SECRET_KEY?:', !!stripeKey);

    if (!stripeKey) {
      console.error('Error: Missing Stripe secret key');
      throw new Error('Missing Stripe secret key');
    }

    const stripe = new Stripe(stripeKey, {
      apiVersion: '2023-10-16',
      httpClient: Stripe.createFetchHttpClient(),
    });

    const requestData = await req.json();
    console.log('Datos recibidos:', requestData);

    const { priceId, successUrl, cancelUrl } = requestData;
    
    // Validación de datos
    if (!priceId || !successUrl || !cancelUrl) {
      console.error('Faltan parámetros requeridos:', { priceId, successUrl, cancelUrl });
      throw new Error('Missing required parameters');
    }

    console.log('Creando sesión de checkout con:', { priceId, successUrl, cancelUrl });

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      locale: 'es',
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      customer_creation: 'always',
    });

    console.log('Sesión creada con ID:', session.id);
    console.log('URL de la sesión:', session.url);

    return new Response(
      JSON.stringify({ url: session.url }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );

  } catch (error) {
    console.error('Error detallado al crear la sesión:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Error desconocido',
        details: error instanceof Error ? error.stack : undefined
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
};

Deno.serve(handler);
