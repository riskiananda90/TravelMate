
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from '@/hooks/use-toast';
import { Eye, EyeOff } from 'lucide-react';

const resetPasswordSchema = z.object({
  otp: z.string().min(6, {
    message: "OTP harus 6 digit.",
  }),
  password: z.string().min(8, {
    message: "Password harus minimal 8 karakter.",
  }),
  confirmPassword: z.string().min(8, {
    message: "Konfirmasi password harus minimal 8 karakter.",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password tidak cocok.",
  path: ["confirmPassword"],
});

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      otp: "",
      password: "",
      confirmPassword: "",
    },
  });
  
  const onSubmit = (data: ResetPasswordFormValues) => {
    // Demo implementation
    console.log("Reset password data:", data);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Password berhasil direset",
        description: "Silakan login dengan password baru Anda.",
      });
      
      // Redirect to login page after successful password reset
      window.location.href = "/login";
    }, 1500);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-travel-50 to-travel-100 dark:from-slate-900 dark:to-slate-800 p-4">
      <Card className="w-full max-w-md shadow-lg border-travel-200 dark:border-slate-700">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold text-travel-800 dark:text-travel-100">Reset Password</CardTitle>
          <CardDescription className="text-travel-600 dark:text-travel-400">
            Masukkan kode OTP yang dikirimkan ke email Anda dan password baru
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-travel-700 dark:text-travel-300">Kode OTP</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        {Array.from({ length: 6 }).map((_, index) => (
                          <InputOTPGroup key={`otp-${index}`}>
                            <InputOTPSlot index={index} />
                          </InputOTPGroup>
                        ))}
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-travel-700 dark:text-travel-300">Password Baru</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Masukkan password baru"
                          className="pr-10 border-travel-200 dark:border-slate-700"
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-travel-500 dark:text-travel-400"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-travel-700 dark:text-travel-300">Konfirmasi Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Konfirmasi password baru"
                          className="pr-10 border-travel-200 dark:border-slate-700"
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-travel-500 dark:text-travel-400"
                          onClick={toggleConfirmPasswordVisibility}
                        >
                          {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full bg-yogya-500 hover:bg-yogya-600 text-white"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Memproses..." : "Reset Password"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="border-t border-travel-100 dark:border-slate-700 p-4">
          <div className="text-center w-full text-sm text-travel-600 dark:text-travel-400">
            Kembali ke <Link to="/login" className="text-primary hover:underline">Login</Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ResetPassword;
