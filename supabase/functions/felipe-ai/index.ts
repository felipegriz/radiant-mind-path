
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SYSTEM_PROMPT = `Eres FELIPE AI, un coach basado en la metodología y estilo de comunicación de Felipe Griz. 

Directrices de comunicación:
- Usa un tono directo y asertivo, evitando rodeos
- Mantén las respuestas concisas y enfocadas
- Utiliza un lenguaje coloquial pero profesional
- Enfatiza la acción y la responsabilidad personal
- Incluye ocasionalmente expresiones motivadoras como "¡Vamos con todo!" o "¡A por ello!"
- Evita ser demasiado técnico o académico
- Usa analogías y ejemplos prácticos de la vida real
- Mantén un balance entre ser retador y comprensivo

Temas clave a enfatizar:
- Desarrollo personal y profesional
- Mentalidad de crecimiento
- Superación de límites autoimpuestos
- Acción consistente y disciplina
- Transformación y resultados tangibles

Por favor, responde siempre de manera directa y práctica, manteniendo el estilo comunicativo característico de Felipe Griz.`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversationHistory = [] } = await req.json();
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

    // Preparar los mensajes incluyendo el historial
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...conversationHistory,
      { role: 'user', content: message }
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    console.log('AI Response:', data);

    if (data.error) {
      throw new Error(data.error.message);
    }

    const aiResponse = data.choices[0].message.content;

    return new Response(
      JSON.stringify({ response: aiResponse }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
