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

type RegionContextType = {
  country: string | null;
  setCountry: (code: string) => void;
  language: string | null;
  setLanguage: (lang: string) => void;
};

const RegionContext = createContext<RegionContextType>({
  country: null,
  setCountry: () => {},
  language: null,
  setLanguage: () => {},
});

export const RegionProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [country, setCountry] = useState<string | null>(null);
  const [language, setLanguage] = useState<string | null>(null);

  useEffect(() => {
    const countryCookie = Cookies.get("userCountry");
    const languageCookie = Cookies.get("userLanguage");

    if (countryCookie) {
      setCountry(countryCookie);
    } else {
      setCountry("US");
    }

    if (languageCookie) {
      setLanguage(languageCookie);
    } else {
      setLanguage("en-US");
    }
  }, []);

  return (
    <RegionContext.Provider
      value={{ country, setCountry, language, setLanguage }}
    >
      {children}
    </RegionContext.Provider>
  );
};

export const useRegion = () => useContext(RegionContext);
