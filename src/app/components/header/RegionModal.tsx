"use client";

import { AnimatePresence } from "motion/react";
import { useRef, useState } from "react";
import { RegionButton } from "./RegionButton";
import { RegionDisplay } from "./RegionDisplay";
import { RegionSettings } from "./RegionSettings";

export const RegionModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <RegionButton
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        modalRef={modalRef}
      />
      <AnimatePresence>
        {isModalOpen && (
          <RegionDisplay
            modalRef={modalRef}
            setIsModalOpen={setIsModalOpen}
            setIsSettingsOpen={setIsSettingsOpen}
          />
        )}
      </AnimatePresence>
      {isSettingsOpen && (
        <RegionSettings setIsSettingsOpen={setIsSettingsOpen} />
      )}
    </>
  );
};
