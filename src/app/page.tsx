import { Hero } from "@/components/home/Hero";
import { PopularMovies } from "@/components/home/PopularMovies";
import { Container } from "@/components/layout/Container";
import { getPopularMovies } from "@/services/movieService";

export default async function Home() {
  const movies = await getPopularMovies();

  return (
    <>
      <Hero />
      <Container>
        <PopularMovies movies={movies} />
      </Container>
    </>
  );
}
