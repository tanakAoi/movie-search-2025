import { IMovieDetails } from "@/types/tmdb";
import { PosterImage } from "./PosterImage";
import { BasicInfo } from "./BasicInfo";
import { MovieDescription } from "./MovieDescription";
import { TrailerModal } from "./TrailerModal";
import { RatingList } from "./RatingList";

type MainSectionProps = {
  movie: IMovieDetails;
  isMovieReleased: boolean;
};

export const MainSection = ({ movie, isMovieReleased }: MainSectionProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-10 lg:gap-0">
      <figure className="hidden md:block">
        <PosterImage
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          title={movie.title}
        />
      </figure>
      <div className="flex flex-col gap-10">
        <BasicInfo
          runtime={movie.runtime}
          language={movie.original_language}
          countries={movie.production_countries.map((c) => c.iso_3166_1)}
          variant="desktop"
        />
        <RatingList
          scores={movie.scores}
          isReleased={isMovieReleased}
          variant="desktop"
        />
        {movie.trailer?.key && <TrailerModal trailerKey={movie.trailer.key} />}
        <MovieDescription movie={movie} isMovieReleased={isMovieReleased} />
      </div>
    </div>
  );
};
