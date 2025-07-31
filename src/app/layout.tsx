import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "../lib/config";
import { RegionProvider } from "@/context/RegionContext";
import { Providers } from "./providers";
import { Toaster } from "sonner";

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
        <Providers>
          <RegionProvider>{children}</RegionProvider>
          <Toaster
            position="top-center"
            richColors
            toastOptions={{
              className:
                "bg-base-fg text-base-bg shadow-lg border border-accent-bg",
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
