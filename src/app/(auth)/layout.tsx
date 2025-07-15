"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { SessionInitializer } from "./components/auth/SessionInitializer";
import { ProfileInitProvider } from "@/context/ProfileInitContext";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ProfileInitProvider>
        <SessionInitializer />
        {children}
      </ProfileInitProvider>
    </SessionProvider>
  );
}
