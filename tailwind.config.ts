import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: {
          canvas: "#0D1420",
          canvasAlt: "#141E2C",
          card: "#1A2838",
          border: "#2A3E55",
          hi: "#C8D4DE",
          mid: "#A0B8C8",
          low: "#6A859A",
        },
        light: {
          canvas: "#F5F6F8",
          card: "#FFFFFF",
          border: "#E4E7EC",
          hi: "#1A1F2A",
          mid: "#4A5060",
          low: "#6B7280",
        },
        gold: {
          DEFAULT: "#C8A85C",
          hoverD: "#DFC87C",
          hoverL: "#B8983C",
          textL: "#8A6F2E",
        },
        teal: { d: "#4AAFB8", l: "#0D8B92" },
        alert: { d: "#D44040", l: "#A82828" },
      },
      fontFamily: {
        display: ['"D-DIN Exp"', '"D-DIN"', "system-ui", "sans-serif"],
        body: ['"D-DIN"', '"Helvetica Neue"', "system-ui", "sans-serif"],
      },
      maxWidth: { container: "1160px" },
    },
  },
  plugins: [],
};
export default config;
