import { UserProfile } from "@/types/profile";
import { DefaultButton } from "../ui/DefaultButton";
import { Close } from "@/app/(public)/components/ui/icons/MaterialSymbols";
import { Avatar } from "../ui/Avatar";
import { useRegion } from "@/context/RegionContext";
import { ICountry, ILanguage } from "@/types/tmdb";
import { useState } from "react";
import { fetchCountries, updateProfile } from "@/services/profileService";
import Cookies from "js-cookie";

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
  } = useRegion();
  const [newUserData, setNewUserData] = useState<UserProfile>(userData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "username") {
      setNewUserData((prev) => ({ ...prev, username: value }));
    } else if (name === "language") {
      const selectedLang = languagesList?.find(
        (lang) => lang.name === value || lang.english_name === value
      );
      setNewUserData((prev) => ({ ...prev, language: selectedLang }));
    } else if (name === "country") {
      const selectedCountry = countriesList?.find(
        (c) => c.native_name === value || c.english_name === value
      );
      setNewUserData((prev) => ({ ...prev, country: selectedCountry }));
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
      <div className="bg-base-bg rounded-lg px-10 py-12 shadow-lg max-w-2xl w-full max-h-[90vh] overflow-auto relative">
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
          <div>
            <label htmlFor="country">Country</label>
            <select
              id="country"
              name="country"
              defaultValue={
                userData?.country?.native_name
                  ? userData.country.native_name
                  : userData.country?.english_name
              }
              className="w-full p-2 rounded-md text-base-fg/80"
              onChange={(e) => handleChange(e)}
            >
              <option value="">Select country</option>
              {countriesList?.map((country: ICountry) => (
                <option
                  key={country.iso_3166_1}
                  value={
                    country.native_name
                      ? country.native_name
                      : country.english_name
                  }
                >
                  {country.native_name
                    ? country.native_name
                    : country.english_name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="language">Language</label>
            <select
              id="language"
              name="language"
              defaultValue={
                userData?.language?.name
                  ? userData.language.name
                  : userData?.language?.english_name
              }
              className="w-full p-2 rounded-md text-base-fg/80"
              onChange={(e) => handleChange(e)}
            >
              <option value="">Select language</option>
              {languagesList?.map((language: ILanguage) => (
                <option
                  key={language.iso_639_1}
                  value={language.name ? language.name : language.english_name}
                >
                  {language.name ? language.name : language.english_name}
                </option>
              ))}
            </select>
          </div>
          <DefaultButton
            text="Save"
            onClick={() => handleSubmit()}
            type="button"
          />
        </form>
      </div>
    </div>
  );
};
