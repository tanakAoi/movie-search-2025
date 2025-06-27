import { Quote } from "@/app/(public)/components/movie-details/Quote";
import StarryBackground from "@/app/(public)/components/decor/StarryBackground";

interface MovieTitleProps {
  title: string;
  tagline?: string;
}

export const MovieTitle = ({ title, tagline }: MovieTitleProps) => {
  return (
    <div className="py-18 md:py-24 relative w-full flex flex-col items-center justify-center gap-4 text-base-bg z-10">
      <StarryBackground />
      <h1 className="text-5xl font-bold text-center">{title}</h1>
      {tagline && <Quote tagline={tagline} />}
    </div>
  );
};
