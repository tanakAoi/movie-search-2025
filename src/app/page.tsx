import StarryBackground from "@/components/decor/StarryBackground";
import { Hero } from "@/components/home/Hero";
import { MoviesList } from "@/components/home/MoviesList";
import { Container } from "@/components/layout/Container";
import { getPopularMovies, getUpcomingMovies } from "@/services/movieService";

export default async function Home() {
  const popularMovies = await getPopularMovies();
  const upcomingMovies = await getUpcomingMovies();

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
