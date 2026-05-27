import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Schemes from "./pages/Schemes";
import Services from "./pages/Services";
import Complaints from "./pages/Complaints";
import HeatMap from "./pages/HeatMap";
import Tracking from "./pages/Tracking";
import SchemeApplicationForm from "./components/ApplicationForm/SchemeApplicationForm";
import ServiceApplicationForm from "./components/ApplicationForm/ServiceApplicationForm";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/schemes" element={<Schemes />} />
              <Route path="/schemes/:schemeId/apply" element={<SchemeApplicationForm />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:serviceId/apply" element={<ServiceApplicationForm />} />
              <Route path="/complaints" element={<Complaints />} />
              <Route path="/heatmap" element={<HeatMap />} />
              <Route path="/tracking" element={<Tracking />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
