import { Quote } from "@/app/components/movie-details/Quote";
import StarryBackground from "@/app/components/decor/StarryBackground";

interface PageHeadingProps {
  title: string;
  tagline?: string;
  type: "movie" | "search" | "genre" | "no-results";
  subtitle?: string;
  description?: string;
  pageInfo?: { page: number; totalPages: number };
}

export const PageHeading = ({
  title,
  tagline,
  type,
  subtitle,
  description,
  pageInfo,
}: PageHeadingProps) => {
  return (
    <div
      className={`px-8 py-18 md:py-24 relative w-full flex flex-col items-center justify-center text-base-bg z-10 gap-4 ${
        type === "no-results" ? "min-h-screen" : ""
      }`}
    >
      <StarryBackground />

      {subtitle && <span className="text-xl">{subtitle}</span>}

      <h1 className="text-5xl font-bold text-center">
        {type === "search" || type === "no-results" ? `"${title}"` : title}
      </h1>

      {pageInfo && (
        <p className="text-lg">
          (page {pageInfo.page} of {pageInfo.totalPages})
        </p>
      )}

      {description && (
        <p className="text-base text-center max-w-xl">{description}</p>
      )}

      {tagline && <Quote tagline={tagline} />}
    </div>
  );
};
