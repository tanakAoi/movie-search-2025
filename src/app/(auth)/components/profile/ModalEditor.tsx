import { UserProfile } from "@/types/profile";
import { DefaultButton } from "../ui/DefaultButton";
import { useEffect, useState } from "react";
import { fetchCountries, fetchLanguages } from "@/services/profileService";
import { ICountry, ILanguage } from "@/types/tmdb";
import { Close } from "@/app/(public)/components/ui/icons/MaterialSymbols";
import { Avatar } from "../ui/Avatar";

export const ModalEditor = ({
  userData,
  onClose,
}: {
  userData: UserProfile;
  onClose: () => void;
}) => {
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [languages, setLanguages] = useState<ILanguage[]>([]);

  useEffect(() => {
    const fetchRegions = async () => {
      const [fetchedLanguages, fetchedCountries] = await Promise.all([
        fetchLanguages(),
        fetchCountries(),
      ]);
      setLanguages(fetchedLanguages);
      setCountries(fetchedCountries);
    };
    fetchRegions();
  }, [userData.country, userData.language]);
  
  console.log("ModalEditor userData:", userData);
  
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
            />
          </div>
          <div>
            <label htmlFor="country">Country</label>
            <select
              id="country"
              name="country"
              defaultValue={userData.country}
              className="w-full p-2 rounded-md text-base-fg/80"
            >
              <option value="">Select country</option>
              {countries.map((country) => (
                <option key={country.iso_3166_1} value={country.english_name}>
                  {country.english_name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="language">Language</label>
            <select
              id="language"
              name="language"
              defaultValue={userData.language}
              className="w-full p-2 rounded-md text-base-fg/80"
            >
              <option value="">Select language</option>
              {languages.map((language) => (
                <option key={language.iso_639_1} value={language.english_name}>
                  {language.english_name}
                </option>
              ))}
            </select>
          </div>
          <DefaultButton text="Save" onClick={() => {}} />
        </form>
      </div>
    </div>
  );
};
