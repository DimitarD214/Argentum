"use client";
import { useState } from "react";

export default function BuyNowButton({ 
  productName, 
  productPrice, 
  productDescription = "", 
  className = "", 
  children,
  userId = null 
}: any) {
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    setLoading(true);
    try {
      console.log("🛒 Initiating checkout for:", productName);
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productName, productPrice, productDescription, userId }),
      });
      const data = await res.json();
      if (data.url) {
        console.log("✅ Redirecting to Stripe...");
        window.location.href = data.url;
      } else {
        console.error("❌ Checkout error:", data.error);
        alert("Payment failed: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error("❌ Network error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button 
      onClick={handleCheckout} 
      disabled={loading} 
      className={`relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-black text-white font-sans text-[11px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {loading ? "Processing..." : (children || `Buy Now — $${(productPrice / 100).toFixed(2)}`)}
    </button>
  );
}
