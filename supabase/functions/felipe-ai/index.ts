
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversationHistory = [] } = await req.json();
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

    // Inicializar el cliente de Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY') ?? '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Obtener el contenido de entrenamiento
    const { data: trainingContent, error: fetchError } = await supabase
      .from('ai_training_content')
      .select('*')
      .eq('active', true);

    if (fetchError) {
      throw new Error('Error fetching training content: ' + fetchError.message);
    }

    // Construir el prompt del sistema con el contenido de entrenamiento
    const categorizedContent = trainingContent?.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {});

    const systemPrompt = `Eres FELIPE AI, un coach que representa exactamente el estilo y metodología de Felipe Griz. 
    Aquí está el contenido específico que debes utilizar en tus respuestas:

    ${Object.entries(categorizedContent || {}).map(([category, items]) => `
    ${category.toUpperCase()}:
    ${items.map((item: any) => `- ${item.title}: ${item.content}`).join('\n')}
    `).join('\n')}

    Directrices de comunicación:
    - Usa ÚNICAMENTE el contenido y ejemplos proporcionados arriba
    - Mantén el estilo y tono exacto de Felipe
    - Sé directo y conciso en tus respuestas
    - Enfócate en acciones prácticas y resultados
    - Si no tienes información específica sobre algo, admítelo y sugiere consultar directamente con Felipe

    Por favor, responde siempre basándote en el contenido proporcionado, manteniendo el estilo comunicativo característico de Felipe Griz.`;

    // Preparar los mensajes incluyendo el historial
    const messages = [
      { role: 'system', content: systemPrompt },
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
        model: 'gpt-4',
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
