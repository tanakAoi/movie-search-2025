import { IMovieDetails } from "@/types/tmdb";
import Link from "next/link";

type MovieDescriptionProps = {
  movie: IMovieDetails;
  isMovieReleased: boolean;
};

export const MovieDescription = ({
  movie,
  isMovieReleased,
}: MovieDescriptionProps) => {
  
  return (
    <div className="flex flex-col gap-10">
      <div className="text-base-bg flex flex-col gap-2">
        <span className="font-bold">Movie info</span>
        <div className="flex flex-col gap-1">
          {isMovieReleased && <p>Release Date: {movie.release_date}</p>}
          {movie.genres.length > 0 && (
            <div>
              <span>Genres: </span>
              {movie.genres.map((genre, idx) => (
                <span key={genre.id}>
                  <Link
                    href={`/movie/genre/${genre.id}`}
                    className="hover:underline"
                  >
                    {genre.name}
                  </Link>
                  {idx < movie.genres.length - 1 && ", "}
                </span>
              ))}
            </div>
          )}
          {movie.credits.crew.filter((crew) => crew.job === "Director").length >
            0 && (
            <div>
              <span>Directors: </span>
              {movie.credits.crew
                .filter((crew) => crew.job === "Director")
                .map((director, idx) => (
                  <span key={director.id}>
                    <Link
                      href={`/person/${director.id}`}
                      className="hover:underline"
                    >
                      {director.name}
                    </Link>
                    {idx <
                      movie.credits.crew.filter(
                        (crew) => crew.job === "Director"
                      ).length -
                        1 && ", "}
                  </span>
                ))}
            </div>
          )}
          {movie.credits.crew.filter((crew) => crew.job === "Producer").length >
            0 && (
            <div>
              <span>Producers: </span>
              {movie.credits.crew
                .filter((crew) => crew.job === "Producer")
                .map((producer, idx) => (
                  <span key={producer.id}>
                    <Link
                      href={`/person/${producer.id}`}
                      className="hover:underline"
                    >
                      {producer.name}
                    </Link>
                    {idx <
                      movie.credits.crew.filter(
                        (crew) => crew.job === "Producer"
                      ).length -
                        1 && ", "}
                  </span>
                ))}
            </div>
          )}
          {movie.credits.crew.filter((crew) => crew.job === "Writer").length >
            0 && (
            <div>
              <span>Writers: </span>
              {movie.credits.crew
                .filter((crew) => crew.job === "Writer")
                .map((writer, idx) => (
                  <span key={writer.id}>
                    <Link
                      href={`/person/${writer.id}`}
                      className="hover:underline"
                    >
                      {writer.name}
                    </Link>
                    {idx <
                      movie.credits.crew.filter((crew) => crew.job === "Writer")
                        .length -
                        1 && ", "}
                  </span>
                ))}
            </div>
          )}
        </div>
      </div>
      {movie.overview && (
        <div className="text-base-bg flex flex-col gap-2">
          <span className="font-bold">Overview</span>
          <p>{movie.overview}</p>
        </div>
      )}
    </div>
  );
};
