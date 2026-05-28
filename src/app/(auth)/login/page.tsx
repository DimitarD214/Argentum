"use client";
import { useState, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { login, signup } from "./actions";
import { toast } from "sonner";

function LoginForm() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        className: 'font-sans text-sm',
        style: {
          background: 'var(--color-astera-cream)',
          color: 'var(--color-astera-text)',
          border: '1px solid var(--color-astera-border)',
        }
      });
    }
  }, [error]);

  return (
    <div className="min-h-screen pt-40 pb-20 flex items-center justify-center bg-astera-cream">
      <div className="bg-astera-white p-10 md:p-14 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] w-full max-w-lg border border-astera-border transition-all duration-500 hover:scale-[1.01]">
        <h1 className="font-serif text-4xl text-center mb-3 text-astera-dark tracking-widest uppercase">
          {isLogin ? "Dobrodošli Natrag" : "Pridružite se Kolektivu"}
        </h1>
        <p className="text-astera-text/70 text-center text-sm mb-12 tracking-wide font-sans">
          {isLogin ? "Unesite svoje podatke za pristup Astera profilu" : "Stvorite račun za spremanje favorita i praćenje narudžbi"}
        </p>

        <form action={isLogin ? login : signup} className="space-y-8">
          <div className="relative group">
            <div className="absolute -top-3 left-4 px-4 py-1.5 backdrop-blur-md bg-astera-white/70 rounded-full border border-astera-border/50 text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-astera-text z-10 transition-all duration-500 group-focus-within:border-astera-gold">
              Email Adresa
            </div>
            <input
              name="email"
              type="email"
              className="w-full px-6 py-5 bg-transparent border border-astera-border rounded-2xl focus:ring-1 focus:ring-astera-gold focus:border-astera-gold outline-none transition-all duration-500 font-sans text-sm text-astera-dark placeholder:text-astera-text/30"
              placeholder="Unesite svoj email"
              required
            />
          </div>
          <div className="relative group">
            <div className="absolute -top-3 left-4 px-4 py-1.5 backdrop-blur-md bg-astera-white/70 rounded-full border border-astera-border/50 text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-astera-text z-10 transition-all duration-500 group-focus-within:border-astera-gold">
              Lozinka
            </div>
            <input
              name="password"
              type="password"
              className="w-full px-6 py-5 bg-transparent border border-astera-border rounded-2xl focus:ring-1 focus:ring-astera-gold focus:border-astera-gold outline-none transition-all duration-500 font-sans text-sm text-astera-dark placeholder:text-astera-text/30"
              placeholder="••••••••"
              required
            />
          </div>
          
          <button type="submit" className="w-full flex items-center justify-center py-5 bg-astera-dark text-astera-white font-sans text-xs font-bold tracking-[0.2em] uppercase rounded-full transition-all duration-500 ease-in-out hover:bg-astera-gold hover:scale-[1.01] hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            {isLogin ? "Prijava" : "Registracija"}
          </button>
        </form>

        <div className="mt-12 text-center pt-8 border-t border-astera-border/50">
          <p className="text-astera-text/70 text-xs font-sans tracking-wide">
            {isLogin ? "Nemate račun?" : "Već imate račun?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-astera-dark font-bold uppercase tracking-[0.15em] hover:text-astera-gold transition-colors duration-500 ml-3"
            >
              {isLogin ? "Pridružite se Kolektivu" : "Prijava"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-astera-cream" />}>
      <LoginForm />
    </Suspense>
  );
}
