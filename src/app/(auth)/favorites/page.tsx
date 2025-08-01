"use client";

import { useSession } from "next-auth/react";
import { Favorites } from "../components/ui/Favorites";
import { useAuthToast } from "@/hooks/useAuthToast";
import { LoginForm } from "@/app/components/login/LoginForm";
import StarryBackground from "@/app/components/decor/StarryBackground";

export default function FavoritesPage() {
  const { data: session } = useSession();
  useAuthToast();
  if (!session || !session.user?.id) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 min-h-screen relative text-base-bg">
        <StarryBackground />
        <p className="font-semibold">Please login to view your favorites 📌</p>
        <LoginForm />
      </div>
    );
  }

  return <Favorites />;
}
