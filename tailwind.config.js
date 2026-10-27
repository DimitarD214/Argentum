/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        astera: {
          50: "#fbf8f4",
          100: "#f4ece0",
          200: "#e7d5be",
          300: "#d3b289",
          400: "#bd8b5b",
          500: "#9d6338",
          600: "#824925",
          700: "#66321b",
          800: "#4b1e16",
          900: "#31120e",
        },
        cognac: "#9d6338",
        amber: "#c88a4b",
        terracotta: "#b56545",
        cinnamon: "#8c4a27",
        bordeaux: "#4b1e16",
        burgundy: "#5c1a24",
        cashmere: "#f4ece0",
        gold: "#c6a15b",
        champagne: "#eedcb3",
        cream: "#fdfbf7",
        "warm-beige": "#f7f2ea",
        "luxury-beige": "#fcf9f4",
        "soft-taupe": "#9c8f84",
        charcoal: "#211815",
        obsidian: "#110b09",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};
