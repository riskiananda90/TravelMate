
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { LogIn, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const ProtectedRoute = ({ children, fallback }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-travel-600"></div>
      </div>
    );
  }

  if (!user) {
    return fallback || (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted px-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-travel-600 dark:text-travel-400">
              Travel<span className="text-yogya-500 dark:text-yogya-400">Mate</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Anda perlu masuk untuk mengakses fitur ini
            </p>
          </div>
          
          <div className="bg-card/80 backdrop-blur-lg shadow-xl rounded-xl p-6 border border-border space-y-4">
            <p className="text-muted-foreground">
              Silakan masuk atau daftar untuk melanjutkan menjelajahi destinasi wisata terbaik di Yogyakarta.
            </p>
            
            <div className="flex flex-col gap-3">
              <Button onClick={() => navigate('/login')} className="w-full">
                <LogIn className="mr-2 h-4 w-4" />
                Masuk
              </Button>
              <Button onClick={() => navigate('/register')} variant="outline" className="w-full">
                <UserPlus className="mr-2 h-4 w-4" />
                Daftar Akun Baru
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
