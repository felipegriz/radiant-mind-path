
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { toast } from "sonner";

interface AffiliateStats {
  code: string;
  user_id: string;
  referrals: number;
  conversions: number;
  total_commission: number;
}

interface CommissionsByDate {
  date: string;
  amount: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#FF6B6B', '#6B66FF'];

export const AffiliateReport = () => {
  const [topAffiliates, setTopAffiliates] = useState<AffiliateStats[]>([]);
  const [commissionsByDate, setCommissionsByDate] = useState<CommissionsByDate[]>([]);
  const [conversionRate, setConversionRate] = useState<number>(0);
  const [totalCommissions, setTotalCommissions] = useState<number>(0);
  const [pendingCommissions, setPendingCommissions] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pieData, setPieData] = useState<any[]>([]);

  useEffect(() => {
    const loadReportData = async () => {
      setIsLoading(true);
      try {
        // Get affiliate statistics
        const { data: affiliatesData, error: affiliatesError } = await supabase
          .from('affiliate_codes')
          .select('code, user_id');
        
        if (affiliatesError) throw affiliatesError;
        
        // For each affiliate, get their stats
        const affiliateStats: AffiliateStats[] = [];
        
        for (const affiliate of affiliatesData || []) {
          // Count referrals
          const { count: referralsCount } = await supabase
            .from('affiliate_referrals')
            .select('*', { count: 'exact' })
            .eq('affiliate_code', affiliate.code);
          
          // Count conversions (completed referrals)
          const { count: conversionsCount } = await supabase
            .from('affiliate_referrals')
            .select('*', { count: 'exact' })
            .eq('affiliate_code', affiliate.code)
            .eq('status', 'completed');
          
          // Sum commissions
          const { data: commissionsData } = await supabase
            .from('affiliate_commissions')
            .select('commission_amount')
            .eq('affiliate_code', affiliate.code);
          
          const totalCommission = commissionsData?.reduce(
            (sum, item) => sum + Number(item.commission_amount), 0
          ) || 0;
          
          affiliateStats.push({
            code: affiliate.code,
            user_id: affiliate.user_id,
            referrals: referralsCount || 0,
            conversions: conversionsCount || 0,
            total_commission: totalCommission
          });
        }
        
        // Sort by total commission descending
        affiliateStats.sort((a, b) => b.total_commission - a.total_commission);
        setTopAffiliates(affiliateStats.slice(0, 10)); // Top 10
        
        // Calculate conversion rate
        const totalReferrals = affiliateStats.reduce((sum, stat) => sum + stat.referrals, 0);
        const totalConversions = affiliateStats.reduce((sum, stat) => sum + stat.conversions, 0);
        setConversionRate(totalReferrals > 0 ? (totalConversions / totalReferrals) * 100 : 0);
        
        // Get commissions by date (last 30 days)
        const last30Days = [...Array(30)].map((_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - (29 - i));
          return date.toISOString().split('T')[0];
        });
        
        const { data: allCommissions } = await supabase
          .from('affiliate_commissions')
          .select('*')
          .gte('created_at', last30Days[0]);
        
        const commissionsByDateData = last30Days.map(day => {
          const dayCommissions = allCommissions?.filter(c => 
            c.created_at && c.created_at.split('T')[0] === day
          ) || [];
          
          const amount = dayCommissions.reduce(
            (sum, c) => sum + Number(c.commission_amount), 0
          );
          
          return {
            date: day,
            amount: amount
          };
        });
        
        setCommissionsByDate(commissionsByDateData);
        
        // Calculate total and pending commissions
        const total = allCommissions?.reduce(
          (sum, c) => sum + Number(c.commission_amount), 0
        ) || 0;
        
        const pending = allCommissions?.filter(c => c.status === 'pending')
          .reduce((sum, c) => sum + Number(c.commission_amount), 0) || 0;
        
        setTotalCommissions(total);
        setPendingCommissions(pending);
        
        // Prepare pie chart data for top affiliates
        const pieChartData = affiliateStats
          .slice(0, 7) // Top 7 for the pie chart
          .map(affiliate => ({
            name: affiliate.code,
            value: affiliate.total_commission
          }));
        
        setPieData(pieChartData);
        
      } catch (error) {
        console.error("Error loading affiliate report:", error);
        toast.error("Error cargando reporte de afiliados");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadReportData();
  }, []);

  return (
    <div className="w-full max-w-7xl">
      <h2 className="text-2xl font-bold mb-6">Reporte de Afiliados</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Comisiones Totales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalCommissions.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Todas las comisiones generadas</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Comisiones Pendientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${pendingCommissions.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Comisiones por pagar</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tasa de Conversión</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversionRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">De referidos a ventas</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Comisiones (Últimos 30 días)</CardTitle>
            <CardDescription>Tendencia de comisiones generadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              {commissionsByDate.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={commissionsByDate}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={(value) => {
                      const date = new Date(value);
                      return date.getDate() + '/' + (date.getMonth() + 1);
                    }} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="amount" fill="#8884d8" name="Comisiones ($)" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">
                    {isLoading ? "Cargando datos..." : "No hay datos disponibles"}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Distribución de Comisiones</CardTitle>
            <CardDescription>Por afiliado (top 7)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              {pieData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({name, percent}) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">
                    {isLoading ? "Cargando datos..." : "No hay datos disponibles"}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Top Afiliados</CardTitle>
            <CardDescription>Por comisiones generadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 overflow-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Referidos</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversiones</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comisiones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {isLoading ? (
                    <tr>
                      <td colSpan={4} className="px-3 py-2 text-center">Cargando...</td>
                    </tr>
                  ) : topAffiliates.length > 0 ? (
                    topAffiliates.map((affiliate, index) => (
                      <tr key={index}>
                        <td className="px-3 py-2 whitespace-nowrap">
                          {affiliate.code}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          {affiliate.referrals}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          {affiliate.conversions}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap font-medium text-green-600">
                          ${affiliate.total_commission.toFixed(2)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-3 py-2 text-center">No hay afiliados registrados</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
