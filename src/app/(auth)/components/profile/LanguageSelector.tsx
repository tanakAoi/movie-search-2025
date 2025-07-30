import { Close } from "@/app/components/ui/icons/MaterialSymbols";
import { ILanguage } from "@/types/tmdb";

type LanguageSelectorProps = {
  languagesList: ILanguage[];
  onSelect: (language: ILanguage) => void;
  onCancel: () => void;
};

export const LanguageSelector = ({
  languagesList,
  onSelect,
  onCancel,
}: LanguageSelectorProps) => {
  return (
    <div className="flex flex-col gap-4 relative">
      <button
        aria-label="Close"
        onClick={onCancel}
        className="absolute -right-4 -top-4"
        type="button"
      >
        <Close width={18} height={18} fill={"var(--color-base-fg)"} />
      </button>
      <h3 className="text-lg font-semibold">Select Language</h3>
      <div className="grid grid-cols-3 gap-2">
        {[...languagesList]
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
                  {language.english_name}
                </span>
              </button>
            );
          })}
      </div>
      <button onClick={onCancel} className="text-sm mt-4 underline text-right">
        Cancel
      </button>
    </div>
  );
};
