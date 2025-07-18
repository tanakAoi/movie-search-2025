import { Container } from "@/app/components/layout/Container";
import { getMovieDetails } from "@/services/movieService";
import { IMovieDetails } from "@/types/tmdb";
import { ReleaseDateBar } from "@/app/components/movie-details/ReleaseDateBar";
import { CastsList } from "@/app/components/movie-details/CastsList";
import { getRegionFromCookies } from "@/lib/getRegionFromCookies";
import { MovieNotFound } from "@/app/components/ui/MovieNotFound";
import { PageHeading } from "@/app/components/ui/PageHeading";
import { SimilarMovies } from "@/app/components/movie-details/SimilarMovies";
import { MovieMobileLayout } from "@/app/components/movie-details/MovieMobileLayout";
import { MainSection } from "@/app/components/movie-details/MainSection";
import { BackdropImage } from "@/app/components/movie-details/BackdropImage";
import { isReleased } from "@/utils/date";

type MovieDetailPageProps = {
  params: Promise<{ id: string }>;
}

export default async function MovieDetailPage({
  params,
}: MovieDetailPageProps) {
  const { language } = await getRegionFromCookies();
  const { id } = await params;

  const movie: IMovieDetails = await getMovieDetails(id, language);

  if (movie.error) {
    return <MovieNotFound />;
  }

  const isMovieReleased = isReleased(movie.status, movie.release_date);

  return (
    <div>
      <PageHeading type="movie" title={movie.title} tagline={movie.tagline} />
      {!isMovieReleased && <ReleaseDateBar date={movie.release_date} />}
      <div className="relative">
        <BackdropImage backdropPath={movie.backdrop_path} />
        <Container className="min-h-screen flex flex-col gap-10">
          <MovieMobileLayout movie={movie} isMovieReleased={isMovieReleased} />
          <MainSection movie={movie} isMovieReleased={isMovieReleased} />
          {movie.credits.cast.length > 0 && (
            <CastsList cast={movie.credits.cast} />
          )}
          <SimilarMovies movieId={movie.id} />
        </Container>
      </div>
    </div>
  );
}
