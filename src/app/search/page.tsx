import { getMoviesByQuery } from "@/services/moviesService";
import { Container } from "../components/layout/Container";
import { MovieGrid } from "../components/ui/MovieGrid";
import { Pagination } from "../components/ui/Pagination";
import { getRegionFromCookies } from "@/lib/getRegionFromCookies";
import { PageHeading } from "../components/ui/PageHeading";

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
    ? await getMoviesByQuery(query, page, language)
    : [];

  return (
    <>
      {results.length < 1 ? (
        <PageHeading
          type="no-results"
          title={query}
          subtitle="No results found for:"
          description="Please try a different search term or check your spelling."
        />
      ) : (
        <div className="bg-base-fg/90 text-base-bg">
          <PageHeading
            type="search"
            title={query}
            subtitle="Results for:"
            pageInfo={{ page, totalPages }}
          />
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
        </div>
      )}
    </>
  );
}
