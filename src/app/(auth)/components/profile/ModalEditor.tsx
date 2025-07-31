import { UserProfile } from "@/types/profile";
import { DefaultButton } from "../../../components/ui/DefaultButton";
import { Close } from "@/app/components/ui/icons/MaterialSymbols";
import { Avatar } from "../ui/Avatar";
import { useRegion } from "@/context/RegionContext";
import { ICountry } from "@/types/tmdb";
import { useState } from "react";
import { fetchCountries, updateProfile } from "@/services/profileService";
import Cookies from "js-cookie";
import { CountrySelector } from "./CountrySelector";
import { LanguageSelector } from "./LanguageSelector";
import { SelectedItem } from "./SelectedItem";

export const ModalEditor = ({
  userData,
  setUserData,
  setLoading,
  onClose,
}: {
  userData: UserProfile;
  setUserData: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
}) => {
  const {
    countriesList,
    languagesList,
    setCurrentCountry,
    setCurrentLanguage,
    setCountriesList,
  } = useRegion();
  const [newUserData, setNewUserData] = useState<UserProfile>(userData);
  const [activeSelector, setActiveSelector] = useState<
    "country" | "language" | null
  >(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "username") {
      setNewUserData((prev) => ({ ...prev, username: value }));
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // Get new countryList before saving data in DB
      if (newUserData.language?.iso_639_1) {
        const newCountriesList = await fetchCountries(
          newUserData.language?.iso_639_1
        );
        setCountriesList(newCountriesList);
        newUserData.country = newCountriesList.find(
          (c: ICountry) => c.iso_3166_1 === newUserData.country?.iso_3166_1
        );
      }

      // Update profile in DB
      const res = await updateProfile(userData.id, newUserData);

      if (res.status === 200) {
        // Update cookie & context
        Cookies.set("userLanguage", newUserData.language?.iso_639_1 || "");
        Cookies.set("userCountry", newUserData.country?.iso_3166_1 || "");
        if (newUserData.country) {
          setCurrentCountry(newUserData.country);
        }
        if (newUserData.language) {
          setCurrentLanguage(newUserData.language);
        }

        // Update user data in state
        setUserData((prev) =>
          prev
            ? {
                ...prev,
                username: newUserData.username,
                country: newUserData.country,
                language: newUserData.language,
              }
            : null
        );
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setLoading(false);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-base-bg px-10 py-12 shadow-lg max-w-2xl w-full h-full md:max-h-[90vh] overflow-auto relative transition-all duration-300">
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute top-4 right-4"
          type="button"
        >
          <Close width={24} height={24} fill={"var(--color-base-fg)"} />
        </button>
        <h2 className="font-lobster text-3xl text-center">Edit Profile</h2>
        <form className="**:[input]:w-full **:[input]:outline-1 **:[input]:outline-base-fg **:[input]:p-2 **:[input]:rounded-md **:[input]:text-base-fg/80 flex flex-col gap-6 mt-4 **:[label]:inline-block **:[label]:mb-2 ">
          <div>
            <label htmlFor="username">Avatar</label>
            <Avatar
              name={userData.username}
              image={userData.avatar}
              size={96}
            />
          </div>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              defaultValue={userData.username}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              disabled
              defaultValue={userData.email}
              className="outline-none text-base-fg/80"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <SelectedItem
            label="Country"
            value={
              newUserData?.country?.native_name ||
              newUserData?.country?.english_name
            }
            onClick={() => setActiveSelector("country")}
          />
          <SelectedItem
            label="Language"
            value={newUserData?.language?.english_name}
            onClick={() => setActiveSelector("language")}
          />
          <DefaultButton
            text="Save"
            onClick={() => handleSubmit()}
            type="button"
          />
        </form>
      </div>
      {activeSelector && (
        <div className="bg-base-bg px-6 py-8 w-full h-full md:w-[300px] md:max-h-[90vh] overflow-auto animate-fade-in absolute md:relative">
          {activeSelector === "country" ? (
            <CountrySelector
              countriesList={countriesList ?? []}
              onSelect={(country) => {
                setNewUserData((prev) => ({
                  ...prev,
                  country,
                }));
                setActiveSelector(null);
              }}
              onCancel={() => setActiveSelector(null)}
            />
          ) : (
            <LanguageSelector
              languagesList={languagesList ?? []}
              onSelect={(language) => {
                setNewUserData((prev) => ({ ...prev, language }));
                setActiveSelector(null);
              }}
              onCancel={() => setActiveSelector(null)}
            />
          )}
        </div>
      )}
    </div>
  );
};
