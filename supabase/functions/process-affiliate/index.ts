
import { Stripe } from 'https://esm.sh/stripe@13.10.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Commission percentage for affiliates (20%)
const AFFILIATE_COMMISSION_PERCENT = 20;

const handler = async (req: Request) => {
  console.log('Iniciando función process-affiliate');
  
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    console.log('¿Existe STRIPE_SECRET_KEY?:', !!stripeKey);

    if (!stripeKey) {
      throw new Error('Missing Stripe secret key');
    }

    const stripe = new Stripe(stripeKey, {
      apiVersion: '2023-10-16',
      httpClient: Stripe.createFetchHttpClient(),
    });

    // Get the webhook payload
    const payload = await req.text();
    const signature = req.headers.get('stripe-signature');
    
    // Verify and parse the webhook
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');
    if (!webhookSecret) {
      throw new Error('Missing Stripe webhook secret');
    }
    
    let event;
    try {
      event = stripe.webhooks.constructEvent(payload, signature || '', webhookSecret);
    } catch (err) {
      console.error(`Webhook signature verification failed: ${err}`);
      return new Response(
        JSON.stringify({ error: 'Webhook signature verification failed' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Handle the event
    console.log(`Event type: ${event.type}`);
    
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      
      // Check if this purchase has an affiliate referral
      if (session.client_reference_id) {
        const affiliateCode = session.client_reference_id;
        console.log(`Processing affiliate purchase for code: ${affiliateCode}`);
        
        // Get the product details from the line items
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
        
        if (lineItems.data.length > 0) {
          const item = lineItems.data[0];
          const purchaseAmount = item.amount_total / 100; // Convert from cents to dollars
          
          // Calculate commission
          const commissionAmount = purchaseAmount * (AFFILIATE_COMMISSION_PERCENT / 100);
          
          // Update the affiliate record in your database
          const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2.38.4');
          
          const supabaseUrl = Deno.env.get('SUPABASE_URL') as string;
          const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY') as string;
          
          const supabase = createClient(supabaseUrl, supabaseKey);
          
          // Get the affiliate user ID from the code
          const { data: affiliateData, error: affiliateError } = await supabase
            .from('affiliate_codes')
            .select('user_id')
            .eq('code', affiliateCode)
            .single();
          
          if (affiliateError || !affiliateData) {
            console.error('Error finding affiliate:', affiliateError);
            throw new Error('Affiliate not found');
          }
          
          // Record the successful commission
          const { data: commissionData, error: commissionError } = await supabase
            .from('affiliate_commissions')
            .insert({
              affiliate_user_id: affiliateData.user_id,
              affiliate_code: affiliateCode,
              order_id: session.id,
              purchase_amount: purchaseAmount,
              commission_amount: commissionAmount,
              status: 'pending',
              product_id: item.price?.product,
              created_at: new Date().toISOString()
            });
          
          if (commissionError) {
            console.error('Error recording commission:', commissionError);
            throw new Error('Failed to record commission');
          }
          
          // Update any pending referrals
          const { data: referralData, error: referralError } = await supabase
            .from('affiliate_referrals')
            .update({ 
              status: 'completed', 
              order_id: session.id,
              completed_at: new Date().toISOString()
            })
            .eq('affiliate_code', affiliateCode)
            .eq('status', 'pending');
          
          if (referralError) {
            console.error('Error updating referral:', referralError);
            // Continue processing even if referral update fails
          }
          
          // Try to get the user's email to notify them
          const { data: userData, error: userError } = await supabase
            .from('profiles')
            .select('id')
            .eq('id', affiliateData.user_id)
            .single();
            
          console.log(`Affiliate commission of $${commissionAmount} recorded for ${affiliateCode}`);
          
          // Create a notification in the database for the affiliate user
          try {
            await supabase
              .from('notifications')
              .insert({
                user_id: affiliateData.user_id,
                type: 'commission',
                title: '¡Nueva comisión generada!',
                message: `Has ganado $${commissionAmount.toFixed(2)} USD por una venta a través de tu código de afiliado.`,
                read: false,
                created_at: new Date().toISOString()
              });
          } catch (notificationError) {
            console.error('Error creating notification:', notificationError);
            // Continue processing even if notification creation fails
          }
        }
      }
    }
    
    return new Response(
      JSON.stringify({ received: true }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );

  } catch (error) {
    console.error('Error detallado en process-affiliate:', error);
    
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
