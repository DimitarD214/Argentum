"use client";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import { login, signup } from "./actions";

function LoginForm() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen pt-40 pb-20 flex items-center justify-center bg-astera-50">
      <div className="bg-white p-12 rounded-2xl shadow-xl w-full max-w-md border border-astera-100">
        <h1 className="font-serif text-4xl text-center mb-2">
          {isLogin ? "Welcome Back" : "Join the Collective"}
        </h1>
        <p className="text-gray-500 text-center text-sm mb-10 tracking-wide font-sans">
          {isLogin ? "Enter your details to access your Astera profile" : "Create an account to save your favourites and track orders"}
        </p>

        <form action={isLogin ? login : signup} className="space-y-6">
          <div>
            <label className="block text-[10px] font-sans font-semibold uppercase tracking-widest mb-2">Email Address</label>
            <input
              name="email"
              type="email"
              className="w-full px-5 py-3 bg-gray-50 border border-gray-100 focus:border-astera-400 outline-none transition-all font-sans text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-[10px] font-sans font-semibold uppercase tracking-widest mb-2">Password</label>
            <input
              name="password"
              type="password"
              className="w-full px-5 py-3 bg-gray-50 border border-gray-100 focus:border-astera-400 outline-none transition-all font-sans text-sm"
              required
            />
          </div>
          {error && <p className="text-red-500 text-xs font-sans italic">{error}</p>}
          <button type="submit" className="btn-astera w-full py-4 text-xs tracking-[0.2em] bg-astera-900 text-white rounded-full">
            {isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <div className="mt-8 text-center pt-8 border-t border-gray-100">
          <p className="text-gray-400 text-xs font-sans">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <span
              onClick={() => setIsLogin(!isLogin)}
              className="text-astera-600 font-semibold cursor-pointer hover:underline ml-1"
            >
              {isLogin ? "Join the Collective" : "Sign In"}
            </span>
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
      <Suspense fallback={<div className="min-h-screen bg-astera-50" />}>
        <LoginForm />
      </Suspense>
    </>
  );
}
