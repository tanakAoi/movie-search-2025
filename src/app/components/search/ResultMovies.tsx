"use client";

import { IMovie } from "@/types/tmdb";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ResultMoviesProps {
  query: string;
  page: number;
  movies: IMovie[];
  totalPages: number;
}

export const ResultMovies = ({
  query,
  page,
  movies,
  totalPages,
}: ResultMoviesProps) => {
  const router = useRouter();
  const handlePageChange = (newPage: number) => {
    router.push(`/search?query=${query}&page=${newPage}`);
  };

  return (
    <>
      {movies.length > 0 && (
        <h1 className="text-2xl font-bold self-start">
          Result for: <i>{query}</i> (page {page})
        </h1>
      )}
      <div className="movies grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5">
        {[...movies]
          .sort((a, b) => (b.vote_count ?? 0) - (a.vote_count ?? 0))
          .map((movie) => (
            <Link
              href={`/movie/${movie.id}`}
              className="flex flex-col items-center justify-around gap-4 pt-8 cursor-pointer"
              key={movie.id}
            >
              {movie.poster_path ? (
                <Image
                  width={300}
                  height={400}
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="rounded-xl"
                />
              ) : (
                <div className="bg-accent-bg text-base-bg w-full h-full flex items-center justify-center rounded-xl max-w-[300px] max-h-[400px]">
                  No Image Available
                </div>
              )}
              <h3 className="text-lg font-semibold">
                {movie.title}
                {movie.release_date &&
                  ` (${new Date(movie.release_date).getFullYear()})`}
              </h3>
            </Link>
          ))}
      </div>
      <div className="flex gap-4 mt-6 justify-center">
        <button
          onClick={() => handlePageChange(1)}
          disabled={page === 1}
          className="px-3 py-1 rounded disabled:opacity-50"
        >
          ⏮ First
        </button>

        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page <= 1}
          className="px-3 py-1 rounded disabled:opacity-50"
        >
          ◀ Prev
        </button>

        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= totalPages}
          className="px-3 py-1 rounded disabled:opacity-50"
        >
          Next ▶
        </button>

        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={page === totalPages}
          className="px-3 py-1 rounded disabled:opacity-50"
        >
          Last ⏭
        </button>
      </div>
    </>
  );
};
