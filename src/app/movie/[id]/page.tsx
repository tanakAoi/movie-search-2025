import { getMovieDetails } from "@/services/movieService";
import { IMovieDetails } from "@/types/tmdb";

interface MoviePageProps {
  params: Promise<{ id: string }>;
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params;
  const movie: IMovieDetails = await getMovieDetails(id);
  if (!movie) {
    return <div className="text-center">Movie not found</div>;
  }
  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-1 flex justify-center">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="rounded-lg"
        />
      </div>
      <div className="col-span-2 flex flex-col text-center gap-5 p-4">
        <h1 className="text-3xl font-bold">{movie.title}</h1>
        <p className="mt-2 text-gray-600">{movie.overview}</p>
        <p className="mt-2 text-gray-500">Release Date: {movie.release_date}</p>
        <p className="mt-2 text-gray-500">Rating: {movie.vote_average}</p>
        <p className="mt-2 text-gray-500">Popularity: {movie.popularity}</p>
        <p className="mt-2 text-gray-500">
          Country:{" "}
          {movie.production_countries.map((country) => country.name).join(", ")}
        </p>
        <p className="mt-2 text-gray-500">
          Language: {movie.original_language}
        </p>
        <p className="mt-2 text-gray-500">
          Genres: {movie.genres.map((genre) => genre.name).join(", ")}
        </p>
        <p className="mt-2 text-gray-500">Runtime: {movie.runtime} minutes</p>
        <p className="mt-2 text-gray-500">Status: {movie.status}</p>
        <p className="mt-2 text-gray-500">Tagline: {movie.tagline}</p>
      </div>
    </div>
  );
}
