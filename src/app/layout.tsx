import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "../lib/config/config";
import { RegionProvider } from "@/context/RegionContext";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: siteConfig.siteName,
  description: siteConfig.siteDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <RegionProvider>{children}</RegionProvider>
      </body>
    </html>
  );
}
