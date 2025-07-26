import { Container } from "@/app/components/layout/Container";
import { Pagination } from "@/app/components/ui/Pagination";
import { getRegionFromCookies } from "@/lib/getRegionFromCookies";
import { MovieGrid } from "@/app/components/ui/MovieGrid";
import { PageHeading } from "@/app/components/ui/PageHeading";
import { getMoviesByKeyword } from "@/services/discoverService";
import { getKeywordDetails } from "@/services/moviesService";

type MovieKeywordPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
};

export default async function MovieKeywordPage({
  params,
  searchParams,
}: MovieKeywordPageProps) {
  const { language } = await getRegionFromCookies();
  const { id } = await params;
  const searchParamsObj = await searchParams;
  const page = parseInt(searchParamsObj.page ?? "1", 10);

  const currentKeyword = await getKeywordDetails(id, language);

  const { results, total_pages: totalPages } = await getMoviesByKeyword(
    id,
    language,
    page
  );

  return (
    <div className="bg-base-fg text-base-bg">
      <PageHeading type="keyword" title={currentKeyword?.name || id} />
      <Container>
        <MovieGrid movies={results} />
        <Pagination
          page={page}
          totalPages={totalPages}
          type="keyword"
          id={id}
        />
      </Container>
    </div>
  );
}
