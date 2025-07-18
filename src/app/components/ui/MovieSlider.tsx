"use client";

import { IMovie } from "@/types/tmdb";
import { useKeenSlider } from "keen-slider/react";
import Link from "next/link";
import Image from "next/image";
import { SliderButton } from "./SliderButton";

type MovieSliderProps = {
  movies: IMovie[];
  perView?: number;
  spacing?: number;
  type: "large" | "small";
};

export const MovieSlider = ({ movies, type }: MovieSliderProps) => {
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: true,
      slides: {
        perView: type === "large" ? 5 : 7,
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
      <SliderButton
        onClick={() => instanceRef.current?.prev()}
        direction="left"
      />
      <div ref={sliderRef} className="keen-slider relative">
        {movies.map((movie) => (
          <Link
            key={movie.id}
            href={`/movie/${movie.id}`}
            className="keen-slider__slide"
          >
            <div
              className={`flex flex-col items-center rounded-lg h-full ${
                type === "large" && "bg-accent-bg/90 p-4 "
              }`}
            >
              <figure className="mb-4 w-full aspect-[2/3] flex items-center justify-center">
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
                  <div className=" text-base-bg w-full h-full flex items-center justify-center rounded-lg">
                    No Image
                  </div>
                )}
              </figure>
              <div className="flex-1 flex items-center justify-center">
                <h3
                  className={`font-semibold text-center line-clamp-2 text-base-bg ${
                    type === "large" ? "text-xl" : "text-sm px-2"
                  }`}
                >
                  {movie.title}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <SliderButton
        onClick={() => instanceRef.current?.next()}
        direction="right"
      />
    </div>
  );
};
