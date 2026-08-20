import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import Stripe from 'https://esm.sh/stripe@13.10.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function generatePassword(): string {
  return Math.random().toString(36).slice(-10) + 'A1!';
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { sessionId } = await req.json();
    if (!sessionId) throw new Error('sessionId es requerido');

    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
      apiVersion: '2023-10-16',
      httpClient: Stripe.createFetchHttpClient(),
    });

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== 'paid') {
      throw new Error('El pago aún no está confirmado');
    }

    const courseSlug = (session.metadata?.course_slug as string) || '';
    const fullName = (session.metadata?.full_name as string) || '';
    const email = (
      (session.metadata?.email as string) ||
      session.customer_email ||
      ''
    ).toLowerCase();
    const discountCode = (session.metadata?.discount_code as string) || null;

    if (!courseSlug || !email) throw new Error('Datos de la sesión incompletos');

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
      { auth: { persistSession: false } }
    );

    // Find or create the user
    let userId: string | null = null;
    let generatedPassword: string | null = null;

    const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
    const existing = existingUsers?.users?.find(
      (u: any) => u.email?.toLowerCase() === email
    );

    if (existing) {
      userId = existing.id;
    } else {
      generatedPassword = generatePassword();
      const { data: created, error: createErr } = await supabaseAdmin.auth.admin.createUser({
        email,
        password: generatedPassword,
        email_confirm: true,
        user_metadata: { full_name: fullName },
      });
      if (createErr) throw createErr;
      userId = created.user?.id || null;
    }

    if (!userId) throw new Error('No se pudo crear el usuario');

    const amountPaid = (session.amount_total ?? 0) / 100;

    const { error: accessErr } = await supabaseAdmin.from('course_access').upsert(
      {
        user_id: userId,
        course_slug: courseSlug,
        full_name: fullName,
        email,
        amount_paid: amountPaid,
        discount_code: discountCode,
        payment_method: 'stripe',
        stripe_session_id: session.id,
        status: 'active',
      },
      { onConflict: 'user_id,course_slug' }
    );
    if (accessErr) throw accessErr;

    // Mark the CRM lead as completed
    await supabaseAdmin
      .from('course_leads')
      .update({ status: 'completed' })
      .eq('email', email)
      .eq('course_slug', courseSlug)
      .eq('status', 'pending');

    return new Response(
      JSON.stringify({
        success: true,
        email,
        password: generatedPassword,
        userExisted: !generatedPassword,
        courseSlug,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('fulfill-course-payment error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Error desconocido' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
