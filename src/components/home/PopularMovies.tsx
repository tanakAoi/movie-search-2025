import { IMovie } from "@/models/Tmdb";

interface PopularMoviesProps {
  movies: IMovie[];
}

export const PopularMovies = ({ movies }: PopularMoviesProps) => {
  return (
    <div className="flex flex-col items-center gap-5 w-full py-10 px-auto">
      <h2 className="text-3xl font-bold">Popular Movies</h2>
      <p className="text-md">Check out the latest popular movies</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="max-w-xs flex flex-col items-center bg-base-bg p-4 rounded-lg shadow-lg"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-auto rounded-lg mb-3"
            />
            <h3 className="text-lg font-semibold">{movie.title}</h3>
            <p className="text-sm text-gray-600">{movie.release_date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
