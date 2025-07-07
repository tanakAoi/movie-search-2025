"use client";

import { signIn, useSession } from "next-auth/react";
import { UserSettings } from "../profile/UserSettings";

export default function AuthButton() {
  const { data: session } = useSession();

  if (session && session.user.id) {
    return <UserSettings userId={session.user.id} />;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 h-screen">
      <h2 className="text-lg font-semibold">Login to access more features</h2>
      <p className="">
        After logging in, you can access the following features:
      </p>
      <ul className="list-disc pl-5">
        <li>Profile Settings</li>
        <li>Your Watchlist</li>
      </ul>
      <button
        className="mt-4 px-4 py-2 bg-accent-bg text-base-bg hover:bg-base-bg hover:text-accent-bg rounded cursor-pointer"
        onClick={() => signIn("google")}
      >
        Login with Google
      </button>
    </div>
  );
}
