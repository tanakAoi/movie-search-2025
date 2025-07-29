"use client";

import { IMovieKeywords } from "@/types/tmdb";
import { MotionLink } from "../ui/MotionLink";
import { useState } from "react";
import { ChevronLeft } from "../ui/icons/MaterialSymbols";
import { motion } from "motion/react";

type MovieKeywordsProps = {
  keywords: IMovieKeywords;
};

export const MovieKeywords = ({ keywords }: MovieKeywordsProps) => {
  const [expanded, setExpanded] = useState(false);
  const visibleCount = expanded ? keywords.keywords.length : 8;

  return (
    keywords.keywords.length > 0 && (
      <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-semibold text-base-bg">Keywords</h3>
        <motion.ul className="flex flex-wrap gap-2">
          {keywords.keywords &&
            keywords.keywords.slice(0, visibleCount).map((keyword, index) => {
              const isAnimated = expanded && index >= 8;
              return (
                <motion.li
                  key={keyword.id}
                  initial={isAnimated ? { opacity: 0 } : false}
                  animate={{
                    opacity: 1,
                    transition: { delay: isAnimated ? (index - 8) * 0.15 : 0 },
                  }}
                >
                  <MotionLink
                    href={`keyword/${keyword.id}`}
                    className="px-3 py-1.5 rounded-full text-xs backdrop-blur-md bg-transparent border border-base-bg text-base-bg"
                    whileHover={{
                      border: "1px solid var(--color-base-fg)",
                      backgroundColor: "var(--color-base-bg)",
                      color: "var(--color-base-fg)",
                      transition: { duration: 0.3 },
                    }}
                  >
                    {keyword.name}
                  </MotionLink>
                </motion.li>
              );
            })}
        </motion.ul>

        {keywords.keywords.length > 8 && (
          <motion.button
            onClick={() => setExpanded(!expanded)}
            className="text-sm text-base-bg flex items-center gap-2"
            whileHover={{ opacity: 1 }}
          >
            <ChevronLeft
              className={`inline-block transition-transform ${
                expanded ? "rotate-90" : "rotate-270"
              }`}
              width={20}
              height={20}
              fill={"var(--color-base-bg)"}
            />
            {expanded ? "Show less keywords" : "Show all keywords"}
          </motion.button>
        )}
      </div>
    )
  );
};
