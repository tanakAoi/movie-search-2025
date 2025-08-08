"use client";

import {
  fetchCountries,
  getProfile,
  updateProfile,
} from "@/services/profileService";
import { UserProfile } from "@/types/profile";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useRegion } from "./RegionContext";
import { ICountry } from "@/types/tmdb";
import Cookies from "js-cookie";
import { useSession } from "next-auth/react";

type UserProfileContextType = {
  userData: UserProfile | null;
  setUserData: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  updateUserProfile: (
    id: string,
    updates: Partial<UserProfile>
  ) => Promise<boolean>;
  fetchUserProfile: (id: string) => Promise<void>;
  loading?: boolean;
};

const UserProfileContext = createContext<UserProfileContextType>({
  userData: null,
  setUserData: () => {},
  updateUserProfile: async () => {
    return true;
  },
  fetchUserProfile: async () => {},
  loading: false,
});

export const UserProfileProvider = ({ children }: { children: ReactNode }) => {
  const {
    setCountriesList,
    setCurrentCountry,
    setCurrentLanguage,
    currentCountry,
    currentLanguage,
  } = useRegion();
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();

  const fetchUserProfile = async (id: string) => {
    setLoading(true);

    try {
      const profile = await getProfile(id);
      if (profile) {
        const formatted: UserProfile = {
          id: profile.id,
          username: profile.username ?? "",
          email: profile.email ?? "",
          country: profile.country ?? "",
          language: profile.language ?? "",
          avatar: profile.avatar ?? "",
        };
        setUserData(formatted);
        Cookies.set("userLanguage", profile.language?.iso_639_1 || "");
        Cookies.set("userCountry", profile.country?.iso_3166_1 || "");
      } else {
        setUserData(null);
      }
    } catch (err) {
      console.error("Failed to fetch profile:", err);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (
    id: string,
    updates: Partial<UserProfile>
  ): Promise<boolean> => {
    if (!id || !updates) return false;
    setLoading(true);

    try {
      // Get new countryList before saving data in DB
      if (updates.language?.iso_639_1) {
        const newCountriesList = await fetchCountries(
          updates.language?.iso_639_1
        );
        setCountriesList(newCountriesList);
        updates.country = newCountriesList.find(
          (c: ICountry) => c.iso_3166_1 === updates.country?.iso_3166_1
        );
      }

      // Update profile in DB
      const res = await updateProfile(id, updates);

      if (res.status === 200) {
        // Update cookie & context
        Cookies.set("userLanguage", updates.language?.iso_639_1 || "");
        Cookies.set("userCountry", updates.country?.iso_3166_1 || "");
        if (updates.country) {
          setCurrentCountry(updates.country);
        }
        if (updates.language) {
          setCurrentLanguage(updates.language);
        }

        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to update user profile:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status !== "authenticated" || !session?.user?.id) return;

    const initialize = async () => {
      try {
        if (
          session.user.id &&
          (!session.user.country || !session.user.language)
        ) {
          const success = await updateUserProfile(session.user.id, {
            country: currentCountry,
            language: currentLanguage,
          });
          if (!success) {
            console.error("Failed to update user profile with initial data");
            return;
          }
        }

        if (session.user.id) {
          await fetchUserProfile(session.user.id);
        }
      } catch (error) {
        console.error("Failed to initialize user profile:", error);
        setUserData(null);
      }
    };

    initialize();
  }, [status, session?.user?.id]);

  return (
    <UserProfileContext.Provider
      value={{
        userData,
        setUserData,
        updateUserProfile,
        fetchUserProfile,
        loading,
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => useContext(UserProfileContext);
