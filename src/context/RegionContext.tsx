"use client";

import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import Cookies from "js-cookie";
import { ICountry, ILanguage } from "@/types/tmdb";
import { fetchCountries, fetchLanguages } from "@/services/profileService";
import { useSession } from "next-auth/react";

type RegionContextType = {
  currentCountry: ICountry;
  setCurrentCountry: (code: ICountry) => void;
  countriesList?: ICountry[];
  setCountriesList: (countries: ICountry[]) => void;
  currentLanguage: ILanguage;
  setCurrentLanguage: (lang: ILanguage) => void;
  languagesList?: ILanguage[];
};

const RegionContext = createContext<RegionContextType>({
  currentCountry: {
    iso_3166_1: "",
    english_name: "",
    native_name: "",
  },
  setCurrentCountry: () => {},
  countriesList: [],
  setCountriesList: () => {},
  currentLanguage: {
    iso_639_1: "",
    english_name: "",
    name: "",
  },
  setCurrentLanguage: () => {},
  languagesList: [],
});

export const RegionProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [currentCountry, setCurrentCountry] = useState<ICountry>({
    iso_3166_1: "",
    english_name: "",
    native_name: "",
  });
  const [currentLanguage, setCurrentLanguage] = useState<ILanguage>({
    iso_639_1: "",
    english_name: "",
    name: "",
  });
  const [languagesList, setLanguagesList] = useState<ILanguage[]>([]);
  const [countriesList, setCountriesList] = useState<ICountry[]>([]);
  const { status: sessionStatus } = useSession();

  useEffect(() => {
    const langCookie = Cookies.get("userLanguage");
    const countryCookie = Cookies.get("userCountry");

    const fetchAndSetLanguages = async () => {
      try {
        // Fetch languages from API
        const languages = await fetchLanguages();

        if (!languages || languages.length === 0) {
          throw new Error("Failed to fetch languages");
        }
        setLanguagesList(languages);

        // Save language list to local storage
        localStorage.setItem("languagesList", JSON.stringify(languages));

        // Find the current user language based on the cookie
        const currentLang = languages.find(
          (l: ILanguage) => l.iso_639_1 === langCookie
        );

        setCurrentLanguage(currentLang || null);
      } catch (error) {
        console.error("Failed to load languages data", error);
      }
    };
    fetchAndSetLanguages();

    const fetchAndSetCountries = async () => {
      try {
        // Fetch countries data from API
        const countries = await fetchCountries(langCookie || "en");
        if (!countries || countries.length === 0) {
          throw new Error("No countries found");
        }
        setCountriesList(countries);

        // Save country list to local storage
        localStorage.setItem("countriesList", JSON.stringify(countries));

        // Set the user current country based on the user's cookie
        const countryData = countries.find(
          (c: ICountry) => c.iso_3166_1 === countryCookie
        );
        setCurrentCountry(countryData || null);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchAndSetCountries();
  }, [sessionStatus]);

  return (
    <RegionContext.Provider
      value={{
        currentCountry,
        setCurrentCountry,
        currentLanguage,
        setCurrentLanguage,
        languagesList,
        countriesList,
        setCountriesList,
      }}
    >
      {children}
    </RegionContext.Provider>
  );
};

export const useRegion = () => useContext(RegionContext);
