"use client";

import { useRegion } from "@/context/RegionContext";

interface BasicInfoProps {
  runtime: number;
  language: string;
  countries: string[];
  releaseDate: string;
  variant: "mobile" | "desktop";
}

export const BasicInfo = ({
  runtime,
  language,
  releaseDate,
  variant,
}: BasicInfoProps) => {
  const { languagesList } = useRegion();

  return (
    <div
      className={`text-sm bg-base-bg/80 p-4 rounded-sm w-full *:col-span-1 *:flex *:flex-col *:items-center *:gap-2 **:[span]:font-bold ${
        variant === "mobile"
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
        <span className="font-semibold">Release Date</span>
        {releaseDate}
      </p>
      <p>
        <span>Language</span>
        {language
          ? languagesList?.find((lang) => lang.iso_639_1 === language)?.name
          : "-"}
      </p>
    </div>
  );
};
