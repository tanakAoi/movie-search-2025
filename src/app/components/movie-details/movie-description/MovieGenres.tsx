import { IGenre } from "@/types/tmdb";
import { MotionLink } from "../../ui/MotionLink";

type MovieGenresProps = {
  genres: IGenre[];
};

export const MovieGenres = ({ genres }: MovieGenresProps) => {
  return (
    <div>
      <h3 className="text-xl font-bold mb-2 text-base-bg">Genres</h3>
      <div className="flex flex-wrap gap-2">
        {genres.map((genre) => (
          <MotionLink
            href={`genre/${genre.id}`}
            key={genre.id}
            className="px-3 py-1.5 rounded-full text-sm md:text-sm"
            initial={{
              border: "1px solid var(--color-accent-bg)",
              backgroundColor: "var(--color-accent-bg)",
              color: "var(--color-base-bg)",
            }}
            whileHover={{
              border: "1px solid var(--color-accent-bg)",
              backgroundColor: "var(--color-base-bg)",
              color: "var(--color-accent-bg)",
              transition: { duration: 0.3 },
            }}
          >
            {genre.name}
          </MotionLink>
        ))}
      </div>
    </div>
  );
};
