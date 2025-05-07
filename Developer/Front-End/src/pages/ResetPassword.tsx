
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Footer from "@/components/Footer";
import { 
  InputOTP, 
  InputOTPGroup, 
  InputOTPSlot 
} from "@/components/ui/input-otp";

const ResetPassword = () => {
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<'verify-otp' | 'set-password'>('verify-otp');
  
  const navigate = useNavigate();

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (otp.length !== 6) {
      toast({
        title: "Error",
        description: "Please enter a valid 6-digit OTP",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate OTP verification process
    try {
      // This is where you would normally verify the OTP with your backend
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: "OTP Verified",
        description: "OTP verified successfully",
      });
      
      setStep('set-password');
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid OTP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate password reset process
    try {
      // This is where you would normally call your password reset API
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast({
        title: "Success!",
        description: "Your password has been reset successfully",
      });
      
      // Redirect to login page after successful password reset
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reset password. Please try again.",
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
              <p className="mt-2 text-muted-foreground">
                {step === 'verify-otp' ? 'Verify OTP Code' : 'Reset Your Password'}
              </p>
            </div>
            
            {step === 'verify-otp' ? (
              <form onSubmit={handleVerifyOTP} className="space-y-6">
                <div className="space-y-2">
                  <div className="text-center mb-4">
                    <p className="text-sm text-muted-foreground">
                      Enter the 6-digit code that we sent to your email address
                    </p>
                  </div>
                  <div className="flex justify-center mb-6">
                    <InputOTP
                      maxLength={6}
                      value={otp}
                      onChange={setOtp}
                      render={({ slots }) => (
                        <InputOTPGroup>
                          {slots.map((slot, index) => (
                            <InputOTPSlot key={index} {...slot} index={index} />
                          ))}
                        </InputOTPGroup>
                      )}
                    />
                  </div>
                </div>
                
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Verifying..." : "Verify OTP"}
                </Button>
                
                <div className="text-center mt-6">
                  <p className="text-sm text-muted-foreground mb-2">
                    Didn't receive a code?{" "}
                    <button 
                      type="button"
                      className="text-travel-600 hover:text-travel-700 dark:text-travel-400 dark:hover:text-travel-300 font-medium"
                      onClick={() => {
                        toast({
                          title: "OTP Resent",
                          description: "A new OTP has been sent to your email",
                        });
                      }}
                    >
                      Resend
                    </button>
                  </p>
                  <Link 
                    to="/login" 
                    className="text-sm text-travel-600 hover:text-travel-700 dark:text-travel-400 dark:hover:text-travel-300 font-medium"
                  >
                    Back to Sign In
                  </Link>
                </div>
              </form>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">New Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <span 
                        className="absolute right-3 top-3 h-4 w-4 text-muted-foreground cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        autoComplete="new-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
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
                </div>
                
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Processing..." : "Reset Password"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ResetPassword;
