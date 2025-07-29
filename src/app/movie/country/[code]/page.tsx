import { Container } from "@/app/components/layout/Container";
import { Pagination } from "@/app/components/ui/Pagination";
import { getRegionFromCookies } from "@/lib/getRegionFromCookies";
import { MovieGrid } from "@/app/components/ui/MovieGrid";
import { PageHeading } from "@/app/components/ui/PageHeading";
import { getMoviesByCountry } from "@/services/discoverService";

type MovieCountryPageProps = {
  params: Promise<{ code: string }>;
  searchParams: Promise<{ page?: string }>;
};

export default async function MovieCountryPage({
  params,
  searchParams,
}: MovieCountryPageProps) {
  const { language } = await getRegionFromCookies();
  const { code } = await params;
  const searchParamsObj = await searchParams;
  const page = parseInt(searchParamsObj.page ?? "1", 10);

  const { results, total_pages: totalPages } = await getMoviesByCountry(
    code,
    language,
    page
  );

  return (
    <div className="bg-base-fg text-base-bg">
      <PageHeading type="country" title={code} />
      <Container>
        <MovieGrid movies={results} />
        <Pagination
          page={page}
          totalPages={totalPages}
          type="country"
          id={code}
        />
      </Container>
    </div>
  );
}
