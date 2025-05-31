import { IMovie } from "@/models/Tmdb";
import { getMoviesByKeyword } from "@/services/movieService";

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
      <div className="movies flex flex-wrap justify-center gap-8">
        {movies.map((movie) => (
          <div key={movie.id} className="max-w-72">
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
