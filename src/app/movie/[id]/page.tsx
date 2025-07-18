import { Container } from "@/app/components/layout/Container";
import { CircularRating } from "@/app/components/movie-details/CircularRating";
import { getMovieDetails } from "@/services/movieService";
import { IMovieDetails } from "@/types/tmdb";
import Image from "next/image";
import { BasicInfo } from "@/app/components/movie-details/BasicInfo";
import { ReleaseDateBar } from "@/app/components/movie-details/ReleaseDateBar";
import { TrailerModal } from "@/app/components/movie-details/TrailerModal";
import { CastsList } from "@/app/components/movie-details/CastsList";
import { getRegionFromCookies } from "@/lib/getRegionFromCookies";
import Link from "next/link";
import { MovieNotFound } from "@/app/components/ui/MovieNotFound";
import { PageHeading } from "@/app/components/movie-details/PageHeading";
import { SimilarMovies } from "@/app/components/movie-details/SimilarMovies";

interface MovieDetailPageProps {
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

  const isMovieReleased =
    movie.status === "Released" || new Date(movie.release_date) <= new Date();

  return (
    <div>
      <PageHeading type="movie" title={movie.title} tagline={movie.tagline} />
      {!isMovieReleased && <ReleaseDateBar date={movie.release_date} />}
      <div className="relative">
        <div
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat saturate-50 brightness-40 -z-10 bg-base-fg/75"
        />
        <Container className="min-h-screen flex flex-col gap-10">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-0 ">
            <figure className="hidden md:block">
              {movie.poster_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  alt={movie.title || "Movie Poster"}
                  className="rounded-lg"
                  width={400}
                  height={600}
                />
              ) : (
                <div className="bg-accent-bg text-base-bg w-full h-full flex items-center justify-center rounded-xl max-w-[300px] max-h-[400px]">
                  No Image Available
                </div>
              )}
            </figure>
            <div className="flex flex-col gap-10">
              <div className="md:hidden sm:grid sm:grid-cols-3 flex flex-col gap-4 sm:gap-8">
                <figure className="sm:col-span-2">
                  {movie.poster_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                      alt={movie.title || "Movie Poster"}
                      className="rounded-lg"
                      width={400}
                      height={600}
                    />
                  ) : (
                    <div className="bg-accent-bg text-base-bg w-full h-full flex items-center justify-center rounded-xl max-w-[300px] max-h-[400px]">
                      No Image Available
                    </div>
                  )}
                </figure>
                <div className="sm:grid-cols-1 flex flex-col justify-between items-center gap-6">
                  <BasicInfo
                    runtime={movie.runtime}
                    language={movie.original_language}
                    countries={movie.production_countries.map(
                      (c) => c.iso_3166_1
                    )}
                    type="mobile"
                  />
                  {isMovieReleased && movie.scores?.length > 0 && (
                    <div className="grid-cols-1 md:hidden w-full flex items-end justify-between gap-4">
                      <div className="flex flex-col gap-2 w-full">
                        <span className="text-base-bg font-bold">Rating</span>
                        <div className="grid grid-cols-2 gap-4">
                          {movie.scores.map((score) => (
                            <CircularRating
                              key={score.source}
                              source={score.source}
                              value={score.value}
                              size={80}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <BasicInfo
                runtime={movie.runtime}
                language={movie.original_language}
                countries={movie.production_countries.map((c) => c.iso_3166_1)}
                type="desktop"
              />
              <div className="flex flex-col gap-10 col-span-1">
                {isMovieReleased && movie.scores?.length > 0 && (
                  <div className="hidden md:flex md:items-end md:justify-between gap-4">
                    <div className="flex flex-col gap-2 w-full">
                      <span className="text-base-bg font-bold">Rating</span>
                      <div className="grid grid-cols-2 lg:flex lg:items-center gap-4 xl:gap-10">
                        {movie.scores.map((score) => (
                          <CircularRating
                            key={score.source}
                            source={score.source}
                            value={score.value}
                            size={100}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {movie.trailer?.key && (
                  <TrailerModal trailerKey={movie.trailer.key} />
                )}
                <div className="text-base-bg flex flex-col gap-2">
                  <span className="font-bold">Movie info</span>
                  <div className="flex flex-col gap-1">
                    {isMovieReleased && (
                      <p>Release Date: {movie.release_date}</p>
                    )}
                    {movie.genres.length > 0 && (
                      <div>
                        <span>Genres: </span>
                        {movie.genres.map((genre, idx) => (
                          <span key={genre.id}>
                            <Link
                              href={`/movie/genre/${genre.id}`}
                              className="hover:underline"
                            >
                              {genre.name}
                            </Link>
                            {idx < movie.genres.length - 1 && ", "}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                {movie.overview && (
                  <div className="text-base-bg flex flex-col gap-2">
                    <span className="font-bold">Overview</span>
                    <p className="">{movie.overview}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          {movie.credits.cast.length > 0 && (
            <CastsList cast={movie.credits.cast} />
          )}
          <SimilarMovies movieId={movie.id} />
        </Container>
      </div>
    </div>
  );
}
