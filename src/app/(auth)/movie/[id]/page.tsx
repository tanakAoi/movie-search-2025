import { Container } from "@/app/(public)/components/layout/Container";
import { CircularRating } from "@/app/(public)/components/movie-details/CircularRating";
import { getMovieDetails } from "@/services/movieService";
import { IMovieDetails } from "@/types/tmdb";
import Image from "next/image";
import { BasicInfo } from "@/app/(public)/components/movie-details/BasicInfo";
import { MovieTitle } from "@/app/(public)/components/movie-details/MovieTitle";
import { ReleaseDateBar } from "@/app/(public)/components/movie-details/ReleaseDateBar";
import { TrailerModal } from "@/app/(public)/components/movie-details/TrailerModal";
import { CastsList } from "@/app/(public)/components/movie-details/CastsList";
import { getRegionFromCookies } from "@/lib/getRegionFromCookies";

interface MovieDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function MovieDetailPage({
  params,
}: MovieDetailPageProps) {
  const { language } = await getRegionFromCookies();
  const { id } = await params;

  const movie: IMovieDetails = await getMovieDetails(id, language);

  const isMovieReleased =
    movie.status === "Released" || new Date(movie.release_date) <= new Date();

  return (
    <div>
      <MovieTitle title={movie.title} tagline={movie.tagline} />
      {!isMovieReleased && <ReleaseDateBar date={movie.release_date} />}
      <div className="relative">
        <div
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
          }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat saturate-50 brightness-40 -z-10"
        />
        <Container className="min-h-screen flex flex-col gap-10">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-0 ">
            <figure className="hidden md:block">
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="rounded-lg"
                width={400}
                height={600}
              />
            </figure>
            <div className="flex flex-col gap-10">
              <div className="md:hidden sm:grid sm:grid-cols-3 flex flex-col gap-4 sm:gap-8">
                <figure className="sm:col-span-2">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="rounded-lg"
                    width={400}
                    height={600}
                  />
                </figure>
                <div className="sm:grid-cols-1 flex flex-col justify-between items-center gap-6">
                  <BasicInfo
                    runtime={movie.runtime}
                    language={movie.original_language}
                    countries={movie.production_countries}
                    type="mobile"
                  />
                  <div className="grid-cols-1 md:hidden w-full flex items-end justify-between gap-4">
                    {isMovieReleased && (
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
                    )}
                  </div>
                </div>
              </div>
              <BasicInfo
                runtime={movie.runtime}
                language={movie.original_language}
                countries={movie.production_countries}
                type="desktop"
              />
              <div className="flex flex-col gap-10 col-span-1">
                <div className="hidden md:flex md:items-end md:justify-between gap-4">
                  {isMovieReleased && (
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
                  )}
                </div>
                {movie.trailer?.key && (
                  <TrailerModal trailerKey={movie.trailer.key} />
                )}
                <div className="text-base-bg flex flex-col gap-2">
                  <span className="font-bold">Movie info</span>
                  <div className="flex flex-col gap-1">
                    {isMovieReleased && (
                      <p>Release Date: {movie.release_date}</p>
                    )}
                    <p>
                      Genres:{" "}
                      {movie.genres.map((genre) => genre.name).join(", ")}
                    </p>
                  </div>
                </div>
                <div className="text-base-bg flex flex-col gap-2">
                  <span className="font-bold">Overview</span>
                  <p className="">{movie.overview}</p>
                </div>
              </div>
            </div>
          </div>
          <CastsList cast={movie.credits.cast} />
        </Container>
      </div>
    </div>
  );
}
