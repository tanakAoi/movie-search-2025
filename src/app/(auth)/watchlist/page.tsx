"use client";

import { LoginForm } from "@/app/components/login/LoginForm";
import { Watchlist } from "../components/ui/Watchlist";
import { useAuthToast } from "@/hooks/useAuthToast";
import { useSession } from "next-auth/react";
import StarryBackground from "@/app/components/decor/StarryBackground";

export default function WatchlistPage() {
  const { data: session } = useSession();
  useAuthToast();

  if (!session || !session.user?.id) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 min-h-screen relative text-base-bg">
        <StarryBackground />
        <p className="font-semibold mt-0 md:mt-18">
          Please login to view your watchlist 🎬
        </p>
        <LoginForm />
      </div>
    );
  }

  return <Watchlist />;
}
