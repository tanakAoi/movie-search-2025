"use client";

import { useRegion } from "@/context/RegionContext";
import { IMovieDetails } from "@/types/tmdb";
import { MotionLink } from "../../ui/MotionLink";
import { CountryFlag } from "../../ui/icons/CountryFlag";

type ProductionCountriesProps = {
  countries: IMovieDetails["production_countries"];
};

export const ProductionCountries = ({
  countries,
}: ProductionCountriesProps) => {
  const { countriesList } = useRegion();

  return (
    <div className="text-base-bg">
      <h3 className="text-xl font-bold mb-2">Country</h3>
      <ul className="flex gap-4 flex-wrap">
        {countries.map((country) => {
          const code = country.iso_3166_1;
          const countryName =
            code === "US"
              ? "USA"
              : code === "GB"
              ? "UK"
              : countriesList?.find((c) => c.iso_3166_1 === code)
                  ?.native_name ||
                countriesList?.find((c) => c.iso_3166_1 === code)?.english_name;
          if (!countryName) return null;

          return (
            <li key={code}>
              <MotionLink
                href={`/movie/country/${code}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <CountryFlag code={code} name={countryName} size={50} />
              </MotionLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
