
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Footer from "@/components/Footer";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate email sending process
    try {
      // This is where you would normally call your password reset service
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setIsEmailSent(true);
      toast({
        title: "Success!",
        description: "A password reset link has been sent to your email",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send reset email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
              <p className="mt-2 text-muted-foreground">Reset your password</p>
            </div>
            
            {isEmailSent ? (
              <div className="text-center py-8">
                <div className="mb-6 mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                  <Mail className="h-8 w-8 text-travel-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Check your inbox</h3>
                <p className="text-muted-foreground mb-6">
                  We've sent a password reset link to <span className="font-medium">{email}</span>
                </p>
                <Button asChild variant="outline" className="mt-4">
                  <Link to="/login">Back to Sign In</Link>
                </Button>
              </div>
            ) : (
              <>
                <p className="mb-6 text-sm text-muted-foreground">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
                
                <form onSubmit={handleForgotPassword} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Reset Link"}
                  </Button>
                </form>
                
                <div className="text-center mt-6">
                  <Link 
                    to="/login" 
                    className="text-sm text-travel-600 hover:text-travel-700 dark:text-travel-400 dark:hover:text-travel-300 font-medium"
                  >
                    Back to Sign In
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ForgotPassword;
