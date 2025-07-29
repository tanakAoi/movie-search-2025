"use client";

import { ICredit } from "@/types/tmdb";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronLeft } from "../ui/icons/MaterialSymbols";
import { motion } from "motion/react";
import { useState } from "react";

export const CastsList = ({ cast }: { cast: ICredit["cast"] }) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="w-full flex flex-col gap-4 mt-8">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl md:text-3xl font-semibold text-base-bg">
          Cast
        </h3>
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className={`md:hidden ${isOpen ? "rotate-270 " : "rotate-90"}`}
        >
          <ChevronLeft width={32} height={32} fill={"var(--color-base-bg)"} />
        </motion.button>
      </div>
      {isOpen && (
        <>
          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(91px, 1fr))",
            }}
          >
            {cast.slice(0, 8).map((cast) => (
              <motion.a
                href={`/person/${cast.id}`}
                key={cast.id}
                className="text-center text-base-bg w-full mx-auto"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <figure className="aspect-[2/3] relative">
                  {cast.profile_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w185${cast.profile_path}`}
                      alt={cast.name}
                      width={185}
                      height={278}
                    />
                  ) : (
                    <span className="bg-base-fg/75 flex items-center justify-center w-full h-full text-base-bg">
                      No Image
                    </span>
                  )}
                </figure>
                <p className="text-sm font-medium mt-2 break-words">
                  {cast.name}
                </p>
                <p className="text-xs text-gray-300 mt-1 break-words">
                  {cast.character}
                </p>
              </motion.a>
            ))}
          </div>
          <motion.a
            href={`${pathname}/credits`}
            className="text-base-bg self-end flex items-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            See all cast & crew
            <ChevronLeft
              width={16}
              height={16}
              fill={"var(--color-base-bg)"}
              className="rotate-180"
            />
          </motion.a>
        </>
      )}
    </div>
  );
};
