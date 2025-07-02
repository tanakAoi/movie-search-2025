"use client";

import { useSession } from "next-auth/react";
import { useRegion } from "@/context/RegionContext";
import { updateProfile } from "@/services/profileService";
import { useEffect, useRef } from "react";

export function SessionInitializer() {
  const { data: session, update } = useSession();
  const { country, language } = useRegion();
  const ranOnce = useRef(false);

  useEffect(() => {
    if (
      !ranOnce.current &&
      session?.user &&
      (!session.user.country || !session.user.language)
    ) {
      if (!session.user.id) {
        console.error("User ID is undefined");
        return;
      }
      updateProfile(session.user.id, {
        country: country ?? undefined,
        language: language ?? undefined,
      })
        .then(() => {
          update();
        })
        .catch(console.error);
      ranOnce.current = true;
    }
  }, [session, country, language]);

  return null;
}
