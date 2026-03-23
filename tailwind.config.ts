import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#f6f1e6",
        milk: "#fffaf0",
        ink: "#1f1d1a",
        mute: "#5d5952",
        line: "#2f2d2a",
        accent: "#2f65c9",
        ember: "#d8682e",
      },
      boxShadow: {
        pixel: "4px 4px 0 0 #1f1d1a",
        "pixel-soft": "3px 3px 0 0 #2f2d2a",
      },
      borderRadius: {
        pixel: "2px",
      },
      fontFamily: {
        pixel: ["var(--font-pixel)", "monospace"],
        body: ["var(--font-body)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
