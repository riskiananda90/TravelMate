import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Loader, Home } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { supabase } from "../integrations/supabase/client";

const backgroundImages = [
  "/borobudur.jpg", 
  "/prambanan.jpg",
  "/parangtritis.jpg", 
  "/tamansari.jpg"
];

const KonfirmasiEmail = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [status, setStatus] = useState("loading"); // 'loading', 'success', 'error'
  const [errorMessage, setErrorMessage] = useState("Tautan konfirmasi tidak valid atau telah kedaluwarsa.");

  useEffect(() => {
    const imageTimer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(imageTimer);
  }, []);

  useEffect(() => {
    const errorTimeout = setTimeout(() => {
      if (status === 'loading') {
        setStatus('error');
      }
    }, 5000);

    // Mendengarkan event dari Supabase
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        clearTimeout(errorTimeout);
        setStatus('success');
      } else if (event === 'TOKEN_REFRESHED' && session) {
        clearTimeout(errorTimeout);
        setStatus('success');
      }
    });

    return () => {
      subscription.unsubscribe();
      clearTimeout(errorTimeout);
    };
  }, [status]);
  const handleNavigateHome = () => {
    navigate('/');
  };

  const getStatusContent = () => {
    switch (status) {
      case "success":
        return {
          icon: <CheckCircle size={48} className="text-green-400" />,
          title: "Konfirmasi Berhasil!",
          description: "Email Anda telah diverifikasi. Anda sekarang sudah masuk.",
          button: (
            <Button 
              onClick={handleNavigateHome}
              className="bg-travel-500 hover:bg-travel-600 text-white group mt-8"
              size="lg"
            >
              <Home size={18} className="mr-2" />
              Menuju Halaman Utama
            </Button>
          )
        };
      case "error":
        return {
          icon: <XCircle size={48} className="text-red-400" />,
          title: "Konfirmasi Gagal",
          description: errorMessage,
          button: null
        };
      default: // loading
        return {
          icon: <Loader size={48} className="text-white/80 animate-spin" />,
          title: "Sedang Memverifikasi...",
          description: "Mohon tunggu sebentar, kami sedang memvalidasi email Anda.",
          button: null
        };
    }
  };

  const { icon, title, description, button } = getStatusContent();

  return (
    <div 
      className="h-screen bg-cover bg-center flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)), url(${backgroundImages[currentImageIndex]})`,
        transition: 'background-image 1s ease-in-out',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-travel-800/50 to-yogya-800/50 z-10"></div>
      
      <div className="text-center px-4 max-w-2xl mx-auto z-20">
        <motion.div
          key={status}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex justify-center mb-6">{icon}</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-shadow-lg">{title}</h1>
          <p className="text-lg text-white/90 mb-6 text-shadow">{description}</p>
          {button}
        </motion.div>
      </div>
    </div>
  );
};

export default KonfirmasiEmail;