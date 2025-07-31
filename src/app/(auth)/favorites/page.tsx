"use client";

import { DefaultButton } from "@/app/components/ui/DefaultButton";
import { signIn, useSession } from "next-auth/react";
import { Favorites } from "../components/ui/Favorites";

export default function FavoritesPage() {
  const { data: session } = useSession();

  if (!session || !session.user?.id) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 h-screen">
        <p>Please login to view your favorites 📌</p>
        <DefaultButton
          text="Login with Google"
          onClick={() => signIn("google")}
          className="mt-4"
        />
      </div>
    );
  }

  return <Favorites />;
}
