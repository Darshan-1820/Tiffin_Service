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
        cream: "#FAF8F3",
        charcoal: "#1C1C1C",
        accent: "#E8702A",
        "accent-light": "#FFECD2",
        surface: "#F4F0EA",
        muted: "#9C9889",
      },
      fontFamily: {
        display: ["Clash Display", "var(--font-clash)", "sans-serif"],
        body: ["Satoshi", "var(--font-satoshi)", "sans-serif"],
        serif: ["var(--font-fraunces)", "serif"],
      },
      fontSize: {
        // Fluid type scale
        "display": "clamp(3.5rem, 10vw, 9rem)",
        "h1": "clamp(2.5rem, 7vw, 6rem)",
        "h2": "clamp(1.75rem, 4.5vw, 3.5rem)",
        "h3": "clamp(1.25rem, 2vw, 1.75rem)",
      },
      letterSpacing: {
        "tight-display": "-0.04em",
        "wide-caps": "0.1em",
      },
      lineHeight: {
        "display": "0.92",
        "tight": "1.1",
      },
    },
  },
  plugins: [],
};
export default config;
