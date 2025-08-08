import { useRegion } from "@/context/RegionContext";
import { ILanguage } from "@/types/tmdb";

type LanguageSelectorProps = {
  onSelect: (language: ILanguage) => void;
};

export const LanguageSelector = ({ onSelect }: LanguageSelectorProps) => {
  const { languagesList } = useRegion();
  return (
    <div className="flex flex-col gap-4 relative">
      <h3 className="text-lg font-semibold">Select Language</h3>
      <div className="grid grid-cols-3 gap-2">
        {[...(languagesList ?? [])]
          .filter((language) => language.english_name)
          .sort((a, b) => {
            const nameA = (a.english_name || "").toLowerCase();
            const nameB = (b.english_name || "").toLowerCase();
            return nameA.localeCompare(nameB);
          })
          .map((language) => {
            return (
              <button
                key={language.iso_639_1}
                onClick={() => onSelect(language)}
                className="flex flex-col items-center p-2"
              >
                <div className="w-10 h-10 rounded-full bg-accent-bg text-base-bg font-bold flex items-center justify-center text-xs">
                  {language.iso_639_1?.toUpperCase()}
                </div>
                <span className="text-xs text-center mt-1.5">
                  {language.name === "?????"
                    ? language.english_name
                    : language.name || language.english_name}
                </span>
              </button>
            );
          })}
      </div>
    </div>
  );
};
