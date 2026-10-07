/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./config/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      // Palette mirrors the CSS variables in globals.css. Edit colours there
      // (or here) — keep them in sync. These names are used across components.
      colors: {
        ivory: "#F8F1DE",
        green: "#315D20",
        maroon: "#8B2635",
        gold: "#C99A3D",
        lotus: "#C83B62",
        brown: "#4A3028",
        // soft variants for backgrounds / borders
        "ivory-deep": "#F1E6C8",
        "gold-soft": "#E3C98A",
      },
      fontFamily: {
        // Wired up to next/font CSS variables in app/layout.js
        heading: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-eb-garamond)", "Georgia", "serif"],
        tamil: ["var(--font-noto-tamil)", "serif"],
      },
      keyframes: {
        "float-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "float-slow": "float-slow 6s ease-in-out infinite",
        shimmer: "shimmer 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
