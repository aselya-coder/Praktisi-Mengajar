import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/admin/Login";
import AdminLayout from "./components/admin/AdminLayout";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import Dashboard from "./pages/admin/Dashboard";
import HeroManagement from "./pages/admin/HeroManagement";
import ServicesManagement from "./pages/admin/ServicesManagement";
import ProcessManagement from "./pages/admin/ProcessManagement";
import TestimonialsManagement from "./pages/admin/TestimonialsManagement";
import AboutManagement from "./pages/admin/AboutManagement";
import CTAManagement from "./pages/admin/CTAManagement";
import HeaderManagement from "./pages/admin/HeaderManagement";
import FooterManagement from "./pages/admin/FooterManagement";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="hero" element={<HeroManagement />} />
            <Route path="services" element={<ServicesManagement />} />
            <Route path="process" element={<ProcessManagement />} />
            <Route path="testimonials" element={<TestimonialsManagement />} />
            <Route path="about" element={<AboutManagement />} />
            <Route path="cta" element={<CTAManagement />} />
            <Route path="header" element={<HeaderManagement />} />
            <Route path="footer" element={<FooterManagement />} />
          </Route>
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
