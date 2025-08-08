import { motion } from "motion/react";
import { DefaultButton } from "../ui/DefaultButton";
import Image from "next/image";
import { useRegion } from "@/context/RegionContext";
import { useSession } from "next-auth/react";

type RegionDisplayProps = {
  modalRef: React.RefObject<HTMLDivElement | null>;
  setIsModalOpen: (open: boolean) => void;
  setIsSettingsOpen: (open: boolean) => void;
};

export const RegionDisplay = ({
  modalRef,
  setIsModalOpen,
  setIsSettingsOpen,
}: RegionDisplayProps) => {
  const { status } = useSession();
  const { currentCountry, currentLanguage } = useRegion();
  const code = currentCountry.iso_3166_1.toLowerCase();
  const flagUrl = `https://flagcdn.com/${code}.svg`;

  return (
    <motion.div
      ref={modalRef}
      className="absolute top-16 right-4 bg-base-bg/90 text-base-fg px-8 py-6 rounded shadow-lg z-99 flex flex-col items-center gap-3"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center gap-8 mb-2">
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm font-semibold">Country</span>
          <Image
            width={40}
            height={40}
            src={flagUrl}
            alt={
              currentCountry?.native_name ||
              currentCountry?.english_name ||
              "Unknown"
            }
            className="rounded-full aspect-square object-cover w-10 h-10"
          />
          <span className="text-xs">
            {currentCountry?.native_name || "Unknown"}
          </span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm font-semibold">Language</span>
          <div className="w-10 h-10 rounded-full bg-accent-bg text-base-bg font-bold flex items-center justify-center text-xs">
            {currentLanguage.iso_639_1?.toUpperCase()}
          </div>
          <span className="text-xs">
            {currentLanguage?.name === "?????"
              ? currentLanguage?.english_name
              : currentLanguage?.name}
          </span>
        </div>
      </div>
      <div className="relative group">
        <DefaultButton
          text="Change Settings"
          onClick={() => {
            setIsSettingsOpen(true);
            setIsModalOpen(false);
          }}
          size="sm"
          disabled={status !== "authenticated"}
          className=" disabled:!bg-base-fg/20 disabled:!text-base-fg/50 disabled:border-base-fg/20"
        />
        {status !== "authenticated" && (
          <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-base-fg text-base-bg text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
            Please login to change settings
          </span>
        )}
      </div>
    </motion.div>
  );
};
