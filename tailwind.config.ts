import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        accent: "#6c63ff",
        "accent-dark": "#574fd6",
        navy: "#0f0f1a",
        card: "#1a1a2e",
        input: "#1e1e38"
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"]
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" }
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(108, 99, 255, 0.35)" },
          "50%": { boxShadow: "0 0 0 14px rgba(108, 99, 255, 0)" }
        }
      },
      animation: {
        shimmer: "shimmer 2.2s linear infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2.6s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
