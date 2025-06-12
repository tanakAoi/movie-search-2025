import ISO6391 from "iso-639-1";

interface BasicInfoProps {
  runtime: number;
  language: string;
  countries: { iso_3166_1: string; name: string }[];
  type: "mobile" | "desktop";
}

export const BasicInfo = ({
  runtime,
  language,
  countries,
  type,
}: BasicInfoProps) => {
  const countryShortNames: Record<string, string> = {
    US: "USA",
    GB: "UK",
  };

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
          : `${(runtime / 60).toFixed(0)} h ${runtime % 60} min`}
      </p>
      <p>
        <span>Language</span>
        {ISO6391.getName(language)}
      </p>
      <div>
        <span>Country</span>
        <ul className="flex flex-col items-center gap-2">
          {countries.map((country) => (
            <li key={country.iso_3166_1}>
              {countryShortNames[country.iso_3166_1] || country.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
