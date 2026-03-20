import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FAFAFA",
        // Changing charcoal to a deep, elegant anthracite/navy for Argentum
        charcoal: "#0F172A", 
        anthracite: "#0F172A",
        // Replacing gold with Silver/Chrome tones
        gold: {
          DEFAULT: "#94A3B8", // Cool slate silver
          light: "#E2E8F0",
        },
        silver: {
          DEFAULT: "#94A3B8",
          light: "#E2E8F0",
          dark: "#64748B"
        }
      },
      fontFamily: {
        serif: ["var(--font-cormorant)"],
        sans: ["var(--font-inter)"],
      },
      animation: {
        'fade-in-up': 'fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slow-zoom': 'slowZoom 10s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slowZoom: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.05)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
