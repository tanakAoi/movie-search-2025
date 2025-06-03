import { Hero } from "@/components/home/Hero";
import { PopularMovies } from "@/components/home/PopularMovies";
import { UpcomingMovies } from "@/components/home/UpcomingMovies";
import { Container } from "@/components/layout/Container";
import { getPopularMovies, getUpcomingMovies } from "@/services/movieService";

export default async function Home() {
  const popularMovies = await getPopularMovies();
  const upcomingMovies = await getUpcomingMovies();
  
  return (
    <>
      <Hero />
      <Container>
        <PopularMovies movies={popularMovies} />
        <UpcomingMovies movies={upcomingMovies} />
      </Container>
    </>
  );
}
