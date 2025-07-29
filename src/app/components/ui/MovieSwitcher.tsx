"use client";

import { useState } from "react";
import { MovieGrid } from "@/app/components/ui/MovieGrid";
import { Pagination } from "@/app/components/ui/Pagination";
import { IMovie } from "@/types/tmdb";
import { useRouter, useSearchParams } from "next/navigation";

type MovieSwitcherProps = {
  cast: IMovie[];
  crew: IMovie[];
  castPage: number;
  crewPage: number;
  castTotalPages: number;
  crewTotalPages: number;
  id: string;
};

export const MovieSwitcher = ({
  cast,
  crew,
  castPage,
  crewPage,
  castTotalPages,
  crewTotalPages,
  id,
}: MovieSwitcherProps) => {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get("tab") as "cast" | "crew") ?? "cast";
  const [activeTab, setActiveTab] = useState<"cast" | "crew">(initialTab);

  const router = useRouter();

  const handleTabChange = (tab: "cast" | "crew") => {
    setActiveTab(tab);
    const params = new URLSearchParams(searchParams);
    params.set("tab", tab);
    params.set("page", "1");
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const movies = activeTab === "cast" ? cast : crew;

  return (
    <>
      <div className="flex gap-4 mb-4">
        <button
          className={`px-4 py-2 rounded disabled:opacity-40 ${
            activeTab === "cast" ? "bg-accent-bg text-base-bg" : "bg-base-fg/75"
          }`}
          disabled={castTotalPages === 0}
          onClick={() => handleTabChange("cast")}
        >
          Appearances
        </button>
        <button
          className={`px-4 py-2 rounded disabled:opacity-40 ${
            activeTab === "crew" ? "bg-accent-bg text-base-bg" : "bg-base-fg/75"
          }`}
          disabled={crewTotalPages === 0}
          onClick={() => handleTabChange("crew")}
        >
          Works
        </button>
      </div>
      <MovieGrid movies={movies} />
      <Pagination
        page={activeTab === "cast" ? castPage : crewPage}
        totalPages={activeTab === "cast" ? castTotalPages : crewTotalPages}
        type="person"
        id={id}
      />
    </>
  );
};
