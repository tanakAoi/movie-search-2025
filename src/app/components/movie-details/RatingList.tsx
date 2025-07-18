import { IScores } from "@/types/tmdb";
import { CircularRating } from "./CircularRating";

type RatingListProps = {
  scores: IScores[];
  isReleased: boolean;
  variant: "mobile" | "desktop";
};

export const RatingList = ({
  scores,
  isReleased,
  variant,
}: RatingListProps) => {
  if (!isReleased || !scores || scores.length === 0) return null;

  const isMobile = variant === "mobile";

  const wrapperClass = isMobile
    ? "grid-cols-1 md:hidden w-full flex items-end justify-between gap-4"
    : "hidden md:flex md:items-end md:justify-between gap-4";

  const size = isMobile ? 80 : 100;

  return (
    <div className={wrapperClass}>
      <div className="flex flex-col gap-2 w-full">
        <span className="text-base-bg font-bold">Rating</span>
        <div
          className={
            isMobile
              ? "grid grid-cols-2 gap-4"
              : "grid grid-cols-2 lg:flex lg:items-center gap-4 xl:gap-10"
          }
        >
          {scores.map((score) => (
            <CircularRating
              key={score.source}
              source={score.source}
              value={score.value}
              size={size}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
