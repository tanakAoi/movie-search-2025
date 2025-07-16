"use client";

import { IMovie } from "@/types/tmdb";
import { useKeenSlider } from "keen-slider/react";
import Link from "next/link";
import { ChevronLeft } from "./icons/MaterialSymbols";
import Image from "next/image";

type MovieSliderProps = {
  movies: IMovie[];
  perView?: number;
  spacing?: number;
  type: "home" | "similar";
};

export const MovieSlider = ({ movies, type }: MovieSliderProps) => {
  const computedPerView = type === "home" ? 5 : 8;

  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: true,
      slides: {
        perView: computedPerView,
        spacing: 15,
      },
      breakpoints: {
        "(max-width: 1280px)": {
          slides: { perView: computedPerView - 1, spacing: 10 },
        },
        "(max-width: 1024px)": {
          slides: { perView: computedPerView - 1, spacing: 8 },
        },
        "(max-width: 768px)": {
          slides: { perView: computedPerView - 2, spacing: 10 },
        },
        "(max-width: 640px)": {
          slides: { perView: computedPerView - 4, spacing: 2 },
        },
      },
    },
    []
  );

  return (
    <div ref={sliderRef} className="keen-slider relative">
      {movies.map((movie) => (
        <Link key={movie.id} href={`/movie/${movie.id}`}>
          {type === "home" ? (
            <div className="keen-slider__slide flex flex-col items-center bg-accent-bg/90 p-4 rounded-lg w-[300px] h-full">
              <figure className="mb-4 w-full h-[300px] flex items-center justify-center">
                {movie.poster_path ? (
                  <Image
                    width={300}
                    height={400}
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title || "Movie Poster"}
                    className="rounded-lg object-cover w-full h-full"
                  />
                ) : (
                  <div className=" text-base-bg w-full h-full flex items-center justify-center rounded-lg">
                    No Image
                  </div>
                )}
              </figure>
              <div className="flex-1 flex items-center justify-center">
                <h3 className="text-xl font-semibold text-center px-2 line-clamp-2">
                  {movie.title}
                </h3>
              </div>
            </div>
          ) : type === "similar" ? (
            <div className="keen-slider__slide flex flex-col items-center rounded-lg w-[120px] h-full">
              <figure className="mb-4 w-full flex items-center justify-center">
                {movie.poster_path ? (
                  <Image
                    width={300}
                    height={400}
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title || "Movie Poster"}
                    className="rounded-lg object-cover w-full h-full"
                  />
                ) : (
                  <div className=" text-base-bg w-full h-full flex items-center justify-center rounded-lg">
                    No Image
                  </div>
                )}
              </figure>
              <div className="flex-1 flex items-center justify-center">
                <h3 className="text-sm font-semibold text-center px-2 line-clamp-2 text-base-bg">
                  {movie.title}
                </h3>
              </div>
            </div>
          ) : null}
        </Link>
      ))}
      <div className="w-full flex justify-between absolute top-1/2 -translate-y-1/2 z-99">
        <button
          onClick={() => instanceRef.current?.prev()}
          className="bg-base-bg/75 rounded-full p-2.5 relative"
        >
          <ChevronLeft width={32} height={32} fill={"var(--color-base-fg)"} />
        </button>
        <button
          onClick={() => instanceRef.current?.next()}
          className="bg-base-bg/75 rounded-full p-2.5 relative"
        >
          <ChevronLeft
            width={32}
            height={32}
            fill={"var(--color-base-fg)"}
            className="rotate-180"
          />
        </button>
      </div>
    </div>
  );
};
