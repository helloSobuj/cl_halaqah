import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  "#e8f5f1",
          100: "#c5e5da",
          200: "#9fd3c1",
          300: "#72c0a7",
          400: "#4db394",
          500: "#2da67f",
          600: "#1f8f6b",
          700: "#1a7459",   // main brand
          800: "#145a45",
          900: "#0d3f30",
          950: "#071f18",
        },
        accent: {
          50:  "#fdf8ec",
          100: "#f9edca",
          200: "#f4dea2",
          300: "#eeca72",
          400: "#e8b94a",
          500: "#d4a017",   // gold
          600: "#b8870f",
          700: "#9a6d0b",
          800: "#7a5409",
          900: "#573c07",
        },
        surface: {
          light: "#F8F4EE",
          dark: "#0E1E1A",
        },
        card: {
          light: "#FFFFFF",
          dark: "#162820",
        },
        border: {
          light: "#E8E0D4",
          dark: "#1E3530",
        },
      },
      fontFamily: {
        bangla: ["'Noto Serif Bengali'", "serif"],
        sans: ["'Plus Jakarta Sans'", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      boxShadow: {
        card: "0 2px 16px 0 rgba(0,0,0,0.06)",
        "card-dark": "0 2px 16px 0 rgba(0,0,0,0.35)",
        glow: "0 0 24px 0 rgba(29,116,89,0.25)",
      },
      backgroundImage: {
        "geometric-light": "url('/patterns/geometric-light.svg')",
        "geometric-dark": "url('/patterns/geometric-dark.svg')",
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease forwards",
        "fade-in": "fadeIn 0.4s ease forwards",
        shimmer: "shimmer 1.5s infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
