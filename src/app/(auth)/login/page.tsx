"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function LoginPage() {
  const [email, setEmail] = useState("user@astera.com");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // In v5, we often use server actions, but client-side signIn still works if configured
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid credentials. Try user@astera.com / password123");
    } else {
      router.push("/account");
      router.refresh();
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-40 pb-20 flex items-center justify-center bg-astera-50">
        <div className="bg-white p-12 rounded-2xl shadow-xl w-full max-w-md border border-astera-100">
          <h1 className="font-serif text-4xl text-center mb-2">Welcome Back</h1>
          <p className="text-gray-500 text-center text-sm mb-10 tracking-wide font-sans">Enter your details to access your Astera profile</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] font-sans font-semibold uppercase tracking-widest mb-2">Email Address</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-3 bg-gray-50 border border-gray-100 focus:border-astera-400 outline-none transition-all font-sans text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-sans font-semibold uppercase tracking-widest mb-2">Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-3 bg-gray-50 border border-gray-100 focus:border-astera-400 outline-none transition-all font-sans text-sm"
                required
              />
            </div>
            {error && <p className="text-red-500 text-xs font-sans italic">{error}</p>}
            
            <button type="submit" className="btn-astera w-full py-4 text-xs tracking-[0.2em]">
              Sign In
            </button>
          </form>
          
          <div className="mt-8 text-center pt-8 border-t border-gray-100">
            <p className="text-gray-400 text-xs font-sans">
              Don't have an account? <span className="text-astera-600 font-semibold cursor-pointer hover:underline">Join the Collective</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
