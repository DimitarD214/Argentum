"use client";
import { useState, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
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
          background: '#fdfcf8',
          color: '#1a1a1a',
          border: '1px solid rgba(0,0,0,0.05)',
        }
      });
    }
  }, [error]);

  return (
    <div className="min-h-screen pt-40 pb-20 flex items-center justify-center bg-luxury-beige">
      <div className="bg-pure-white p-10 md:p-14 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.03)] w-full max-w-lg border border-gray-100 transition-all duration-500">
        <h1 className="font-serif text-4xl text-center mb-3 text-astera-900 tracking-wide">
          {isLogin ? "Welcome Back" : "Join the Collective"}
        </h1>
        <p className="text-soft-taupe text-center text-sm mb-12 tracking-wide font-sans">
          {isLogin ? "Enter your details to access your Astera profile" : "Create an account to save your favourites and track orders"}
        </p>

        <form action={isLogin ? login : signup} className="space-y-8">
          <div className="space-y-2">
            <label className="block text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-gray-500">Email Address</label>
            <input
              name="email"
              type="email"
              className="w-full px-4 py-4 bg-transparent border-b border-gray-200 focus:border-astera-900 outline-none transition-colors duration-500 font-sans text-sm text-gray-900 placeholder:text-gray-300"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-gray-500">Password</label>
            <input
              name="password"
              type="password"
              className="w-full px-4 py-4 bg-transparent border-b border-gray-200 focus:border-astera-900 outline-none transition-colors duration-500 font-sans text-sm text-gray-900 placeholder:text-gray-300"
              placeholder="••••••••"
              required
            />
          </div>
          
          <button type="submit" className="w-full btn-luxury mt-4 rounded-full">
            {isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <div className="mt-10 text-center pt-8 border-t border-gray-100">
          <p className="text-soft-taupe text-xs font-sans">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-astera-900 font-bold uppercase tracking-[0.1em] hover:text-astera-700 transition-colors ml-2"
            >
              {isLogin ? "Join the Collective" : "Sign In"}
            </button>
          </p>
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
