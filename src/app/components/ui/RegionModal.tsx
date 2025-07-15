"use client";

import { useRegion } from "@/context/RegionContext";
import { DefaultButton } from "./DefaultButton";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Globe } from "@/app/components/ui/icons/MaterialSymbols";

export const RegionModal = () => {
  const { currentCountry, currentLanguage } = useRegion();
  const [isRegionSettingsOpen, setIsRegionSettingsOpen] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      if (
        modalRef.current &&
        !modalRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setIsRegionSettingsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <button
        onClick={() => setIsRegionSettingsOpen(!isRegionSettingsOpen)}
        aria-label="Region settings"
        className="cursor-pointer"
        ref={buttonRef}
      >
        <Globe width={24} height={24} fill={"var(--color-base-bg)"} />
      </button>
      <AnimatePresence>
        {isRegionSettingsOpen && (
          <motion.div
            ref={modalRef}
            className="absolute top-16 right-4 bg-base-bg/90 text-base-fg px-8 py-6 rounded shadow-lg z-99 flex flex-col gap-3"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <p>
              Country:{" "}
              <span className="font-semibold">
                {currentCountry?.native_name || "Unknown"}
              </span>
            </p>
            <p>
              Language:{" "}
              <span className="font-semibold">
                {currentLanguage?.name || "Unknown"}
              </span>
            </p>
            <DefaultButton
              text="Change Settings"
              isLink
              href="/profile"
              size="sm"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
