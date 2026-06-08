import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { Inter } from "next/font/google";
import { MobileNav } from "@/components/mobile-nav";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Leous | Bangalore — Series 001",
  description: "Phygital luxury streetwear. 10 ultra-limited garments per drop. Each paired with an NFT certificate of ownership on Polygon blockchain.",
  keywords: ["luxury streetwear", "NFT", "phygital", "Bangalore", "limited edition", "NFC"],
  authors: [{ name: "Leous" }],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Leous",
  },
  openGraph: {
    title: "Leous | Bangalore — Series 001",
    description: "Phygital luxury streetwear. 10 ultra-limited garments per drop.",
    type: "website",
    locale: "en_IN",
  },
};

export const viewport: Viewport = {
  themeColor: "#080808",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${GeistSans.variable} ${inter.variable}`}>
      <head>
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className="min-h-full flex flex-col bg-brand-black pb-14 md:pb-0 overscroll-none font-body">
        {children}
        <MobileNav />
      </body>
    </html>
  );
}
