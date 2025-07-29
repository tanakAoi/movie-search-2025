"use client";

import { Quote } from "@/app/components/movie-details/Quote";
import StarryBackground from "@/app/components/decor/StarryBackground";
import Image from "next/image";
import { useRegion } from "@/context/RegionContext";
import { CountryFlag } from "./icons/CountryFlag";

interface PageHeadingProps {
  title: string;
  type:
    | "movie"
    | "search"
    | "genre"
    | "keyword"
    | "person"
    | "company"
    | "country"
    | "no-results";
  tagline?: string;
  subtitle?: string;
  description?: string;
  imageUrl?: string;
}

export const PageHeading = ({
  title,
  tagline,
  type,
  subtitle,
  description,
  imageUrl,
}: PageHeadingProps) => {
  const { countriesList } = useRegion();

  return (
    <div
      className={`px-8 py-18 md:py-24 relative w-full flex flex-col items-center justify-center text-base-bg z-10 gap-4 ${
        type === "no-results" ? "min-h-screen" : ""
      }`}
    >
      <StarryBackground />

      {subtitle && <span className="text-xl">{subtitle}</span>}

      {imageUrl && type === "person" && (
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

      {imageUrl && type === "company" && (
        <div className="bg-base-fg/40 border border-base-bg/20 rounded p-2 flex items-center gap-3">
          <div className="bg-white/80 p-2 rounded w-[120px] aspect-video flex items-center justify-center">
            <Image
              src={`https://image.tmdb.org/t/p/w158${imageUrl}`}
              alt={title}
              width={120}
              height={120}
              className="object-contain w-full h-full"
            />
          </div>
        </div>
      )}

      {type === "country" && <CountryFlag code={title} size={80} />}

      <h1
        className={`text-4xl md:text-6xl font-bold text-center capitalize ${
          type === "country" ? "uppercase" : ""
        }`}
      >
        {type === "search" || type === "no-results"
          ? `"${title}"`
          : type === "country"
          ? countriesList?.find((c) => c.iso_3166_1 === title)?.native_name ||
            countriesList?.find((c) => c.iso_3166_1 === title)?.english_name ||
            title
          : title}
      </h1>

      {description && (
        <p className="text-base text-center max-w-xl">{description}</p>
      )}

      {tagline && <Quote tagline={tagline} />}
    </div>
  );
};
