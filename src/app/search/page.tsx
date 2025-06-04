import { IMovie } from "@/types/tmdb";
import { getMoviesByKeyword } from "@/services/movieService";
import Link from "next/link";

type SearchParams = Promise<{ query?: string }>;

export default async function Search(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const query = searchParams.query;

  if (!query) {
    return <p>Please enter a search query.</p>;
  }

  const movies: IMovie[] = await getMoviesByKeyword(query);

  if (movies.length === 0) {
    return (
      <p>
        No results found for: <i>{query}</i>
      </p>
    );
  }

  return (
    <section className="p-10 flex flex-col items-center">
      {movies.length > 0 && (
        <h1 className="text-2xl font-bold self-start">
          Result for: <i>{query}</i>
        </h1>
      )}
      <div className="movies grid grid-cols-4 gap-4">
        {movies.map((movie) => (
          <Link
            href={`/movie/${movie.id}`}
            className="col-span-1 flex flex-col items-center justify-between gap-5 pt-8 cursor-pointer"
            key={movie.id}
          >
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="rounded-xl"
              />
            ) : (
              <div className="bg-accent-bg text-base-bg w-full h-full flex items-center justify-center rounded-xl">
                No Image Available
              </div>
            )}
            <h3 className="text-lg font-medium text-center">{movie.title}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
