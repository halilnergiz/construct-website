import type { Metadata } from "next";

import { Navigation, Footer } from "@/components";
import { brandConfig } from "@/config/brand";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: brandConfig.companyName,
    template: `%s | ${brandConfig.companyName}`,
  },
  description: brandConfig.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className="flex min-h-screen flex-col bg-white text-gray-900 antialiased">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
