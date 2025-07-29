"use client";

import { useRegion } from "@/context/RegionContext";
import { IMovieDetails } from "@/types/tmdb";

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
      <ul className="">
        {countries.map((country) => (
          <li key={country.iso_3166_1}>
            {country.iso_3166_1 === "US"
              ? "USA"
              : country.iso_3166_1 === "GB"
              ? "UK"
              : countriesList?.find((c) => c.iso_3166_1 === country.iso_3166_1)
                  ?.english_name ||
                countriesList?.find((c) => c.iso_3166_1 === country.iso_3166_1)
                  ?.native_name}
          </li>
        ))}
      </ul>
    </div>
  );
};
