"use client";
import { useRegion } from "@/context/RegionContext";

interface BasicInfoProps {
  runtime: number;
  language: string;
  countries: string[];
  type: "mobile" | "desktop";
}

export const BasicInfo = ({
  runtime,
  language,
  countries,
  type,
}: BasicInfoProps) => {
  const { languagesList, countriesList } = useRegion();

  return (
    <div
      className={`text-sm bg-base-bg/80 p-4 rounded-sm *:col-span-1 *:flex *:flex-col *:items-center *:gap-2 **:[span]:font-bold ${
        type === "mobile"
          ? "md:hidden flex flex-row sm:flex-col justify-between w-full h-full"
          : "hidden md:grid grid-cols-3 h-fit"
      }`}
    >
      <p>
        <span>Runtime</span>
        {runtime === 0
          ? "-"
          : `${Math.floor(runtime / 60)} h ${runtime % 60} min`}
      </p>
      <p>
        <span>Language</span>
        {language
          ? languagesList?.find((lang) => lang.iso_639_1 === language)?.name
          : "-"}
      </p>
      <div>
        <span>Country</span>
        <ul className="flex flex-col items-center gap-2">
          {countries.length > 0 ? (
            countries.map((country) => (
              <li key={country}>
                {countriesList?.find((c) => c.iso_3166_1 === country)
                  ?.english_name ||
                  countriesList?.find((c) => c.iso_3166_1 === country)
                    ?.native_name}
              </li>
            ))
          ) : (
            <span>-</span>
          )}
        </ul>
      </div>
    </div>
  );
};
