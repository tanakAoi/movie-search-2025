import StarryBackground from "@/app/(public)/components/decor/StarryBackground";
import { Hero } from "@/app/(public)/components/home/Hero";
import { MoviesList } from "@/app/(public)/components/home/MoviesList";
import { Container } from "@/app/(public)/components/layout/Container";
import { getPopularMovies, getUpcomingMovies } from "@/services/movieService";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const country = cookieStore.get("userCountry")?.value || "US";

  const popularMovies = await getPopularMovies(country);
  const upcomingMovies = await getUpcomingMovies(country);

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
