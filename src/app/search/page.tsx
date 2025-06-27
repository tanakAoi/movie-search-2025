import { getMoviesByKeyword } from "@/services/movieService";
import StarryBackground from "@/components/decor/StarryBackground";
import { ResultMovies } from "@/components/search/ResultMovies";

export default async function SearchPage({
  searchPageParams: searchPageParamsPromise,
}: {
  searchPageParams: Promise<{ query?: string; page?: string }>;
}) {
  const searchPageParams = await searchPageParamsPromise;
  const query = searchPageParams.query ?? "";
  const page = parseInt(searchPageParams.page ?? "1", 10);

  if (!query) {
    return <p>Please enter a search query.</p>;
  }

  const { results, total_pages } = query
    ? await getMoviesByKeyword(query, page)
    : [];

  if (results.length === 0) {
    return (
      <p>
        No results found for: <i>{query}</i>
      </p>
    );
  }

  return (
    <section className="p-10 flex flex-col items-center relative text-base-bg">
      <StarryBackground />
      <ResultMovies
        query={query}
        page={page}
        movies={results}
        totalPages={total_pages}
      />
    </section>
  );
}
