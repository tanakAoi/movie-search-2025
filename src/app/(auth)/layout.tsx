"use client";

import { ReactNode } from "react";
import { SessionInitializer } from "./components/auth/SessionInitializer";
import { ProfileInitProvider } from "@/context/ProfileInitContext";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <ProfileInitProvider>
      <SessionInitializer />
      {children}
    </ProfileInitProvider>
  );
}
