import type { Metadata, Viewport } from "next";
import { Inter, Poppins, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  weight: ["700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#020B1C",
};

export const metadata: Metadata = {
  title: "DHRUVAM 2026–27 | Rotaract Club of Coimbatore Smartcity",
  description:
    "DHRUVAM — The Star That Guides. A community of young leaders transforming Coimbatore through service, professional development, and meaningful connections. Rotary District 3206.",
  keywords: ["Rotaract", "Coimbatore", "Smartcity", "District 3206", "Youth Leadership", "Community Service", "DHRUVAM"],
  openGraph: {
    title: "DHRUVAM 2026–27 | Rotaract Club of Coimbatore Smartcity",
    description: "The Star That Guides — direction, unity, wisdom, courage and gratitude guiding our 2026–27 year of service.",
    type: "website",
    locale: "en_IN",
  },
};

import CinematicBackground from "@/components/layout/CinematicBackground";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} ${montserrat.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-[var(--color-dhruvam-950)] text-white relative">
        <CinematicBackground />
        {children}
      </body>
    </html>
  );
}
