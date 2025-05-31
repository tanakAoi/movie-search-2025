import { Hero } from "@/components/home/Hero";
import { PopularMovies } from "@/components/home/PopularMovies";
import { Container } from "@/components/layout/Container";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { getPopularMovies } from "@/services/movieService";

export default async function Home() {
  const movies = await getPopularMovies();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Container>
          <PopularMovies movies={movies} />
        </Container>
      </main>
      <Footer />
    </>
  );
}
