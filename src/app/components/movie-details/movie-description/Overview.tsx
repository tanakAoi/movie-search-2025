"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type OverviewProps = {
  overview: string;
};

export const Overview = ({ overview }: OverviewProps) => {
  const [expanded, setExpanded] = useState(false);

  const threshold = 300;
  const isLong = overview.length > threshold;

  const initialText = overview.substring(0, threshold);
  const remainingText = overview.substring(threshold);

  return (
    <div className="text-base-bg">
      <h3 className="text-xl font-bold mb-2">Overview</h3>

      <blockquote className="text-sm italic text-base-bg/90 leading-relaxed border-l-4 border-accent-bg pl-4">
        {initialText}
        <AnimatePresence>
          {expanded && (
            <motion.span
              key="extra"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {remainingText}
            </motion.span>
          )}
          {!expanded && isLong && <span>…</span>}
        </AnimatePresence>
      </blockquote>
      {isLong && (
        <div className="flex items-center justify-center">
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="mt-2 text-sm opacity-75 hover:opacity-100"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        </div>
      )}
    </div>
  );
};
