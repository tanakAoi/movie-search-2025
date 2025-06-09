import { Container } from "@/components/layout/Container";
import { CircularRating } from "@/components/ui/CircularRating";
import { Quote } from "@/components/ui/Quote";
import { getMovieDetails } from "@/services/movieService";
import { IMovieDetails } from "@/types/tmdb";
import Image from "next/image";
import ISO6391 from "iso-639-1";

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

  const countryShortNames: Record<string, string> = {
    US: "USA",
    GB: "UK",
  };

  return (
    <Container className="grid grid-cols-3 gap-10">
      <figure className="col-span-1">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="rounded-lg"
          width={400}
          height={600}
        />
      </figure>
      <div className="col-span-2 flex flex-col gap-10">
        {!isMovieReleased && (
          <p className="text-center bg-accent-bg/20 p-2 mb-2">
            This movie will be released on{" "}
            <span className="text-accent-bg font-bold">
              {new Date(movie.release_date).toLocaleDateString()}
            </span>
            .
          </p>
        )}
        <div className="grid grid-cols-2 gap-8">
          <div className="cols-span-1 flex flex-col gap-4">
            <h1 className="text-4xl font-bold">{movie.title}</h1>
            {movie.tagline && <Quote tagline={movie.tagline} />}
          </div>
          <div className="col-span-1 text-sm grid grid-cols-3 bg-base-fg/10 px-4 py-6 rounded-sm h-fit *:col-span-1 *:flex *:flex-col *:items-center *:gap-2 **:[span]:font-bold">
            <p>
              <span>Runtime</span>
              {(movie.runtime / 60).toFixed(0)} h {movie.runtime % 60} min
            </p>
            <p>
              <span>Language</span>
              {ISO6391.getName(movie.original_language)}
            </p>
            <p>
              <span>Country</span>
              <ul className="flex flex-col items-center gap-2">
                {movie.production_countries.map((country) => (
                  <li key={country.iso_3166_1}>
                    {countryShortNames[country.iso_3166_1] || country.name}
                  </li>
                ))}
              </ul>
            </p>
          </div>
        </div>
        {isMovieReleased && (
          <div className="flex">
            <CircularRating rating={movie.vote_average} size={80} />
          </div>
        )}
        <div>
          {isMovieReleased && (
            <p className="mt-2 text-gray-500">
              Release Date: {movie.release_date}
            </p>
          )}
          <p className="mt-2 text-gray-500">
            Genres: {movie.genres.map((genre) => genre.name).join(", ")}
          </p>
        </div>
        <div>
          <span className="font-bold mb-1">Overview:</span>
          <p className="">{movie.overview}</p>
        </div>
      </div>
    </Container>
  );
}
