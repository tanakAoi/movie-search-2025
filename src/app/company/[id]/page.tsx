import { Container } from "@/app/components/layout/Container";
import { MovieGrid } from "@/app/components/ui/MovieGrid";
import { PageHeading } from "@/app/components/ui/PageHeading";
import { Pagination } from "@/app/components/ui/Pagination";
import { getRegionFromCookies } from "@/lib/getRegionFromCookies";
import { getCompanyDetails } from "@/services/companyService";
import { getMoviesByCompany } from "@/services/discoverService";
import { ICompany } from "@/types/tmdb";

type CompanyPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
};

export default async function CompanyPage({
  params,
  searchParams,
}: CompanyPageProps) {
  const { language } = await getRegionFromCookies();
  const { id } = await params;
  const searchParamsObj = await searchParams;
  const page = parseInt(searchParamsObj.page ?? "1", 10);

  const company: ICompany = await getCompanyDetails(id, language);
  const { results, total_pages } = await getMoviesByCompany(id, language, page);

  return (
    <div className="bg-base-fg/90 text-base-bg">
      <PageHeading
        title={company.name}
        type={"company"}
        imageUrl={
          company.logo_path
            ? `https://image.tmdb.org/t/p/w500${company.logo_path}`
            : undefined
        }
        description={
          company.headquarters
            ? `${company.headquarters}, ${company.origin_country}`
            : `${company.origin_country}`
        }
      />
      <Container>
        <MovieGrid movies={results} />
        <Pagination
          page={page}
          totalPages={total_pages}
          type="company"
          id={id}
        />
      </Container>
    </div>
  );
}
