"use client";

import { useSession } from "next-auth/react";
import { useRegion } from "@/context/RegionContext";
import { updateProfile } from "@/services/profileService";
import { useEffect, useRef } from "react";
import { useProfileInit } from "@/context/ProfileInitContext";

export function SessionInitializer() {
  const { data: session } = useSession();
  const { currentCountry, currentLanguage } = useRegion();
  const ranOnce = useRef(false);
  const { setProfileReady } = useProfileInit();

  useEffect(() => {
    const run = async () => {
      if (!ranOnce.current && session?.user) {
        if (!session.user.country || !session.user.language) {
          if (session.user.id) {
            await updateProfile(session.user.id, {
              country: currentCountry ?? undefined,
              language: currentLanguage ?? undefined,
            });
          }
        }
        ranOnce.current = true;
        setProfileReady(true);
      } else if (session?.user) {
        setProfileReady(true);
      }
    };

    run();
  }, [session, currentCountry, currentLanguage, setProfileReady]);

  return null;
}
