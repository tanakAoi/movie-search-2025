import { getRegionFromCookies } from "@/lib/getRegionFromCookies";
import { getSimilarMovies } from "@/services/movieService";
import { IMovie } from "@/types/tmdb";
import { MovieSlider } from "../ui/MovieSlider";

export const SimilarMovies = async ({ movieId }: { movieId: number }) => {
  const { language } = await getRegionFromCookies();
  const movies: IMovie[] = await getSimilarMovies(movieId, language);

  return (
    movies.length > 0 && (
      <div className="flex flex-col gap-4">
        <h3 className="text-3xl font-semibold text-base-bg">Similar Movies</h3>
        <MovieSlider movies={movies} type="small" />
      </div>
    )
  );
};
