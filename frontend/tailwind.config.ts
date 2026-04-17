import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        page: "#eef2f7",
        panel: "#ffffff",
        line: "#d8dee9",
        text: "#1f2937",
        muted: "#64748b",
        brand: "#2f6db2",
        brandDark: "#25578c"
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        mono: ["var(--font-jetbrains-mono)"]
      },
      boxShadow: {
        panel: "0 1px 2px rgba(15, 23, 42, 0.06)"
      }
    }
  },
  plugins: []
};

export default config;
