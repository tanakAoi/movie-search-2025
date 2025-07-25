"use client";

import { IMovie } from "@/types/tmdb";
import Image from "next/image";
import { MotionLink } from "./MotionLink";
import { motion } from "motion/react";

export const MovieGrid = ({ movies }: { movies: IMovie[] }) => {
  const titleVariants = {
    initial: { scale: 1, fontWeight: "400" },
    hover: {
      scale: 1.05,
      fontWeight: "500",
      marginTop: "0.5rem",
      transition: { duration: 0.3 },
    },
  };

  const imageVariants = {
    initial: {
      border: "2px solid transparent",
      scale: 1,
      boxShadow: "none",
      filter: "brightness(0.9)",
    },
    hover: {
      border: "2px solid var(--color-base-bg)",
      scale: 1.05,
      boxShadow: "0 0 20px rgba(256, 256, 256, 0.4)",
      filter: "brightness(1)",
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 sm:gap-10">
      {movies.map((movie) => (
        <MotionLink
          href={`/movie/${movie.id}`}
          className="flex flex-col items-center justify-around gap-2 cursor-pointer mb-4"
          key={movie.id}
          whileHover="hover"
          initial="initial"
          animate="initial"
        >
          {movie.poster_path ? (
            <motion.div
              className="w-full aspect-[2/3] relative rounded-lg overflow-hidden"
              variants={imageVariants}
            >
              <Image
                fill
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={movie.title || "Movie Poster"}
                className="object-cover"
              />
            </motion.div>
          ) : (
            <motion.div
              className="w-full aspect-[2/3] relative rounded-lg overflow-hidden bg-accent-bg text-base-bg text-center flex items-center justify-center p-2"
              variants={imageVariants}
            >
              No Image Available
            </motion.div>
          )}
          <motion.h3
            className="line-clamp-2 text-center"
            variants={titleVariants}
          >
            {movie.title}
            {movie.release_date &&
              ` (${new Date(movie.release_date).getFullYear()})`}
          </motion.h3>
        </MotionLink>
      ))}
    </div>
  );
};
