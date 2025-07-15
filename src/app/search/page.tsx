import { getMoviesByKeyword } from "@/services/movieService";
import { ResultMovies } from "@/app/components/search/ResultMovies";

export default async function SearchPage({
  searchParams: searchParamsPromise,
}: {
  searchParams: Promise<{ query?: string; page?: string; lang?: string }>;
}) {
  const searchParams = await searchParamsPromise;
  const query = searchParams.query ?? "";
  const page = parseInt(searchParams.page ?? "1", 10);
  const lang = searchParams.lang ?? "";

  if (!query) {
    return <p>Please enter a search query.</p>;
  }

  const { results, total_pages } = query
    ? await getMoviesByKeyword(query, page, lang)
    : [];

  if (results.length === 0) {
    return (
      <p>
        No results found for: <i>{query}</i>
      </p>
    );
  }

  return (
    <ResultMovies
      query={query}
      page={page}
      movies={results}
      totalPages={total_pages}
    />
  );
}
