"use client";

import { IMovieDetails } from "@/types/tmdb";
import { ProductionCompanies } from "./movie-description/ProductionCompanies";
import { MainCrews } from "./movie-description/MainCrews";
import { MovieGenres } from "./movie-description/MovieGenres";
import { ProductionCountries } from "./movie-description/ProductionCountries";
import { Overview } from "./movie-description/Overview";

type MovieDescriptionProps = {
  movie: IMovieDetails;
};

export const MovieDescription = ({ movie }: MovieDescriptionProps) => {
  return (
    <div className="flex flex-col gap-10">
      {movie.credits.crew.length > 0 && (
        <MainCrews crews={movie.credits.crew} />
      )}
      {movie.genres.length > 0 && <MovieGenres genres={movie.genres} />}
      {movie.production_countries.length > 0 && (
        <ProductionCountries countries={movie.production_countries} />
      )}
      {movie.production_companies.length > 0 && (
        <ProductionCompanies companies={movie.production_companies} />
      )}
      {movie.overview && <Overview overview={movie.overview} />}
    </div>
  );
};
