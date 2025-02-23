
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Handle CORS preflight requests
const handler = async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeKey) {
      console.error('Missing STRIPE_SECRET_KEY');
      throw new Error('Configuration error: Missing Stripe secret key');
    }

    // Parse the request body
    const { event_name, price_amount } = await req.json();
    console.log('Received request for:', { event_name, price_amount });

    const origin = req.headers.get('origin') || 'http://localhost:3000';

    // Create checkout session with Stripe
    console.log('Creating Stripe checkout session...');
    const checkoutSession = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${stripeKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Stripe-Version': '2023-10-16',
      },
      body: new URLSearchParams({
        'payment_method_types[]': 'card',
        'mode': 'payment',
        'success_url': `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        'cancel_url': `${origin}/events/despertar-360`,
        'line_items[0][quantity]': '1',
        'line_items[0][price_data][currency]': 'usd',
        'line_items[0][price_data][unit_amount]': price_amount.toString(),
        'line_items[0][price_data][product_data][name]': `Entrada ${event_name}`,
        'line_items[0][price_data][product_data][description]': 'Despertar 360',
        'locale': 'es',
      }).toString(),
    });

    const sessionData = await checkoutSession.json();

    if (!checkoutSession.ok) {
      console.error('Stripe API error:', sessionData);
      throw new Error(sessionData.error?.message || 'Error creating checkout session');
    }

    console.log('Checkout session created successfully:', sessionData.id);

    return new Response(
      JSON.stringify({ sessionId: sessionData.id }), 
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json'
        } 
      }
    );

  } catch (error) {
    console.error('Function error:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }), 
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
};

Deno.serve(handler);
