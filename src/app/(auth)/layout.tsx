"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { SessionInitializer } from "./components/auth/SessionInitializer";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <SessionInitializer />
      {children}
    </SessionProvider>
  );
}
