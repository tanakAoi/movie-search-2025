import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "../lib/config";
import { RegionProvider } from "@/context/RegionContext";
import { ProfileInitProvider } from "@/context/ProfileInitContext";

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
        <RegionProvider>
          <ProfileInitProvider>{children}</ProfileInitProvider>
        </RegionProvider>
      </body>
    </html>
  );
}
