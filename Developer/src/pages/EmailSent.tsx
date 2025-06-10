
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mail, ArrowLeft, RefreshCw } from "lucide-react";
import Footer from "@/components/Footer";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";

const EmailSent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [isResending, setIsResending] = useState(false);
  
  // Get email from navigation state
  const email = location.state?.email || '';
  const name = location.state?.name || '';
  const password = location.state?.password || '';

  const handleResendEmail = async () => {
    if (!email || !password || !name) {
      toast({
        title: "Error",
        description: "Data pendaftaran tidak lengkap. Silakan daftar ulang.",
        variant: "destructive",
      });
      navigate('/register');
      return;
    }

    setIsResending(true);
    
    const { error } = await signUp(email, password, name);
    
    if (!error) {
      toast({
        title: "Email Terkirim!",
        description: "Email konfirmasi baru telah dikirim ke inbox Anda.",
      });
    }
    
    setIsResending(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted">
      <div className="relative flex-1 flex items-center justify-center px-4">
        {/* Nature-themed background elements */}
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

            <div className="flex justify-center">
              <Mail className="h-16 w-16 text-travel-600 dark:text-travel-400" />
            </div>
            
            <div className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">
                Cek Email Anda!
              </h2>
              <p className="text-muted-foreground">
                Kami telah mengirimkan link konfirmasi ke:
              </p>
              <p className="font-medium text-travel-600 dark:text-travel-400">
                {email}
              </p>
              <p className="text-sm text-muted-foreground">
                Silakan cek inbox (dan folder spam) Anda, kemudian klik link konfirmasi untuk mengaktifkan akun Anda.
              </p>
            </div>

            <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
              <p className="font-medium mb-2">Tips:</p>
              <ul className="text-left space-y-1">
                <li>• Cek folder spam jika email tidak muncul</li>
                <li>• Link konfirmasi valid selama 24 jam</li>
                <li>• Setelah konfirmasi, Anda bisa langsung login</li>
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <Button 
                onClick={handleResendEmail} 
                disabled={isResending}
                className="w-full"
              >
                {isResending ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Mengirim Ulang...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Kirim Ulang Email
                  </>
                )}
              </Button>
              
              <Button onClick={() => navigate('/login')} variant="outline" className="w-full">
                Sudah Konfirmasi? Login
              </Button>
              
              <Button onClick={() => navigate('/')} variant="ghost" className="w-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Kembali ke Beranda
              </Button>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default EmailSent;
