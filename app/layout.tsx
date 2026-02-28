import type { Metadata } from "next";
import { fraunces } from "@/lib/fonts";
import { LenisProvider } from "@/components/layout/LenisProvider";
import { SITE } from "@/lib/constants";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "tiffin service Nagpur",
    "home cooked food Manish Nagar",
    "tiffin delivery Nagpur",
    "lunch delivery Manish Nagar",
    "dinner delivery Nagpur",
    "healthy tiffin Nagpur",
  ],
  openGraph: {
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fraunces.variable}>
      <head>
        {/* Fontshare — Clash Display + Satoshi */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400;500;600;700&f[]=satoshi@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
