
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const handler = async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeKey) {
      throw new Error('Missing Stripe secret key');
    }

    const { event_name, price_amount } = await req.json();
    const origin = req.headers.get('origin') || 'http://localhost:3000';

    const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${stripeKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'payment_method_types[]': 'card',
        'mode': 'payment',
        'success_url': `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        'cancel_url': `${origin}/events/despertar-360`,
        'line_items[0][price_data][currency]': 'usd',
        'line_items[0][price_data][product_data][name]': `Entrada ${event_name}`,
        'line_items[0][price_data][product_data][description]': 'Despertar 360',
        'line_items[0][price_data][unit_amount]': price_amount.toString(),
        'line_items[0][quantity]': '1',
        'locale': 'es',
      }).toString(),
    });

    const session = await response.json();

    if (!response.ok) {
      throw new Error(session.error?.message || 'Error creating checkout session');
    }

    return new Response(
      JSON.stringify({ sessionId: session.id }), 
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json'
        } 
      }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }), 
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
};

Deno.serve(handler);
