import StarryBackground from "@/app/components/decor/StarryBackground";
import { Container } from "@/app/components/layout/Container";
import { Pagination } from "@/app/components/ui/Pagination";
import { getRegionFromCookies } from "@/lib/getRegionFromCookies";
import { getDiscoverMovies, getGenres } from "@/services/movieService";
import { IGenre } from "@/types/tmdb";
import notFound from "@/app/not-found";
import { MovieGrid } from "@/app/components/ui/MovieGrid";

interface MovieGenrePageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
}

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

  const { results, total_pages: totalPages } = await getDiscoverMovies(
    id,
    language,
    page
  );

  return (
    <div>
      <div className="py-18 md:py-24 relative w-full flex flex-col items-center justify-center gap-2 text-base-bg z-10">
        <StarryBackground />
        <h1 className="font-bold text-5xl">{currentGenre?.name || id}</h1>
      </div>
      <Container>
        <MovieGrid movies={results} />
        <Pagination
          page={page}
          totalPages={totalPages}
          type="discover"
          genreId={id}
        />
      </Container>
    </div>
  );
}
