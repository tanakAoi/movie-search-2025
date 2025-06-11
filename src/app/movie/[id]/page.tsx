import { Container } from "@/components/layout/Container";
import { CircularRating } from "@/components/ui/MovieDetails/CircularRating";
import { getMovieDetails } from "@/services/movieService";
import { IMovieDetails } from "@/types/tmdb";
import Image from "next/image";
import { BasicInfo } from "@/components/ui/MovieDetails/BasicInfo";
import { MovieTitle } from "@/components/ui/MovieDetails/MovieTitle";
import { ReleaseDateBar } from "@/components/ui/MovieDetails/ReleaseDateBar";

interface MoviePageProps {
  params: Promise<{ id: string }>;
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params;
  const movie: IMovieDetails = await getMovieDetails(id);
  if (!movie) {
    return <div className="text-center">Movie not found</div>;
  }
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
        <Container className="grid md:grid-cols-2 px-8 gap-10 lg:gap-0 min-h-screen">
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
                {isMovieReleased && (
                  <div className="grid-cols-1 md:hidden block">
                    <CircularRating rating={movie.vote_average} size={100} />
                  </div>
                )}
              </div>
            </div>
            <BasicInfo
              runtime={movie.runtime}
              language={movie.original_language}
              countries={movie.production_countries}
              type="desktop"
            />
            <div className="flex flex-col gap-10 col-span-1">
              {isMovieReleased && (
                <div className="md:flex hidden">
                  <CircularRating rating={movie.vote_average} size={100} />
                  {movie.video && <></>}
                </div>
              )}
              <div className="text-base-bg flex flex-col gap-2">
                <span className="font-bold">Movie info</span>
                <div className="flex flex-col gap-1">
                  {isMovieReleased && <p>Release Date: {movie.release_date}</p>}
                  <p>
                    Genres: {movie.genres.map((genre) => genre.name).join(", ")}
                  </p>
                </div>
              </div>
              <div className="text-base-bg flex flex-col gap-2">
                <span className="font-bold">Overview</span>
                <p className="">{movie.overview}</p>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
