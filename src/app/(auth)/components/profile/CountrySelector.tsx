import { ICountry } from "@/types/tmdb";
import { useState } from "react";
import Image from "next/image";
import { useRegion } from "@/context/RegionContext";

type CountrySelectorProps = {
  onSelect: (country: ICountry) => void;
};

export const CountrySelector = ({ onSelect }: CountrySelectorProps) => {
  const { countriesList } = useRegion();
  const [errorMap, setErrorMap] = useState<Record<string, boolean>>({});
  const handleImageError = (code: string) => {
    setErrorMap((prev) => ({ ...prev, [code]: true }));
  };

  return (
    <div className="flex flex-col gap-4 relative">
      <h3 className="text-lg font-semibold">Select Country</h3>
      <div className="grid grid-cols-3 gap-2">
        {countriesList?.map((country) => {
          const code = country.iso_3166_1.toLowerCase();
          const flagUrl = `https://flagcdn.com/${code}.svg`;
          const hasError = errorMap[code];

          return (
            <button
              key={code}
              onClick={() => onSelect(country)}
              className="flex flex-col items-center p-2"
            >
              {!hasError ? (
                <Image
                  width={40}
                  height={40}
                  src={flagUrl}
                  alt={country.english_name}
                  className="w-10 h-10 rounded-full aspect-square object-cover"
                  onError={() => handleImageError(code)}
                  unoptimized
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-accent-bg text-base-bg font-bold flex items-center justify-center text-xs">
                  {country.iso_3166_1?.toUpperCase()}
                </div>
              )}
              <span className="text-xs text-center mt-1.5">
                {country.native_name ?? country.english_name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
