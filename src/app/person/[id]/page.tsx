import { Container } from "@/app/components/layout/Container";
import { MovieSwitcher } from "@/app/components/ui/MovieSwitcher";
import { PageHeading } from "@/app/components/ui/PageHeading";
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
  const { cast, crew } = await getMoviesByPerson(id, language, page);

  return (
    <div className="bg-base-fg/90 text-base-bg">
      <PageHeading
        title={person.name}
        type={"person"}
        imageUrl={
          person.profile_path
            ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
            : undefined
        }
        description={[
          person.birthday || "",
          person.deathday ? ` - ${person.deathday}` : "",
          person.birthday && " / ",
          person.place_of_birth ? `${person.place_of_birth}` : "",
        ]
          .filter(Boolean)
          .join("")}
      />
      <Container>
        <MovieSwitcher
          cast={cast.results}
          crew={crew.results}
          castPage={cast.page}
          crewPage={crew.page}
          castTotalPages={cast.total_pages}
          crewTotalPages={crew.total_pages}
          id={id}
        />
      </Container>
    </div>
  );
}
