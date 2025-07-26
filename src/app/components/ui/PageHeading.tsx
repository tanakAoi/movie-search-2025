import { Quote } from "@/app/components/movie-details/Quote";
import StarryBackground from "@/app/components/decor/StarryBackground";
import Image from "next/image";

interface PageHeadingProps {
  title: string;
  type: "movie" | "search" | "genre" | "keyword" | "person" | "no-results";
  tagline?: string;
  subtitle?: string;
  description?: string;
  pageInfo?: { page: number; totalPages: number };
  imageUrl?: string;
}

export const PageHeading = ({
  title,
  tagline,
  type,
  subtitle,
  description,
  pageInfo,
  imageUrl,
}: PageHeadingProps) => {
  return (
    <div
      className={`px-8 py-18 md:py-24 relative w-full flex flex-col items-center justify-center text-base-bg z-10 gap-4 ${
        type === "no-results" ? "min-h-screen" : ""
      }`}
    >
      <StarryBackground />

      {subtitle && <span className="text-xl">{subtitle}</span>}

      {imageUrl && (
        <figure className="ring-4 ring-accent-bg rounded-full p-1 mb-4 shadow-[0_0_20px_rgba(256, 256, 256, 0.4)]">
          <Image
            width={150}
            height={150}
            src={imageUrl}
            alt={title}
            className="aspect-square rounded-full object-cover"
          />
        </figure>
      )}

      <h1 className="text-6xl font-bold text-center">
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
