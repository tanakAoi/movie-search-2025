import { IMovie } from "@/types/tmdb";
import Link from "next/link";
import Image from "next/image";
import StarryBackground from "../decor/StarryBackground";
import { Container } from "../layout/Container";
import { Pagination } from "../ui/Pagination";

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
  return (
    <>
      {movies.length < 1 ? (
        <div className="py-18 md:py-24 relative w-full flex flex-col items-center justify-center gap-4 text-base-bg z-10 min-h-screen">
          <StarryBackground />
          <span className="text-xl">No results found for:</span>
          <h1 className="font-bold text-5xl">"{query}"</h1>
          <p>Please try a different search term or check your spelling.</p>
        </div>
      ) : (
        <>
          <div className="py-18 md:py-24 relative w-full flex flex-col items-center justify-center gap-2 text-base-bg z-10">
            <StarryBackground />
            <span className="text-xl">Result for:</span>
            <h1 className="font-bold text-5xl">"{query}"</h1>
            <p className="text-lg">
              {" "}
              (page {page} of {totalPages})
            </p>
          </div>
          <Container>
            <Pagination page={page} query={query} totalPages={totalPages} />
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
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="rounded-lg"
                      />
                    ) : (
                      <div className="bg-accent-bg text-base-bg w-full h-full flex items-center justify-center rounded-xl max-w-[300px] max-h-[400px]">
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
            <Pagination page={page} query={query} totalPages={totalPages} />
          </Container>
        </>
      )}
    </>
  );
};
