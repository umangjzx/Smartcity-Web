import type { Metadata, Viewport } from "next";
import { Inter, Poppins, Montserrat } from "next/font/google";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";
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

const TITLE = "DHRUVAM 2026–27 | Rotaract Club of Coimbatore Smartcity";
const DESCRIPTION =
  "DHRUVAM — The Star That Guides. A community of young leaders transforming Coimbatore through service, professional development, and meaningful connections. Rotary District 3206.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["Rotaract", "Coimbatore", "Smartcity", "District 3206", "Youth Leadership", "Community Service", "DHRUVAM"],
  authors: [{ name: SITE_NAME }],
  openGraph: {
    title: TITLE,
    description: "The Star That Guides — direction, unity, wisdom, courage and gratitude guiding our 2026–27 year of service.",
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  alternateName: "DHRUVAM 2026-27",
  url: SITE_URL,
  logo: `${SITE_URL}/icon`,
  description: DESCRIPTION,
  foundingDate: "2021-05-17",
  email: "rotaractsmartcity@gmail.com",
  sameAs: ["https://www.instagram.com/rac_cbe.smartcity"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Coimbatore",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CinematicBackground />
        {children}
      </body>
    </html>
  );
}
