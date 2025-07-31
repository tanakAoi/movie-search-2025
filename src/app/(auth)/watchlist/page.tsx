"use client";

import { Watchlist } from "../components/ui/Watchlist";
import { DefaultButton } from "@/app/components/ui/DefaultButton";
import { signIn, useSession } from "next-auth/react";

export default function WatchlistPage() {
  const { data: session } = useSession();

  if (!session || !session.user?.id) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 h-screen">
        <p>Please login to view your watchlist 🎬</p>
        <DefaultButton
          text="Login with Google"
          onClick={() => signIn("google")}
          className="mt-4"
        />
      </div>
    );
  }

  return <Watchlist />;
}
