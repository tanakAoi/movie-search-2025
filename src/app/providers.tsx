"use client";

import { SessionProvider } from "next-auth/react";
import { ListItemsProvider } from "@/context/ListItemsContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ListItemsProvider>{children}</ListItemsProvider>
    </SessionProvider>
  );
}
