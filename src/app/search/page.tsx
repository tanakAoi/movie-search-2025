import { getMoviesByKeyword } from "@/services/movieService";
import StarryBackground from "../components/decor/StarryBackground";
import { Container } from "../components/layout/Container";
import { MovieGrid } from "../components/ui/MovieGrid";
import { Pagination } from "../components/ui/Pagination";
import { getRegionFromCookies } from "@/lib/getRegionFromCookies";

interface SearchPageProps {
  searchParams: Promise<{ query?: string; page?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = (await searchParams).query ?? "";
  const page = parseInt((await searchParams).page ?? "1", 10);
  const { language } = await getRegionFromCookies();

  if (!query) {
    return <p>Please enter a search query.</p>;
  }

  const { results, total_pages: totalPages } = query
    ? await getMoviesByKeyword(query, page, language)
    : [];

  return (
    <>
      {results.length < 1 ? (
        <div className="py-18 md:py-24 relative w-full flex flex-col items-center justify-center gap-4 text-base-bg z-10 min-h-screen">
          <StarryBackground />
          <span className="text-xl">No results found for:</span>
          <h1 className="font-bold text-5xl">&quot;{query}&quot;</h1>
          <p>Please try a different search term or check your spelling.</p>
        </div>
      ) : (
        <>
          <div className="py-18 md:py-24 relative w-full flex flex-col items-center justify-center gap-2 text-base-bg z-10">
            <StarryBackground />
            <span className="text-xl">Result for:</span>
            <h1 className="font-bold text-5xl">&quot;{query}&quot;</h1>
            <p className="text-lg">
              {" "}
              (page {page} of {totalPages})
            </p>
          </div>
          <Container>
            <Pagination
              page={page}
              query={query}
              totalPages={totalPages}
              type="search"
            />
            <MovieGrid movies={results} />
            <Pagination
              page={page}
              query={query}
              totalPages={totalPages}
              type="search"
            />
          </Container>
        </>
      )}
    </>
  );
}
