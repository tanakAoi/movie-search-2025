"use client";

import { signIn } from "next-auth/react";
import { DefaultButton } from "../ui/DefaultButton";
import { useState } from "react";
import { toast } from "sonner";
import { siteConfig } from "@/lib/config";

export const LoginForm = () => {
  const [email, setEmail] = useState("");

  const handleEmailSignIn = async () => {
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    const result = await signIn("email", {
      email,
      redirect: false,
      callbackUrl: window.location.href,
    });

    if (result?.ok) {
      toast.success("Login email sent! Please check your inbox.");
    } else {
      toast.error("Failed to send login link.");
    }
  };

  return (
    <div className="bg-base-bg text-base-fg px-5 py-12 md:p-10 rounded-lg shadow-2xl shadow-base-bg/20 text-center my-10">
      <span className="text-4xl inline-block font-bold mb-4 font-lobster">
        {siteConfig.siteName}
      </span>
      <p className="mb-4 text-sm">Maximize your movie experience.</p>
      <div className="flex flex-col items-center gap-8 md:w-sm w-[80vw] mt-8">
        <DefaultButton
          text="Login with Google"
          onClick={() => signIn("google")}
          className="w-full"
        />
        <div className="flex flex-col gap-2 w-full pt-4 border-base-fg/20 border-t">
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 rounded border border-base-fg/20 shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-accent-bg"
          />
          <DefaultButton text="Login with Email" onClick={handleEmailSignIn} />
        </div>
        <span>or</span>
        <DefaultButton
          text="Login as Guest"
          onClick={() => signIn("guest")}
          className="w-full"
        />
      </div>
    </div>
  );
};
