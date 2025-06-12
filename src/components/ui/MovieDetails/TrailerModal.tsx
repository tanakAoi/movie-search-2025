"use client";

import { useState } from "react";
import { Close, Video } from "../icons/MaterialSymbols";
import { AnimatePresence, motion } from "motion/react";

export const TrailerModal = ({ trailerKey }: { trailerKey: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <AnimatePresence>
      {isModalOpen ? (
        <motion.div
          key={"trailer-modal"}
          className="fixed inset-0 bg-base-fg/70 bg-opacity-70 z-50 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          onClick={() => setIsModalOpen(false)}
        >
          <div className="relative w-full max-w-3xl aspect-video">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1`}
              title="YouTube trailer"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
          <motion.button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 text-white text-2xl"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            aria-label="Close trailer"
          >
            <Close width={24} height={24} fill={"var(--color-base-bg)"} />
          </motion.button>
        </motion.div>
      ) : (
        <motion.button
          onClick={() => setIsModalOpen(true)}
          className="cursor-pointer w-fit"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          aria-label="Watch trailer"
        >
          <Video width={36} height={36} fill={"var(--color-base-bg)"} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
