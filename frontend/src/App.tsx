import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/tickets" element={<TicketsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

import { AnimatePresence } from "framer-motion";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Layout from "@/components/layout/Layout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ResultsPage from "./pages/ResultsPage";
import TicketsPage from "./pages/TicketsPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "@/contexts/AuthContext";
import AdminLayout from "@/layouts/AdminLayout";
import LoginPage from "@/pages/admin/LoginPage";
import DashboardPage from "@/pages/admin/DashboardPage";
import ResultsManager from "@/pages/admin/ResultsManager";
import TicketsManager from "@/pages/admin/TicketsManager";
import ScrollToTop from "@/components/common/ScrollToTop";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              {/* Admin Routes */}
              <Route path="/admin/login" element={<LoginPage />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="results" element={<ResultsManager />} />
                <Route path="tickets" element={<TicketsManager />} />
              </Route>

              {/* Public Routes */}
              <Route
                path="*"
                element={
                  <Layout>
                    <AnimatedRoutes />
                  </Layout>
                }
              />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
