"use client";

import { useSession } from "next-auth/react";
import { useRegion } from "@/context/RegionContext";
import { updateProfile } from "@/services/profileService";
import { useEffect, useRef } from "react";

export function SessionInitializer() {
  const { data: session } = useSession();
  const { country, language } = useRegion();
  const ranOnce = useRef(false);

  useEffect(() => {
    if (
      !ranOnce.current &&
      session?.user &&
      (!session.user.country || !session.user.language)
    ) {
      if (session.user.id) {
        updateProfile(session.user.id, {
          country: country ?? undefined,
          language: language ?? undefined,
        }).catch(console.error);
      }
      ranOnce.current = true;
    }
  }, [session, country, language]);

  return null;
}
