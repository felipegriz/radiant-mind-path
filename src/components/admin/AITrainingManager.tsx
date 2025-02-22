
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Plus, Trash2 } from "lucide-react";

type ContentCategory = 'curso' | 'metodologia' | 'frase' | 'ejemplo_coaching' | 'principio';

interface TrainingContent {
  id: string;
  category: ContentCategory;
  title: string;
  content: string;
  keywords: string[];
  active: boolean;
  created_at: string;
}

interface NewContent {
  category: ContentCategory;
  title: string;
  content: string;
  keywords: string[];
  active: boolean;
}

export const AITrainingManager = () => {
  const [contents, setContents] = useState<TrainingContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newContent, setNewContent] = useState<NewContent>({
    category: 'curso',
    title: '',
    content: '',
    keywords: [],
    active: true
  });
  const { toast } = useToast();

  const loadContents = async () => {
    try {
      const { data, error } = await supabase
        .from('ai_training_content')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Asegurar que los datos cumplan con el tipo TrainingContent
      const typedData = (data || []).map(item => ({
        ...item,
        category: item.category as ContentCategory,
        keywords: item.keywords || []
      }));
      
      setContents(typedData);
    } catch (error) {
      console.error('Error loading contents:', error);
      toast({
        title: "Error",
        description: "No se pudo cargar el contenido. Por favor, intenta de nuevo.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadContents();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.title || !newContent.content) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('ai_training_content')
        .insert({
          category: newContent.category,
          title: newContent.title,
          content: newContent.content,
          keywords: newContent.keywords,
          active: newContent.active
        });

      if (error) throw error;

      toast({
        title: "¡Éxito!",
        description: "Contenido añadido correctamente.",
      });

      setNewContent({
        category: 'curso',
        title: '',
        content: '',
        keywords: [],
        active: true
      });

      loadContents();
    } catch (error) {
      console.error('Error saving content:', error);
      toast({
        title: "Error",
        description: "No se pudo guardar el contenido. Por favor, intenta de nuevo.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('ai_training_content')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "¡Éxito!",
        description: "Contenido eliminado correctamente.",
      });

      loadContents();
    } catch (error) {
      console.error('Error deleting content:', error);
      toast({
        title: "Error",
        description: "No se pudo eliminar el contenido. Por favor, intenta de nuevo.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="glass-card p-6 rounded-xl">
        <h2 className="text-2xl font-bold text-white mb-6">Añadir Nuevo Contenido</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              value={newContent.category}
              onValueChange={(value: ContentCategory) => 
                setNewContent(prev => ({ ...prev, category: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="curso">Curso</SelectItem>
                <SelectItem value="metodologia">Metodología</SelectItem>
                <SelectItem value="frase">Frase</SelectItem>
                <SelectItem value="ejemplo_coaching">Ejemplo de Coaching</SelectItem>
                <SelectItem value="principio">Principio</SelectItem>
              </SelectContent>
            </Select>

            <Input
              placeholder="Título"
              value={newContent.title}
              onChange={(e) => setNewContent(prev => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>

          <Textarea
            placeholder="Contenido"
            value={newContent.content}
            onChange={(e) => setNewContent(prev => ({ ...prev, content: e.target.value }))}
            className="min-h-[150px]"
            required
          />

          <Input
            placeholder="Keywords (separadas por comas)"
            value={newContent.keywords.join(', ')}
            onChange={(e) => setNewContent(prev => ({ 
              ...prev, 
              keywords: e.target.value.split(',').map(k => k.trim()).filter(k => k)
            }))}
          />

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Plus className="w-4 h-4 mr-2" />
            )}
            Añadir Contenido
          </Button>
        </form>
      </div>

      <div className="glass-card p-6 rounded-xl">
        <h2 className="text-2xl font-bold text-white mb-6">Contenido Existente</h2>
        {isLoading ? (
          <div className="flex justify-center p-8">
            <Loader2 className="w-8 h-8 animate-spin text-white" />
          </div>
        ) : (
          <div className="space-y-4">
            {contents.map((content) => (
              <div key={content.id} className="bg-white/5 p-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/10 text-white">
                      {content.category}
                    </span>
                    <h3 className="text-lg font-semibold text-white mt-2">{content.title}</h3>
                  </div>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDelete(content.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-gray-300 text-sm mb-2">{content.content}</p>
                <div className="flex flex-wrap gap-2">
                  {content.keywords?.map((keyword, index) => (
                    <span
                      key={index}
                      className="text-xs bg-white/10 text-white px-2 py-1 rounded-full"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
