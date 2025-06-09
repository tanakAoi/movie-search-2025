import { Hero } from "@/components/home/Hero";
import { MoviesList } from "@/components/home/MoviesList";
import { Container } from "@/components/layout/Container";
import { getPopularMovies, getUpcomingMovies } from "@/services/movieService";

export default async function Home() {
  const popularMovies = await getPopularMovies();
  const upcomingMovies = await getUpcomingMovies();
  
  return (
    <>
      <Hero />
      <Container>
        <MoviesList movies={popularMovies} type={"popular"} />
        <MoviesList movies={upcomingMovies} type={"upcoming"} />
      </Container>
    </>
  );
}
