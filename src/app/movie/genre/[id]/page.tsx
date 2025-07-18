import { Container } from "@/app/components/layout/Container";
import { Pagination } from "@/app/components/ui/Pagination";
import { getRegionFromCookies } from "@/lib/getRegionFromCookies";
import { getGenres, getMoviesByGenre } from "@/services/movieService";
import { IGenre } from "@/types/tmdb";
import notFound from "@/app/not-found";
import { MovieGrid } from "@/app/components/ui/MovieGrid";
import { PageHeading } from "@/app/components/ui/PageHeading";

type MovieGenrePageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
};

export default async function MovieGenrePage({
  params,
  searchParams,
}: MovieGenrePageProps) {
  const { language } = await getRegionFromCookies();
  const { id } = await params;
  const searchParamsObj = await searchParams;
  const page = parseInt(searchParamsObj.page ?? "1", 10);

  const genreMap = new Map<number, IGenre>(
    (await getGenres(language)).map((g: IGenre) => [g.id, g])
  );
  const currentGenre = genreMap.get(Number(id));

  if (!currentGenre) {
    notFound();
  }

  const { results, total_pages: totalPages } = await getMoviesByGenre(
    id,
    language,
    page
  );

  return (
    <div>
      <PageHeading type="genre" title={currentGenre?.name || id} />
      <Container>
        <MovieGrid movies={results} />
        <Pagination
          page={page}
          totalPages={totalPages}
          type="discover"
          id={id}
        />
      </Container>
    </div>
  );
}
