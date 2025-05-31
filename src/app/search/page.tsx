import { IMovie } from "@/models/Tmdb";
import { getMoviesByKeyword } from "@/services/movieService";

type SearchProps = {
  searchParams?: { query?: string };
};

export default async function Search({ searchParams }: SearchProps) {
  const query = searchParams?.query?.trim() ?? "";

  if (!query) {
    return <p>Please enter a search query.</p>;
  }

  const movies: IMovie[] = await getMoviesByKeyword(query);

  return (
    <section className="p-10 flex flex-col items-center">
      {movies.length > 0 && (
        <h1 className="text-2xl font-bold self-start">
          Result for: <i>{query}</i>
        </h1>
      )}
      <div className="movies flex flex-wrap justify-center gap-8 before:max-w-72 before:w-full before:order-1 after:max-w-72 after:w-full">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="max-w-72 flex flex-col items-center justify-between gap-5 pt-8 cursor-pointer"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="rounded-xl"
            />
            <h3 className="text-lg font-medium text-center">{movie.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
