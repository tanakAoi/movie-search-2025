"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        <p>Welcome {session.user?.name}</p>
        <button onClick={() => signOut()}>Logout</button>
      </div>
    );
  }

  return <button onClick={() => signIn("google")}>Login with Google</button>;
}
