import { IMovieDetails } from "@/types/tmdb";
import { BasicInfo } from "./BasicInfo";
import { PosterImage } from "./PosterImage";
import { RatingList } from "./RatingList";

type MovieMobileLayoutProps = {
  movie: IMovieDetails;
  isMovieReleased: boolean;
};

export const MovieMobileLayout = ({
  movie,
  isMovieReleased,
}: MovieMobileLayoutProps) => {
  return (
    <div className="md:hidden sm:grid sm:grid-cols-3 flex flex-col gap-4 sm:gap-8">
      <figure className="sm:col-span-2">
        <PosterImage
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          title={movie.title}
        />
      </figure>
      <div className="sm:grid-cols-1 flex flex-col justify-between items-center gap-6">
        <BasicInfo
          runtime={movie.runtime}
          language={movie.original_language}
          countries={movie.production_countries.map((c) => c.iso_3166_1)}
          releaseDate={movie.release_date}
          variant="mobile"
        />
        <RatingList
          scores={movie.scores}
          isReleased={isMovieReleased}
          variant="mobile"
        />
      </div>
    </div>
  );
};
