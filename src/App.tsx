
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Despertar360 from "./pages/events/Despertar360";
import CitaConLoImposible from "./pages/events/CitaConLoImposible";
import MissionMastery from "./pages/events/MissionMastery";
import StudentArea from "./pages/StudentArea";
import Login from "./pages/auth/Login";
import Contacto from "./pages/Contacto";
import SuperHumano from "./pages/coaching-consultoria/SuperHumano";
import SilverPartnership from "./pages/coaching-consultoria/SilverPartnership";
import GreyPlatinum from "./pages/coaching-consultoria/GreyPlatinum";
import Dashboard from "./pages/admin/Dashboard";
import OctavaArea from "./pages/courses/OctavaArea";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/events/despertar-360" element={<Despertar360 />} />
          <Route path="/events/cita-con-lo-imposible" element={<CitaConLoImposible />} />
          <Route path="/events/mission-mastery" element={<MissionMastery />} />
          <Route path="/student-area" element={<StudentArea />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/coaching-consultoria/super-humano" element={<SuperHumano />} />
          <Route path="/coaching-consultoria/silver-partnership" element={<SilverPartnership />} />
          <Route path="/coaching-consultoria/grey-platinum" element={<GreyPlatinum />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/courses/octava-area" element={<OctavaArea />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
