"use client";

import { useSession } from "next-auth/react";
import { UserSettings } from "../profile/UserSettings";
import { useAuthToast } from "@/hooks/useAuthToast";
import { LoginForm } from "@/app/components/login/LoginForm";

export default function AuthGate() {
  const { data: session } = useSession();
  useAuthToast();

  if (session && session.user.id) {
    return <UserSettings userId={session.user.id} />;
  }

  return (
    <div className="text-base-bg flex flex-col items-center md:justify-center min-h-screen h-full relative">
      <LoginForm />
    </div>
  );
}
