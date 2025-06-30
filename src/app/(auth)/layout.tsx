"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { SessionInitializer } from "./components/profile/SessionInitializer";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <SessionInitializer />
      {children}
    </SessionProvider>
  );
}
