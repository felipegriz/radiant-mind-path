-- Tabla para registrar accesos a cursos pagados
CREATE TABLE public.course_access (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  course_slug TEXT NOT NULL,
  full_name TEXT,
  email TEXT NOT NULL,
  amount_paid NUMERIC NOT NULL DEFAULT 0,
  discount_code TEXT,
  payment_method TEXT NOT NULL DEFAULT 'stripe',
  stripe_session_id TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, course_slug)
);

GRANT SELECT, INSERT ON public.course_access TO authenticated;
GRANT ALL ON public.course_access TO service_role;

ALTER TABLE public.course_access ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own course access"
ON public.course_access
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Tabla simple para CRM de leads/compras de cursos (accesible por edge functions)
CREATE TABLE public.course_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  course_slug TEXT NOT NULL,
  discount_code TEXT,
  amount_paid NUMERIC NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'completed',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT ALL ON public.course_leads TO service_role;

ALTER TABLE public.course_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view course leads"
ON public.course_leads
FOR SELECT
TO authenticated
USING (EXISTS (SELECT 1 FROM user_roles WHERE user_roles.user_id = auth.uid() AND user_roles.role::text = 'admin'));