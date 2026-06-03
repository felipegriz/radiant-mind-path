import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import Stripe from 'https://esm.sh/stripe@13.10.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const COURSES: Record<string, { name: string; price: number; slug: string }> = {
  'ciencia-de-lograr': {
    name: 'La Ciencia de Lograr',
    price: 250,
    slug: 'ciencia-de-lograr',
  },
};

const DISCOUNT_CODES: Record<string, number> = {
  TIGRE: 100, // 100% off
};

function generatePassword(): string {
  return Math.random().toString(36).slice(-10) + 'A1!';
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { courseSlug, fullName, email, discountCode, successUrl, cancelUrl } = await req.json();

    const course = COURSES[courseSlug];
    if (!course) throw new Error('Curso no encontrado');
    if (!fullName || !email) throw new Error('Nombre y correo son requeridos');

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
      { auth: { persistSession: false } }
    );

    const normalizedCode = (discountCode || '').trim().toUpperCase();
    const discountPct = DISCOUNT_CODES[normalizedCode] || 0;
    const finalPrice = course.price - (course.price * discountPct) / 100;

    // FREE PATH (TIGRE code -> 100% off)
    if (finalPrice <= 0) {
      // 1. Create or find user
      let userId: string | null = null;
      let generatedPassword: string | null = null;

      // Check if user already exists
      const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
      const existing = existingUsers?.users?.find((u: any) => u.email?.toLowerCase() === email.toLowerCase());

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

      // 2. Grant course access
      await supabaseAdmin.from('course_access').upsert(
        {
          user_id: userId,
          course_slug: course.slug,
          full_name: fullName,
          email,
          amount_paid: 0,
          discount_code: normalizedCode,
          payment_method: 'discount_code',
          status: 'active',
        },
        { onConflict: 'user_id,course_slug' }
      );

      // 3. Save to CRM
      await supabaseAdmin.from('course_leads').insert({
        full_name: fullName,
        email,
        course_slug: course.slug,
        discount_code: normalizedCode,
        amount_paid: 0,
        status: 'completed',
      });

      return new Response(
        JSON.stringify({
          success: true,
          free: true,
          email,
          password: generatedPassword, // null if user already existed
          userExisted: !generatedPassword,
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // PAID PATH (Stripe checkout)
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
      apiVersion: '2023-10-16',
      httpClient: Stripe.createFetchHttpClient(),
    });

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: course.name },
            unit_amount: Math.round(finalPrice * 100),
          },
          quantity: 1,
        },
      ],
      customer_email: email,
      metadata: {
        course_slug: course.slug,
        full_name: fullName,
        email,
        discount_code: normalizedCode,
      },
      success_url: successUrl,
      cancel_url: cancelUrl,
      locale: 'es',
    });

    // Save lead as pending
    await supabaseAdmin.from('course_leads').insert({
      full_name: fullName,
      email,
      course_slug: course.slug,
      discount_code: normalizedCode || null,
      amount_paid: finalPrice,
      status: 'pending',
    });

    return new Response(
      JSON.stringify({ success: true, free: false, url: session.url }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('enroll-course error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Error desconocido' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
