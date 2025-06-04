"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { IMovie } from "@/types/tmdb";
import { ChevronLeft } from "../icons/MaterialSymbols";
import Link from "next/link";

interface PopularMoviesProps {
  movies: IMovie[];
}

export const PopularMovies = ({ movies }: PopularMoviesProps) => {
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: true,
      slides: {
        perView: 5,
        spacing: 15,
      },
      breakpoints: {
        "(max-width: 1200px)": {
          slides: { perView: 3, spacing: 10 },
        },
        "(max-width: 900px)": {
          slides: { perView: 2, spacing: 5 },
        },
        "(max-width: 600px)": {
          slides: { perView: 1, spacing: 5 },
        },
      },
    },
    []
  );

  return (
    <div className="flex flex-col items-center gap-5 w-full py-10 px-auto">
      <h2 className="text-3xl font-bold">Popular Movies</h2>
      <p className="text-md">Check out the latest popular movies!</p>
      <div ref={sliderRef} className="keen-slider relative">
        {movies.map((movie) => (
          <Link key={movie.id} href={`/movie/${movie.id}`}>
            <div className="keen-slider__slide flex flex-col items-center justify-between bg-base-bg p-4 rounded-lg shadow-lg">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-auto rounded-lg mb-3"
              />
              <h3 className="text-lg font-semibold">{movie.title}</h3>
              <p className="text-sm text-gray-600">
                Release: {movie.release_date}
              </p>
            </div>
          </Link>
        ))}

        <div className="w-full flex justify-between absolute top-1/2 -translate-y-1/2 z-10">
          <button
            onClick={() => instanceRef.current?.prev()}
            className="bg-base-bg/75 rounded-full p-4 relative"
          >
            <ChevronLeft
              width={20}
              height={20}
              fill={"var(--color-base-fg)"}
              className="rotate-180"
            />
          </button>
          <button
            onClick={() => instanceRef.current?.next()}
            className="bg-base-bg/75 rounded-full p-4 relative"
          >
            <ChevronLeft width={20} height={20} fill={"var(--color-base-fg)"} />
          </button>
        </div>
      </div>
    </div>
  );
};
