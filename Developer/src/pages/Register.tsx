
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Mail, User, UserPlus } from "lucide-react";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Error",
        description: "Semua field harus diisi.",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Password dan konfirmasi password tidak sama.",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Error",
        description: "Password minimal 6 karakter.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    const { error } = await signUp(email, password, name);
    
    if (!error) {
      // Redirect ke halaman email sent dengan data yang diperlukan
      navigate('/email-sent', { 
        state: { 
          email, 
          name, 
          password 
        } 
      });
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted">
      <div className="relative flex-1 flex items-center justify-center px-4 py-12">
        {/* Nature-themed background elements */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute bottom-0 left-0 w-full h-48 bg-[url('/additional/trees.png')] bg-repeat-x bg-bottom opacity-20" />
        </div>
        
        <div className="w-full max-w-md z-10 relative">
          <div className="bg-card/80 backdrop-blur-lg shadow-xl rounded-xl p-8 border border-border">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold tracking-tight text-travel-600 dark:text-travel-400">
                Travel<span className="text-yogya-500 dark:text-yogya-400">Mate</span>
              </h1>
              <p className="mt-2 text-muted-foreground">Buat akun baru Anda</p>
            </div>
            
            <form onSubmit={handleRegister} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Lengkap</Label>
                <div className="relative">
                  <Input
                    id="name"
                    type="text"
                    placeholder="Masukkan nama lengkap"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10"
                    required
                  />
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="nama@contoh.com"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                  <span 
                    className="absolute right-3 top-3 h-4 w-4 text-muted-foreground cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">Minimal 6 karakter</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                  <span 
                    className="absolute right-3 top-3 h-4 w-4 text-muted-foreground cursor-pointer"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </span>
                </div>
              </div>
              
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>Membuat Akun...</>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" /> Daftar
                  </>
                )}
              </Button>
              
              <div className="text-center">
                <span className="text-sm text-muted-foreground">
                  Sudah punya akun?{" "}
                  <Link 
                    to="/login" 
                    className="text-travel-600 hover:text-travel-700 dark:text-travel-400 dark:hover:text-travel-300 font-medium"
                  >
                    Masuk
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Register;
