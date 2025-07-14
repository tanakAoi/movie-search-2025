"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { SessionInitializer } from "./components/auth/SessionInitializer";
import { RegionProvider } from "@/context/RegionContext";
import { ProfileInitProvider } from "@/context/ProfileInitContext";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <RegionProvider>
        <ProfileInitProvider>
        <SessionInitializer />
        {children}
        </ProfileInitProvider>
      </RegionProvider>
    </SessionProvider>
  );
}
