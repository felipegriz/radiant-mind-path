
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DollarSign, Save, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/layout/Navbar";

interface EventPrice {
  id: string;
  event_name: string;
  price_amount: number;
  currency: string;
  is_active: boolean;
}

interface UserRole {
  role: string;
}

const EventPricing = () => {
  const [price, setPrice] = useState<EventPrice | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const checkAdminStatus = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        window.location.href = '/auth/login';
        return;
      }

      const { data: roles } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .eq('role', 'admin') as { data: UserRole[] | null, error: Error | null };

      if (!roles || roles.length === 0) {
        window.location.href = '/';
        return;
      }

      setIsAdmin(true);
      loadPrice();
    };

    checkAdminStatus();
  }, []);

  const loadPrice = async () => {
    const { data, error } = await supabase
      .from('event_prices')
      .select('*')
      .eq('event_name', 'despertar-360')
      .eq('is_active', true)
      .single() as { data: EventPrice | null, error: Error | null };

    if (error) {
      toast({
        title: "Error",
        description: "No se pudo cargar el precio del evento",
        variant: "destructive",
      });
      return;
    }

    setPrice(data);
    setIsLoading(false);
  };

  const handlePriceChange = (value: string) => {
    if (!price) return;
    // Convertir el precio ingresado a centavos para Stripe
    const amountInCents = Math.round(parseFloat(value) * 100);
    setPrice({ ...price, price_amount: amountInCents });
  };

  const handleSave = async () => {
    if (!price) return;

    setIsSaving(true);
    const { error } = await supabase
      .from('event_prices')
      .update({ price_amount: price.price_amount })
      .eq('id', price.id) as { error: Error | null };

    if (error) {
      toast({
        title: "Error",
        description: "No se pudo actualizar el precio",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Éxito",
        description: "Precio actualizado correctamente",
      });
    }
    setIsSaving(false);
  };

  if (!isAdmin || isLoading) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <div className="flex items-center mb-8">
            <DollarSign className="w-8 h-8 text-accent mr-3" />
            <h1 className="text-3xl font-bold text-white">Gestión de Precios</h1>
          </div>

          <div className="glass-card p-6 rounded-xl">
            <h2 className="text-xl font-semibold text-white mb-6">Despertar 360</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Precio (USD)
                </label>
                <div className="flex items-center space-x-4">
                  <Input
                    type="number"
                    value={price ? (price.price_amount / 100).toFixed(2) : ''}
                    onChange={(e) => handlePriceChange(e.target.value)}
                    min="0"
                    step="0.01"
                    className="bg-background text-white"
                  />
                  <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-accent hover:bg-accent/80 text-background"
                  >
                    {isSaving ? (
                      "Guardando..."
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Guardar
                      </>
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-start space-x-2 text-sm text-gray-400">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <p>
                  Los cambios en el precio se reflejarán inmediatamente en la página del evento.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EventPricing;
