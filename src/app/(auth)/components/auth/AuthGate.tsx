"use client";

import { signIn, useSession } from "next-auth/react";
import { UserSettings } from "../profile/UserSettings";
import { DefaultButton } from "../../../components/ui/DefaultButton";

export default function AuthGate() {
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
      <DefaultButton
        text="Login with Google"
        onClick={() => signIn("google")}
        className="mt-4"
      />
    </div>
  );
}
