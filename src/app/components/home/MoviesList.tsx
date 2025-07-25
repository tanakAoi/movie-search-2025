import { IMovie } from "@/types/tmdb";
import { MovieSlider } from "../ui/MovieSlider";

interface MoviesListProps {
  movies: IMovie[];
  type: "popular" | "upcoming";
}

export const MoviesList = ({ movies, type }: MoviesListProps) => {
  const contentMap = {
    popular: {
      title: "Popular Movies",
      description: "Check out the latest popular movies!",
    },
    upcoming: {
      title: "Upcoming Movies",
      description: "Check out the latest upcoming movies!",
    },
  };

  return (
    <div className="flex flex-col items-center gap-5 w-full px-auto text-base-bg">
      <h2 className="text-3xl font-bold">{contentMap[type].title}</h2>
      <p className="text-md">{contentMap[type].description}</p>
      <MovieSlider
        movies={movies}
        type="large"
      />
    </div>
  );
};
