import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const DESCRIPTION =
  "Timeless silver, gold, and gemstone jewellery — enquire directly on WhatsApp for pricing.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Ranjana Jewellers",
  description: DESCRIPTION,
  openGraph: {
    title: "Ranjana Jewellers",
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Ranjana Jewellers",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Ranjana Jewellers" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ranjana Jewellers",
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${ibmPlexSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
