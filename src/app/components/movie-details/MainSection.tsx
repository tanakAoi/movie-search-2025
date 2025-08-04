import { IMovieDetails, IMovieKeywords, IMovieProvider } from "@/types/tmdb";
import { PosterImage } from "./PosterImage";
import { BasicInfo } from "./BasicInfo";
import { MovieDescription } from "./MovieDescription";
import { TrailerModal } from "./TrailerModal";
import { RatingList } from "./RatingList";
import { MovieKeywords } from "./MovieKeywords";
import { getRegionFromCookies } from "@/lib/getRegionFromCookies";
import { getMovieKeywords } from "@/services/specificMovieService";
import { WatchlistButton } from "../ui/WatchlistButton";
import { FavoriteButton } from "../ui/FavoriteButton";
import { getMovieProviders } from "@/services/moviesService";

type MainSectionProps = {
  movie: IMovieDetails;
  isMovieReleased: boolean;
};

export const MainSection = async ({
  movie,
  isMovieReleased,
}: MainSectionProps) => {
  const { language, country } = await getRegionFromCookies();

  const keywords: IMovieKeywords = await getMovieKeywords(movie.id, language);
  const providers: IMovieProvider = await getMovieProviders(movie.id, country);

  return (
    <div className="grid md:grid-cols-2 gap-10 lg:gap-0">
      <div className="flex flex-col gap-8 max-w-[400px] w-full">
        <figure className="hidden md:block">
          <PosterImage
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            title={movie.title}
          />
        </figure>
        <MovieKeywords keywords={keywords} />
      </div>
      <div className="flex flex-col gap-10">
        <BasicInfo
          runtime={movie.runtime}
          language={
            movie.original_language
              ? movie.original_language
              : movie.spoken_languages[0]?.iso_639_1
          }
          countries={movie.production_countries.map((c) => c.iso_3166_1)}
          releaseDate={movie.release_date}
          variant="desktop"
        />
        <RatingList
          scores={movie.scores}
          isReleased={isMovieReleased}
          variant="desktop"
        />
        <div className="flex items-center gap-6">
          {movie.trailer?.key && (
            <TrailerModal trailerKey={movie.trailer.key} />
          )}
          <WatchlistButton
            movieId={movie.id.toString()}
            title={movie.title}
            posterPath={movie.poster_path ?? ""}
          />
          <FavoriteButton
            movieId={movie.id.toString()}
            title={movie.title}
            posterPath={movie.poster_path ?? ""}
          />
        </div>
        <MovieDescription movie={movie} providers={providers} />
      </div>
    </div>
  );
};
