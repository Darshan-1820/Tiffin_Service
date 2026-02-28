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
        cream: "#F5F2EC",
        charcoal: "#181614",
        accent: "#C84B28",
        "accent-light": "#F7E5DA",
        surface: "#ECE8E0",
        muted: "#78716A",
      },
      fontFamily: {
        display: ["Clash Display", "var(--font-clash)", "sans-serif"],
        body: ["Satoshi", "var(--font-satoshi)", "sans-serif"],
        serif: ["var(--font-fraunces)", "serif"],
      },
      fontSize: {
        display: "clamp(3rem, 9vw, 8rem)",
        h1: "clamp(2.25rem, 6vw, 5rem)",
        h2: "clamp(1.75rem, 4vw, 3rem)",
        h3: "clamp(1.15rem, 1.8vw, 1.5rem)",
      },
      letterSpacing: {
        "tight-display": "-0.05em",
        "wide-caps": "0.12em",
      },
      lineHeight: {
        display: "0.9",
        tight: "1.1",
      },
    },
  },
  plugins: [],
};
export default config;
