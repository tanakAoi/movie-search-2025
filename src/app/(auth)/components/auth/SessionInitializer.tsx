"use client";

import { useSession } from "next-auth/react";
import { useRegion } from "@/context/RegionContext";
import { updateProfile } from "@/services/profileService";
import { useEffect, useRef } from "react";
import { useProfileInit } from "@/context/ProfileInitContext";
import Cookies from "js-cookie";

export function SessionInitializer() {
  const { data: session } = useSession();
  const { currentCountry, currentLanguage } = useRegion();
  const ranOnce = useRef(false);
  const { setProfileReady } = useProfileInit();

  useEffect(() => {
    const run = async () => {
      if (!ranOnce.current && session?.user) {
        if (currentCountry?.iso_3166_1) {
          Cookies.set("userCountry", currentCountry.iso_3166_1, {
            expires: 365,
          }); 
        }

        if (currentLanguage?.iso_639_1) {
          const langCode = `${currentLanguage.iso_639_1}-${
            currentCountry?.iso_3166_1 || "en-US"
          }`;
          Cookies.set("userLanguage", langCode, { expires: 365 });
        }

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
