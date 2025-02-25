
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface VideoUploaderProps {
  onUploadComplete: (url: string) => void;
}

export const VideoUploader = ({ onUploadComplete }: VideoUploaderProps) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      setError(null);
      
      const file = event.target.files?.[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `octava-area-video-${Date.now()}.${fileExt}`;
      
      const { data, error: uploadError } = await supabase.storage
        .from('course_videos')
        .upload(fileName, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('course_videos')
        .getPublicUrl(fileName);

      onUploadComplete(publicUrl);
    } catch (err) {
      console.error('Error uploading video:', err);
      setError('Error al subir el video. Por favor, intenta de nuevo.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept="video/*"
        onChange={handleFileUpload}
        disabled={uploading}
        className="hidden"
        id="video-upload"
      />
      <label htmlFor="video-upload">
        <Button 
          variant="outline" 
          disabled={uploading}
          className="cursor-pointer"
          asChild
        >
          <span>
            {uploading ? 'Subiendo video...' : 'Subir video del curso'}
          </span>
        </Button>
      </label>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};
