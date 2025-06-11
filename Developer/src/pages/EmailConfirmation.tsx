import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Mail, ArrowLeft, Loader2 } from "lucide-react"; // Ganti loader
import { supabase } from "@/integrations/supabase/client"; // Sesuaikan path
import { toast } from "@/hooks/use-toast";

const EmailConfirmation = () => {
  const navigate = useNavigate();
  const [confirmationStatus, setConfirmationStatus] = useState<'success' | 'error' | 'pending'>('pending');

  useEffect(() => {
    // Timeout untuk menangani kasus jika tidak ada respons dari Supabase
    const fallbackTimeout = setTimeout(() => {
        if (confirmationStatus === 'pending') {
            setConfirmationStatus('error');
            toast({
                title: "Error",
                description: "Gagal memverifikasi. Silakan coba lagi atau hubungi dukungan.",
                variant: "destructive",
            });
        }
    }, 10000); 

    // Dengarkan perubahan status otentikasi
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN') {
            clearTimeout(fallbackTimeout); 
            setConfirmationStatus('success');
            toast({
                title: "Berhasil!",
                description: "Email berhasil dikonfirmasi. Anda akan diarahkan...",
            });

            setTimeout(() => {
                navigate('/'); 
            }, 3000);
            subscription.unsubscribe();
        }
    });


    return () => {
        subscription.unsubscribe();
        clearTimeout(fallbackTimeout);
    };
  }, [navigate, confirmationStatus]);

  if (confirmationStatus === 'pending') {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted">
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center space-y-6">
            <Loader2 className="animate-spin h-16 w-16 text-travel-600 mx-auto" />
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-travel-600 dark:text-travel-400">
                Mengkonfirmasi Email...
              </h1>
              <p className="text-muted-foreground">
                Mohon tunggu sebentar, kami sedang memverifikasi email Anda.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted">
        <div className="relative flex-1 flex items-center justify-center px-4">
          <div className="absolute inset-0 overflow-hidden z-0">
            <div className="absolute bottom-0 left-0 w-full h-48 bg-[url('/additional/trees.png')] bg-repeat-x bg-bottom opacity-20" />
          </div>
          <div className="max-w-md w-full z-10 relative">
            <div className="bg-card/80 backdrop-blur-lg shadow-xl rounded-xl p-8 border border-border text-center space-y-6">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold tracking-tight text-travel-600 dark:text-travel-400">
                  Travel<span className="text-yogya-500 dark:text-yogya-400">Mate</span>
                </h1>
              </div>

              {confirmationStatus === 'success' && (
                <>
                  <div className="flex justify-center">
                    <CheckCircle className="h-16 w-16 text-green-500" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-foreground">Email Berhasil Dikonfirmasi!</h2>
                    <p className="text-muted-foreground">Selamat! Anda akan diarahkan secara otomatis.</p>
                  </div>
                  <Button onClick={() => navigate('/')} className="w-full">
                    Lanjut ke Beranda
                  </Button>
                </>
              )}

              {confirmationStatus === 'error' && (
                <>
                  <div className="flex justify-center">
                    <XCircle className="h-16 w-16 text-red-500" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-foreground">Konfirmasi Email Gagal</h2>
                    <p className="text-muted-foreground">Maaf, link mungkin sudah kedaluwarsa atau tidak valid.</p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button onClick={() => navigate('/register')} className="w-full">
                      <Mail className="mr-2 h-4 w-4" /> Daftar Ulang
                    </Button>
                    <Button onClick={() => navigate('/')} variant="outline" className="w-full">
                      <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Beranda
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
  );
};

export default EmailConfirmation;