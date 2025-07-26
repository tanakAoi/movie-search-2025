import { Container } from "@/app/components/layout/Container";
import { MovieGrid } from "@/app/components/ui/MovieGrid";
import { PageHeading } from "@/app/components/ui/PageHeading";
import { Pagination } from "@/app/components/ui/Pagination";
import { getRegionFromCookies } from "@/lib/getRegionFromCookies";
import { getMoviesByPerson } from "@/services/discoverService";
import { getPersonDetails } from "@/services/personService";
import { IPerson } from "@/types/tmdb";

type PersonPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
};

export default async function PersonPage({
  params,
  searchParams,
}: PersonPageProps) {
  const { language } = await getRegionFromCookies();
  const { id } = await params;
  const searchParamsObj = await searchParams;
  const page = parseInt(searchParamsObj.page ?? "1", 10);

  const person: IPerson = await getPersonDetails(id, language);
  const { results, total_pages } = await getMoviesByPerson(id, language, page);

  return (
    <div className="bg-base-fg/90 text-base-bg">
      <PageHeading
        title={person.name}
        type={"person"}
        imageUrl={
          person.profile_path
            ? `https://image.tmdb.org/t/p/original${person.profile_path}`
            : undefined
        }
        description={[
          person.birthday || "",
          person.deathday ? ` - ${person.deathday}` : "",
          person.place_of_birth ? ` / ${person.place_of_birth}` : "",
        ]
          .filter(Boolean)
          .join("")}
      />
      <Container>
        <MovieGrid movies={results} />
        <Pagination
          page={page}
          totalPages={total_pages}
          type="person"
          id={id}
        />
      </Container>
    </div>
  );
}
