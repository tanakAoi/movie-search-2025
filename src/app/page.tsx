import StarryBackground from "@/app/components/decor/StarryBackground";
import { Hero } from "@/app/components/home/Hero";
import { MoviesList } from "@/app/components/home/MoviesList";
import { Container } from "@/app/components/layout/Container";
import { getRegionFromCookies } from "@/lib/getRegionFromCookies";
import { getPopularMovies, getUpcomingMovies } from "@/services/moviesService";

export default async function Home() {
  const { country, language } = await getRegionFromCookies();

  const popularMovies = await getPopularMovies(language, country);
  const upcomingMovies = await getUpcomingMovies(language, country);

  return (
    <div className="relative">
      <StarryBackground />
      <Container className="flex flex-col items-center gap-20">
        <Hero />
        <MoviesList movies={popularMovies} type={"popular"} />
        <MoviesList movies={upcomingMovies} type={"upcoming"} />
      </Container>
    </div>
  );
}
