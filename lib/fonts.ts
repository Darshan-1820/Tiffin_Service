import { Fraunces } from "next/font/google";

// Fraunces — serif accent for editorial moments
export const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["italic", "normal"],
  variable: "--font-fraunces",
  display: "swap",
});

// Clash Display + Satoshi loaded via Fontshare CSS in layout.tsx <link>
// These are the primary display and body fonts
