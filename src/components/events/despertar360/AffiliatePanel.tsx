
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AffiliateModal } from "./AffiliateModal";
import { AFFILIATE_COMMISSION_PERCENT, AFFILIATE_DISCOUNT_PERCENT } from "@/utils/affiliateUtils";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ArrowUpRight, Users, DollarSign, Share2 } from "lucide-react";
import { toast } from "sonner";
import type { AffiliateCommission } from "@/types/event";

export const AffiliatePanel = () => {
  const [userAffiliateCode, setUserAffiliateCode] = useState<string>("");
  const [referrals, setReferrals] = useState<number>(0);
  const [clickCount, setClickCount] = useState<number>(0);
  const [totalCommission, setTotalCommission] = useState<number>(0);
  const [pendingCommission, setPendingCommission] = useState<number>(0);
  const [paidCommission, setPaidCommission] = useState<number>(0);
  const [showAffiliateModal, setShowAffiliateModal] = useState<boolean>(false);
  const [commissions, setCommissions] = useState<AffiliateCommission[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const loadAffiliateData = async () => {
      setIsLoading(true);
      try {
        // Get current user
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) {
          setIsLoading(false);
          return;
        }

        // Load user's affiliate code
        const { data: codeData, error: codeError } = await supabase
          .from('affiliate_codes')
          .select('code')
          .eq('user_id', session.user.id)
          .single();

        if (codeError || !codeData) {
          // Generate a new affiliate code for the user if they don't have one
          const newCode = session.user.id.substring(0, 8);
          await supabase.from('affiliate_codes').insert({
            user_id: session.user.id,
            code: newCode
          });
          setUserAffiliateCode(newCode);
        } else {
          setUserAffiliateCode(codeData.code);
        }

        // Load referral stats
        if (codeData?.code || newCode) {
          const code = codeData?.code || newCode;
          
          // Count referrals
          const { count: referralCount, error: referralError } = await supabase
            .from('affiliate_referrals')
            .select('*', { count: 'exact' })
            .eq('affiliate_code', code);
          
          if (!referralError) {
            setReferrals(referralCount || 0);
            
            // Estimate clicks (assuming 10% conversion from clicks to referrals)
            setClickCount(Math.round((referralCount || 0) * 10));
          }

          // Get commission data
          const { data: commissionData, error: commissionError } = await supabase
            .from('affiliate_commissions')
            .select('*')
            .eq('affiliate_code', code)
            .order('created_at', { ascending: false });
          
          if (!commissionError && commissionData) {
            setCommissions(commissionData);
            
            // Calculate commission totals
            let total = 0;
            let pending = 0;
            let paid = 0;
            
            commissionData.forEach(commission => {
              total += Number(commission.commission_amount);
              if (commission.status === 'pending') {
                pending += Number(commission.commission_amount);
              } else if (commission.status === 'paid') {
                paid += Number(commission.commission_amount);
              }
            });
            
            setTotalCommission(total);
            setPendingCommission(pending);
            setPaidCommission(paid);
            
            // Prepare chart data - last 7 days
            const last7Days = [...Array(7)].map((_, i) => {
              const date = new Date();
              date.setDate(date.getDate() - i);
              return date.toISOString().split('T')[0];
            }).reverse();
            
            const chartDataArray = last7Days.map(day => {
              const dayCommissions = commissionData.filter(c => 
                c.created_at && c.created_at.split('T')[0] === day
              );
              
              const amount = dayCommissions.reduce((sum, c) => sum + Number(c.commission_amount), 0);
              
              return {
                date: day,
                amount: amount
              };
            });
            
            setChartData(chartDataArray);
          }
        }
      } catch (error) {
        console.error("Error loading affiliate data:", error);
        toast.error("Error cargando datos de afiliados");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadAffiliateData();
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-primary mb-6">Panel de Afiliados</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-white">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 mb-1">Clics en tu enlace</p>
                <h3 className="text-2xl font-bold">{clickCount}</h3>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 mb-1">Referidos</p>
                <h3 className="text-2xl font-bold">{referrals}</h3>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <Share2 className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 mb-1">Comisiones Pendientes</p>
                <h3 className="text-2xl font-bold">${pendingCommission.toFixed(2)}</h3>
              </div>
              <div className="p-2 bg-orange-100 rounded-full">
                <ArrowUpRight className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Ganado</p>
                <h3 className="text-2xl font-bold">${totalCommission.toFixed(2)}</h3>
              </div>
              <div className="p-2 bg-purple-100 rounded-full">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="col-span-2">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Comisiones (Últimos 7 días)</CardTitle>
              <CardDescription>Visualización de tus ganancias recientes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                {chartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="amount" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500">No hay datos disponibles</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="bg-white h-full">
            <CardHeader>
              <CardTitle>Enlace de Afiliado</CardTitle>
              <CardDescription>Comparte este enlace para ganar comisiones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-1">Tu código de afiliado:</p>
                  <div className="p-2 bg-gray-100 rounded text-center font-mono">
                    {userAffiliateCode}
                  </div>
                </div>
                
                <div>
                  <p className="mb-2 text-sm font-medium">Beneficios:</p>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li>Tus referidos obtienen un {AFFILIATE_DISCOUNT_PERCENT}% de descuento</li>
                    <li>Ganas el {AFFILIATE_COMMISSION_PERCENT}% de cada venta</li>
                  </ul>
                </div>
                
                <button
                  onClick={() => setShowAffiliateModal(true)}
                  className="w-full mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
                >
                  Compartir mi enlace
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Historial de Comisiones</CardTitle>
          <CardDescription>Registro de todas tus transacciones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID de Orden</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto de Compra</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comisión</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center">Cargando...</td>
                  </tr>
                ) : commissions.length > 0 ? (
                  commissions.map((commission, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(commission.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {commission.order_id.substring(0, 8)}...
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        ${Number(commission.purchase_amount).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-green-600">
                        ${Number(commission.commission_amount).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${commission.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                            commission.status === 'paid' ? 'bg-green-100 text-green-800' : 
                            'bg-gray-100 text-gray-800'}`}>
                          {commission.status === 'pending' ? 'Pendiente' : 
                           commission.status === 'paid' ? 'Pagado' : commission.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center">No hay comisiones registradas</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      {/* Affiliate Modal for sharing */}
      <AffiliateModal 
        show={showAffiliateModal}
        onClose={() => setShowAffiliateModal(false)}
        userAffiliateCode={userAffiliateCode}
      />
    </div>
  );
};
