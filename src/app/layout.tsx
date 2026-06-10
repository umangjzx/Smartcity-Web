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
  themeColor: "#C8102E",
};

export const metadata: Metadata = {
  title: "Rotaract Club of Coimbatore Smartcity | Ignite · Influence · Impact",
  description:
    "A community of young leaders transforming Coimbatore through service, professional development, and meaningful connections. Rotary District 3206.",
  keywords: ["Rotaract", "Coimbatore", "Smartcity", "District 3206", "Youth Leadership", "Community Service"],
  openGraph: {
    title: "Rotaract Club of Coimbatore Smartcity",
    description: "Ignite · Influence · Impact — Building the future through youth empowerment and community service.",
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
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} ${montserrat.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-white text-[var(--color-charcoal)]">
        {children}
      </body>
    </html>
  );
}
