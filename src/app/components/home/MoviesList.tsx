"use client";

import { IMovie } from "@/types/tmdb";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { ChevronLeft } from "../ui/icons/MaterialSymbols";
import Link from "next/link";
import Image from "next/image";

interface MoviesListProps {
  movies: IMovie[];
  type: "popular" | "upcoming";
}

export const MoviesList = ({ movies, type }: MoviesListProps) => {
  const contentMap = {
    popular: {
      title: "Popular Movies",
      description: "Check out the latest popular movies!",
    },
    upcoming: {
      title: "Upcoming Movies",
      description: "Check out the latest upcoming movies!",
    },
  };

  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: true,
      slides: {
        perView: 5,
        spacing: 15,
      },
      breakpoints: {
        "(max-width: 1280px)": {
          slides: { perView: 4, spacing: 10 },
        },
        "(max-width: 1024px)": {
          slides: { perView: 4, spacing: 8 },
        },
        "(max-width: 768px)": {
          slides: { perView: 2, spacing: 10 },
        },
        "(max-width: 640px)": {
          slides: { perView: 1, spacing: 0 },
        },
      },
    },
    []
  );

  return (
    <div className="flex flex-col items-center gap-5 w-full px-auto text-base-bg">
      <h2 className="text-3xl font-bold">{contentMap[type].title}</h2>
      <p className="text-md">{contentMap[type].description}</p>
      <div ref={sliderRef} className="keen-slider relative">
        {movies.map((movie) => (
          <Link key={movie.id} href={`/movie/${movie.id}`}>
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
    </div>
  );
};
