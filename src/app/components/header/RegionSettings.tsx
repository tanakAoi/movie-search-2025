import { CountrySelector } from "@/app/(auth)/components/profile/CountrySelector";
import { LanguageSelector } from "@/app/(auth)/components/profile/LanguageSelector";
import { motion } from "motion/react";
import { DefaultButton } from "../ui/DefaultButton";
import { Close } from "../ui/icons/MaterialSymbols";
import Image from "next/image";
import { ICountry, ILanguage } from "@/types/tmdb";
import { toast } from "sonner";
import { useUserProfile } from "@/context/UserProfileContext";
import { useState } from "react";
import { useRegion } from "@/context/RegionContext";

type RegionSettingsProps = {
  setIsSettingsOpen: (open: boolean) => void;
};

export const RegionSettings = ({ setIsSettingsOpen }: RegionSettingsProps) => {
  const { updateUserProfile, userData, setUserData } = useUserProfile();
  const { setCurrentCountry, setCurrentLanguage } = useRegion();
  const [selectedCountry, setSelectedCountry] = useState<ICountry | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<ILanguage | null>(
    null
  );
  const [selectedTab, setSelectedTab] = useState<"country" | "language">(
    "country"
  );

  const handleSave = async () => {
    if (!userData?.id) return;

    const updatedCountry: ICountry = selectedCountry ?? userData.country!;
    const updatedLanguage: ILanguage = selectedLanguage ?? userData.language!;

    const success = await updateUserProfile(userData.id, {
      country: updatedCountry,
      language: updatedLanguage,
    });

    if (success) {
      setUserData((prev) => {
        const base = prev ?? userData;
        if (!base) return prev;
        return {
          ...base,
          country: updatedCountry,
          language: updatedLanguage,
        };
      });
      setCurrentCountry(updatedCountry);
      setCurrentLanguage(updatedLanguage);
      toast.success("Region settings updated! This page will refresh soon...");
      setIsSettingsOpen(false);
      setSelectedCountry(null);
      setSelectedLanguage(null);
      setTimeout(() => {
        if (typeof window !== "undefined") {
          window.location.href = window.location.pathname;
        }
      }, 3000);
    } else {
      toast.error("Failed to update region settings");
    }
  };

  const handleCancel = () => {
    setSelectedCountry(null);
    setSelectedLanguage(null);
    setIsSettingsOpen(false);
  };

  return (
    <motion.div
      className="fixed top-20 left-1/2 -translate-x-1/2 w-[90vw] h-[80vh] bg-base-bg text-base-fg rounded shadow-lg z-50 flex flex-col gap-4 p-10"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <button
        aria-label="Close"
        onClick={handleCancel}
        className="absolute top-4 right-4"
        type="button"
      >
        <Close width={24} height={24} fill={"var(--color-base-fg)"} />
      </button>
      <div className="hidden md:flex flex-1 flex-row gap-4 overflow-y-auto">
        <div className="w-1/2 overflow-y-auto border-r border-base-fg/20 pr-4">
          <CountrySelector onSelect={setSelectedCountry} />
        </div>
        <div className="w-1/2 overflow-y-auto pl-4">
          <LanguageSelector onSelect={setSelectedLanguage} />
        </div>
      </div>
      <div className="md:hidden flex flex-1 flex-col gap-4 overflow-y-auto">
        <div className="flex border-b border-base-fg/20 mb-2">
          <button
            className={`flex-1 py-2 text-center ${
              selectedTab === "country"
                ? "border-b-2 border-accent-bg font-bold"
                : "text-base-fg/60"
            }`}
            onClick={() => setSelectedTab("country")}
            type="button"
          >
            Country
          </button>
          <button
            className={`flex-1 py-2 text-center ${
              selectedTab === "language"
                ? "border-b-2 border-accent-bg font-bold"
                : "text-base-fg/60"
            }`}
            onClick={() => setSelectedTab("language")}
            type="button"
          >
            Language
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {selectedTab === "country" ? (
            <CountrySelector onSelect={setSelectedCountry} />
          ) : (
            <LanguageSelector onSelect={setSelectedLanguage} />
          )}
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center mt-4 text-sm border-t border-base-fg/20 pt-4 gap-4">
        <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <Image
              src={`https://flagcdn.com/${(selectedCountry?.iso_3166_1 ?? userData?.country?.iso_3166_1)?.toLowerCase()}.svg`}
              width={24}
              height={24}
              alt={
                selectedCountry?.english_name ??
                userData?.country?.english_name ??
                "Unknown"
              }
              className="rounded-full w-6 h-6 object-cover"
            />
            <span>
              {(selectedCountry?.native_name ??
                selectedCountry?.english_name) ||
                (userData?.country?.native_name ??
                  userData?.country?.english_name)}
            </span>
          </div>
          <div className="flex items-center gap-2 ml-0 md:ml-4">
            <span className="bg-accent-bg text-base-bg px-2 py-1 rounded text-xs font-bold">
              {(
                selectedLanguage?.iso_639_1 ?? userData?.language?.iso_639_1
              )?.toUpperCase()}
            </span>
            <span>
              {(selectedLanguage?.name === "?????"
                ? selectedLanguage?.english_name
                : selectedLanguage?.name) ??
                (userData?.language?.name === "?????"
                  ? userData?.language?.english_name
                  : userData?.language?.name)}
            </span>
          </div>
        </div>
        <div className="flex gap-2 w-full md:w-auto justify-end">
          <DefaultButton text="Cancel" onClick={handleCancel} size="sm" />
          <DefaultButton
            text="Save"
            onClick={handleSave}
            size="sm"
            disabled={!selectedCountry && !selectedLanguage}
            className=" disabled:!bg-base-fg/20 disabled:!text-base-fg/50"
          />
        </div>
      </div>
    </motion.div>
  );
};
