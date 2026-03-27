import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "[BRAND] | Bangalore — Series 001",
  description: "Phygital luxury streetwear. 10 ultra-limited garments per drop. Each paired with an NFT certificate of ownership on Polygon blockchain.",
  keywords: ["luxury streetwear", "NFT", "phygital", "Bangalore", "limited edition", "NFC"],
  authors: [{ name: "[BRAND]" }],
  openGraph: {
    title: "[BRAND] | Bangalore — Series 001",
    description: "Phygital luxury streetwear. 10 ultra-limited garments per drop.",
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
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-brand-black">
        {children}
      </body>
    </html>
  );
}
