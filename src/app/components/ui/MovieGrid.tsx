import { IMovie } from "@/types/tmdb";
import Link from "next/link";
import Image from "next/image";

export const MovieGrid = ({ movies }: { movies: IMovie[] }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-10">
      {[...movies]
        .sort((a, b) => (b.vote_count ?? 0) - (a.vote_count ?? 0))
        .map((movie) => (
          <Link
            href={`/movie/${movie.id}`}
            className="flex flex-col items-center justify-around gap-4 cursor-pointer hover:opacity-75 transition-opacity duration-300"
            key={movie.id}
          >
            {movie.poster_path ? (
              <Image
                width={300}
                height={400}
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={movie.title || "Movie Poster"}
                className="rounded-lg"
              />
            ) : (
              <div className="bg-accent-bg text-base-bg w-full h-full flex items-center justify-center rounded-xl min-h-[200px]">
                No Image Available
              </div>
            )}
            <h3 className="text-lg font-semibold line-clamp-2">
              {movie.title}
              {movie.release_date &&
                ` (${new Date(movie.release_date).getFullYear()})`}
            </h3>
          </Link>
        ))}
    </div>
  );
};
