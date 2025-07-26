import { getRegionFromCookies } from "@/lib/getRegionFromCookies";
import { getMovieKeywords } from "@/services/specificMovieService";
import { IMovieKeywords } from "@/types/tmdb";
import { MotionLink } from "../ui/MotionLink";

export const MovieKeywords = async ({ movieId }: { movieId: number }) => {
  const { language } = await getRegionFromCookies();
  const keywords: IMovieKeywords = await getMovieKeywords(movieId, language);

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-2xl font-semibold text-base-bg">Keywords</h3>
      <ul className="flex flex-wrap gap-2">
        {keywords.keywords.map((keyword) => (
          <MotionLink
            href={`keyword/${keyword.id}`}
            key={keyword.id}
            className="px-3 py-1.5 rounded-full text-xs md:text-sm"
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
            {keyword.name}
          </MotionLink>
        ))}
      </ul>
    </div>
  );
};
