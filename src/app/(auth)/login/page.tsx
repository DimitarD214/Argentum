"use client";

import { useState, Suspense, useEffect, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import { login, signup, oauthLogin } from "./actions";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2 } from "lucide-react";

function LoginForm() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Floating label state helper
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    startTransition(async () => {
      try {
        if (isLogin) {
          await login(formData);
        } else {
          await signup(formData);
        }
      } catch (err: any) {
        toast.error(err.message || "Dogodila se pogreška prilikom prijave.");
      }
    });
  };

  const handleOAuth = (provider: 'google' | 'apple') => {
    startTransition(() => {
      oauthLogin(provider);
    });
  };

  return (
    <div className="min-h-screen flex bg-warm-beige font-sans">
      {/* Left side - Luxury Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-astera-900 overflow-hidden items-center justify-center p-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_100%)] mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 w-[90%] h-[90%] bg-astera-700/20 blur-[140px] rounded-full mix-blend-screen pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[70%] h-[70%] bg-astera-800/30 blur-[120px] rounded-full mix-blend-screen pointer-events-none"></div>
        
        <div className="relative z-10 max-w-lg text-pure-white text-center space-y-8">
          <div className="inline-block px-4 py-1.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-md">
            <span className="text-[9px] uppercase tracking-[0.3em] text-astera-100 font-bold">Astera Inner Circle</span>
          </div>
          <h2 className="font-serif text-5xl mb-6 tracking-wide leading-tight">
            {isLogin ? "Dobrodošli Natrag" : "Pridružite se Kolektivu"}
          </h2>
          <p className="text-astera-100/75 font-sans font-light tracking-wide leading-relaxed text-sm max-w-md mx-auto">
            {isLogin 
              ? "Pristupite svom ekskluzivnom profilu, pregledajte povijest narudžbi i upravljajte svojim postavkama u profinjenom prostoru."
              : "Stvorite račun kako biste ostvarili pristup ekskluzivnim kolekcijama, spremili omiljene artikle i iskusili besprijekoran proces kupnje."}
          </p>
        </div>
      </div>

      {/* Right side - Interactive Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 md:p-20 relative">
        <div className="w-full max-w-md bg-white border border-black/5 rounded-[2.5rem] shadow-xl p-8 sm:p-10 space-y-8 relative overflow-hidden">
          
          {/* Subtle top decoration */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-astera-300 via-astera-600 to-astera-900" />
          
          <div className="text-center space-y-2">
            <h1 className="font-serif text-3xl text-astera-900">
              {isLogin ? "Prijava" : "Registracija"}
            </h1>
            <p className="text-soft-taupe text-xs tracking-wide">
              {isLogin ? "Prijavite se u svoj premium profil" : "Registrirajte se putem e-pošte"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field with Floating Label Effect */}
            <div className="space-y-1 relative group">
              <label 
                className={`absolute left-0 transition-all duration-300 pointer-events-none uppercase tracking-[0.2em] font-bold ${
                  isEmailFocused || email 
                    ? "-top-3.5 text-[8px] text-astera-900" 
                    : "top-3 text-xs text-soft-taupe"
                }`}
              >
                E-adresa
              </label>
              <input
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setIsEmailFocused(true)}
                onBlur={() => setIsEmailFocused(false)}
                disabled={isPending}
                className="w-full px-0 py-3 bg-transparent border-b border-gray-200 focus:border-astera-900 outline-none transition-colors duration-300 font-sans text-sm text-gray-900 placeholder:text-transparent"
                placeholder="you@example.com"
                required
              />
            </div>

            {/* Password Field with Visibility Toggle & Floating Label */}
            <div className="space-y-1 relative group">
              <label 
                className={`absolute left-0 transition-all duration-300 pointer-events-none uppercase tracking-[0.2em] font-bold ${
                  isPasswordFocused || password 
                    ? "-top-3.5 text-[8px] text-astera-900" 
                    : "top-3 text-xs text-soft-taupe"
                }`}
              >
                Lozinka
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => setIsPasswordFocused(false)}
                  disabled={isPending}
                  className="w-full pl-0 pr-8 py-3 bg-transparent border-b border-gray-200 focus:border-astera-900 outline-none transition-colors duration-300 font-sans text-sm text-gray-900 placeholder:text-transparent"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-soft-taupe hover:text-astera-900 transition-colors p-1"
                  aria-label={showPassword ? "Sakrij lozinku" : "Prikaži lozinku"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            
            <button 
              type="submit" 
              disabled={isPending}
              className="w-full inline-flex items-center justify-center px-10 py-4 font-sans text-[11px] font-bold tracking-[0.2em] uppercase rounded-none bg-charcoal text-white hover:bg-black hover:shadow-lg hover:shadow-astera-900/10 transition-all duration-300 disabled:opacity-50 mt-4 cursor-pointer"
            >
              {isPending ? (
                <>
                  <Loader2 size={14} className="animate-spin mr-2" />
                  {isLogin ? "Prijavljivanje..." : "Registriranje..."}
                </>
              ) : (
                isLogin ? "Prijavi se" : "Stvori račun"
              )}
            </button>
          </form>

          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-gray-150"></div>
            <span className="flex-shrink-0 mx-4 text-[9px] uppercase tracking-[0.2em] text-soft-taupe font-bold">Ili nastavite s</span>
            <div className="flex-grow border-t border-gray-150"></div>
          </div>

          {/* Premium OAuth Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => handleOAuth('google')}
              disabled={isPending}
              className="flex items-center justify-center gap-2 py-3 border border-gray-200 hover:border-astera-900 hover:bg-astera-50/50 transition-all duration-300 text-xs font-bold uppercase tracking-wider text-gray-700 disabled:opacity-50 rounded-xl cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
              </svg>
              Google
            </button>
            <button 
              onClick={() => handleOAuth('apple')}
              disabled={isPending}
              className="flex items-center justify-center gap-2 py-3 border border-gray-200 hover:border-astera-900 hover:bg-astera-50/50 transition-all duration-300 text-xs font-bold uppercase tracking-wider text-gray-700 disabled:opacity-50 rounded-xl cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current text-black" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.22.67-2.94 1.5-.63.73-1.18 1.87-1.03 2.97 1.12.09 2.27-.56 2.98-1.41z"/>
              </svg>
              Apple
            </button>
          </div>

          {/* Toggle between login/signup */}
          <div className="pt-4 text-center">
            <p className="text-soft-taupe text-xs">
              {isLogin ? "Nemate korisnički račun?" : "Već imate korisnički račun?"}
              <button
                onClick={(e) => { e.preventDefault(); setIsLogin(!isLogin); }}
                className="text-astera-900 font-bold uppercase tracking-[0.1em] hover:text-astera-700 transition-colors ml-3 border-b border-astera-900/30 hover:border-astera-900 pb-0.5 cursor-pointer"
              >
                {isLogin ? "Registrirajte se" : "Prijavite se"}
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
      <Suspense fallback={<div className="min-h-screen bg-warm-beige" />}>
        <LoginForm />
      </Suspense>
    </>
  );
}
