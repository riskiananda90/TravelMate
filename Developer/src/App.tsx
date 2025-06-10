import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Index from "./pages/Index";
import Destinations from "./pages/Destinations";
import About from "./pages/About";
import DetailDestinasi from "./pages/DetailDestinasi";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Wishlist from "./pages/Wishlist";
import Booking from "./pages/Booking";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
import LoadingScreen from "./components/LoadingScreen";
import { ThemeProvider } from "./components/ThemeProvider";
import { WishlistProvider } from "./context/WishlistContext";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import FloatingAssistant from "./components/FloatingAssistant";
import ProtectedRoute from "./components/ProtectedRoute";
import EmailSent from "./pages/EmailSent";
import EmailConfirmation from "./pages/EmailConfirmation";
import KonfirmasiEmail from "./pages/KomfirmasiEmail";

const queryClient = new QueryClient();

// Animation wrapper component for route transitions
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        <Routes location={location}>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/email-sent" element={<EmailSent />} />
          <Route path="/email-confirmation" element={<EmailConfirmation />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/email-confirmation" element={<KonfirmasiEmail />} />
          <Route
            path="/destinasi"
            element={
              <ProtectedRoute>
                <Destinations />
              </ProtectedRoute>
            }
          />
          <Route
            path="/destinasi/:id"
            element={
              <ProtectedRoute>
                <DetailDestinasi />
              </ProtectedRoute>
            }
          />
          <Route
            path="/wishlist"
            element={
              <ProtectedRoute>
                <Wishlist />
              </ProtectedRoute>
            }
          />
          <Route
            path="/booking/:id"
            element={
              <ProtectedRoute>
                <Booking />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);

  // Handle loading completion
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Ensure loading screen shows for at least 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="travelmate-theme">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                {loading ? (
                  <LoadingScreen onLoadComplete={() => {}} />
                ) : (
                  <BrowserRouter>
                    <AnimatedRoutes />
                    <FloatingAssistant />
                  </BrowserRouter>
                )}
              </TooltipProvider>
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
