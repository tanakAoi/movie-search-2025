"use client";

import "keen-slider/keen-slider.min.css";
import { IMovie } from "@/types/tmdb";
import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
import { SliderButton } from "./SliderButton";
import { MotionLink } from "./MotionLink";
import { motion } from "framer-motion";

type MovieSliderProps = {
  movies: IMovie[];
  perView?: number;
  spacing?: number;
  type: "large" | "small";
  sortedByDate?: boolean;
};

export const MovieSlider = ({
  movies,
  type,
  sortedByDate,
}: MovieSliderProps) => {
  const perView = type === "large" ? 5 : 7;
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: true,
      slides: {
        perView,
        spacing: type === "large" ? 15 : 12,
      },
      breakpoints: {
        "(max-width: 1280px)": {
          slides: { perView: type === "large" ? 4 : 6, spacing: 10 },
        },
        "(max-width: 1024px)": {
          slides: { perView: type === "large" ? 4 : 5, spacing: 8 },
        },
        "(max-width: 768px)": {
          slides: { perView: type === "large" ? 3 : 4, spacing: 10 },
        },
        "(max-width: 640px)": {
          slides: { perView: type === "large" ? 2 : 3, spacing: 4 },
        },
        "(max-width: 480px)": {
          slides: { perView: type === "large" ? 1 : 2, spacing: 4 },
        },
      },
    },
    []
  );

  return (
    <div className="relative w-full">
      {movies.length > perView && (
        <SliderButton
          onClick={() => instanceRef.current?.prev()}
          direction="left"
        />
      )}
      <div ref={sliderRef} className="keen-slider relative">
        {(sortedByDate
          ? [...movies].sort(
              (a, b) =>
                new Date(a.release_date || "").getTime() -
                new Date(b.release_date || "").getTime()
            )
          : movies
        ).map((movie) => (
          <MotionLink
            key={movie.id}
            href={`/movie/${movie.id}`}
            className="keen-slider__slide block"
          >
            <motion.div
              whileHover="hover"
              initial="rest"
              animate="rest"
              variants={{
                rest: {
                  filter: "brightness(0.95)",
                },
                hover: {
                  filter: "brightness(1.1)",
                  transition: { duration: 0.4, ease: "easeOut" },
                },
              }}
              className={`flex flex-col items-center rounded-lg h-full overflow-hidden transition-all duration-300 ${
                type === "large" ? "bg-accent-bg/90 p-4" : ""
              }`}
            >
              <figure className="w-full aspect-[2/3] flex items-center justify-center">
                {movie.poster_path ? (
                  <Image
                    width={0}
                    height={0}
                    sizes="100vw"
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    alt={movie.title || "Movie Poster"}
                    className="rounded-lg object-contain w-full h-full"
                  />
                ) : (
                  <div
                    className={`text-base-bg w-full h-full flex items-center justify-center rounded-lg ${
                      type === "small" && "bg-accent-bg/90"
                    }`}
                  >
                    No Image
                  </div>
                )}
              </figure>
              {type === "large" && (
                <h3 className="mt-4 font-semibold text-center line-clamp-2 text-base-bg text-xl">
                  {movie.title}
                </h3>
              )}
            </motion.div>
          </MotionLink>
        ))}
      </div>
      {movies.length > perView && (
        <SliderButton
          onClick={() => instanceRef.current?.next()}
          direction="right"
        />
      )}
    </div>
  );
};
