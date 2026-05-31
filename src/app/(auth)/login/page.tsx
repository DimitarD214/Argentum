"use client";
import { useState, Suspense, useEffect, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import { login, signup, oauthLogin } from "./actions";
import { toast } from "sonner";

function LoginForm() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const [isLogin, setIsLogin] = useState(true);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (error) {
      toast.error(error, {
        className: 'font-sans text-sm',
        style: {
          background: '#fdfcf8',
          color: '#1a1a1a',
          border: '1px solid rgba(0,0,0,0.05)',
        }
      });
    }
  }, [error]);

  const handleOAuth = (provider: 'google' | 'apple') => {
    startTransition(() => {
      oauthLogin(provider);
    });
  };

  return (
    <div className="min-h-screen flex bg-luxury-beige font-sans">
      {/* Left side - Visual/Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-astera-900 overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_100%)] mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 w-[80%] h-[80%] bg-astera-700/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[60%] h-[60%] bg-astera-800/30 blur-[100px] rounded-full mix-blend-screen pointer-events-none"></div>
        
        <div className="relative z-10 max-w-md text-pure-white text-center">
          <h2 className="font-serif text-5xl mb-6 tracking-wide">
            {isLogin ? "Welcome Back" : "Join the Collective"}
          </h2>
          <p className="text-astera-100/70 font-sans font-light tracking-wide leading-relaxed">
            {isLogin 
              ? "Access your exclusive profile, view your order history, and manage your preferences in one elegant space."
              : "Create an account to gain access to exclusive collections, save your favourites, and experience a seamless checkout."}
          </p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 md:p-24 relative">
        <div className="w-full max-w-md space-y-10">
          <div className="text-center lg:text-left space-y-2">
            <h1 className="font-serif text-3xl text-astera-900 lg:hidden">
              {isLogin ? "Welcome Back" : "Join the Collective"}
            </h1>
            <p className="text-soft-taupe text-sm lg:text-base">
              {isLogin ? "Sign in to your account" : "Register with your email"}
            </p>
          </div>

          <form action={isLogin ? login : signup} className="space-y-6">
            <div className="space-y-1 relative group">
              <label className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-soft-taupe transition-colors group-focus-within:text-astera-900">Email</label>
              <input
                name="email"
                type="email"
                className="w-full px-0 py-3 bg-transparent border-b border-gray-200 focus:border-astera-900 outline-none transition-colors duration-300 font-sans text-sm text-gray-900 placeholder:text-gray-300"
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="space-y-1 relative group">
              <label className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-soft-taupe transition-colors group-focus-within:text-astera-900">Password</label>
              <input
                name="password"
                type="password"
                className="w-full px-0 py-3 bg-transparent border-b border-gray-200 focus:border-astera-900 outline-none transition-colors duration-300 font-sans text-sm text-gray-900 placeholder:text-gray-300"
                placeholder="••••••••"
                required
              />
            </div>
            
            <button type="submit" className="w-full btn-luxury mt-8 py-4 rounded-none uppercase tracking-[0.15em] text-xs font-bold hover:shadow-lg hover:shadow-astera-900/20 transition-all">
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          <div className="relative flex items-center py-4">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink-0 mx-4 text-[10px] uppercase tracking-[0.2em] text-soft-taupe font-bold">Or continue with</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => handleOAuth('google')}
              disabled={isPending}
              className="flex items-center justify-center gap-2 py-3 border border-gray-200 hover:border-astera-900 hover:bg-astera-50 transition-all duration-300 text-sm font-semibold text-gray-700 disabled:opacity-50"
            >
              Google
            </button>
            <button 
              onClick={() => handleOAuth('apple')}
              disabled={isPending}
              className="flex items-center justify-center gap-2 py-3 border border-gray-200 hover:border-astera-900 hover:bg-astera-50 transition-all duration-300 text-sm font-semibold text-gray-700 disabled:opacity-50"
            >
              Apple
            </button>
          </div>

          <div className="pt-8 text-center lg:text-left">
            <p className="text-soft-taupe text-xs">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={(e) => { e.preventDefault(); setIsLogin(!isLogin); }}
                className="text-astera-900 font-bold uppercase tracking-[0.1em] hover:text-astera-700 transition-colors ml-3 border-b border-astera-900/30 hover:border-astera-900 pb-0.5"
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div className="min-h-screen bg-luxury-beige" />}>
        <LoginForm />
      </Suspense>
    </>
  );
}
