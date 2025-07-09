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
import { fetchCountries } from "@/services/profileService";

type RegionContextType = {
  country: ICountry;
  setCountry: (code: ICountry) => void;
  countriesList?: ICountry[];
  language: ILanguage;
  setLanguage: (lang: ILanguage) => void;
  languagesList?: ILanguage[];
};

const RegionContext = createContext<RegionContextType>({
  country: {
    iso_3166_1: "",
    english_name: "",
    native_name: "",
  },
  setCountry: () => {},
  countriesList: [],
  language: {
    iso_639_1: "",
    english_name: "",
    name: "",
  },
  setLanguage: () => {},
  languagesList: [],
});

export const RegionProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [country, setCountry] = useState<ICountry>({
    iso_3166_1: "",
    english_name: "",
    native_name: "",
  });
  const [language, setLanguage] = useState<ILanguage>({
    iso_639_1: "",
    english_name: "",
    name: "",
  });
  const [languagesList, setLanguagesList] = useState<ILanguage[]>([]);
  const [countriesList, setCountriesList] = useState<ICountry[]>([]);

  useEffect(() => {
    const langCookie = Cookies.get("userLanguage");
    const countryCookie = Cookies.get("userCountry") || "US";

    // Fetch languages data from the public directory
    const fetchAndSetLanguages = async () => {
      try {
        fetch("data/lang.json")
          .then((res) => {
            if (!res.ok) throw new Error("Failed to fetch lang.json");
            return res.json();
          })
          .then((data: ILanguage[]) => {
            setLanguagesList(data);

            // Set the language based on the user's cookie
            const langCode = langCookie?.split("-")[0];
            const lang = data.find((l) =>
              langCode ? l.iso_639_1 === langCode.toLowerCase() : false
            );
            setLanguage(
              lang || {
                iso_639_1: "",
                english_name: "",
                name: "",
              }
            );
          })
          .catch((error) => {
            console.error("Failed to load languages data", error);
          });
      } catch (error) {
        console.error("Error fetching languages:", error);
      }
    };
    fetchAndSetLanguages();

    // Fetch countries data from API
    const fetchAndSetCountries = async () => {
      try {
        const countries = await fetchCountries(langCookie || "en");
        if (!countries || countries.length === 0) {
          throw new Error("No countries found");
        }
        // Set the country based on the user's cookie
        const countryData = countries.find(
          (c: ICountry) => c.iso_3166_1 === countryCookie
        );
        setCountry(countryData || null);
        setCountriesList(countries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchAndSetCountries();
  }, []);

  return (
    <RegionContext.Provider
      value={{
        country,
        setCountry,
        language,
        setLanguage,
        languagesList,
        countriesList,
      }}
    >
      {children}
    </RegionContext.Provider>
  );
};

export const useRegion = () => useContext(RegionContext);
