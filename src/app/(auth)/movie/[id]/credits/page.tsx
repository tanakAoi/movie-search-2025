"use client";

import Loading from "@/app/(auth)/loading";
import { Container } from "@/app/(public)/components/layout/Container";
import { CreditMembers } from "@/app/(public)/components/movie-details/credits/CreditMembers";
import { useRegion } from "@/context/RegionContext";
import { getMovieCredits } from "@/services/movieService";
import { ICredit } from "@/types/tmdb";
import { useEffect, useState } from "react";

export default function CastPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { currentLanguage } = useRegion();
  const [credits, setCredits] = useState<ICredit>({
    id: 0,
    cast: [],
    crew: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCredits = async () => {
      setLoading(true);
      const { id } = await params;
      const credits: ICredit = await getMovieCredits(
        Number(id),
        currentLanguage.tmdb_code || ""
      );
      setCredits(credits);
    };
    fetchCredits();
    setLoading(false);
  }, [currentLanguage.tmdb_code, params]);

  const uniqueCrew = [];
  const seenIds = new Set<number>();

  if (credits) {
    for (const crewMember of credits.crew) {
      if (!seenIds.has(crewMember.id)) {
        seenIds.add(crewMember.id);

        const allJobs = credits.crew
          .filter((c) => c.id === crewMember.id)
          .map((c) => c.job);

        const uniqueJobs = Array.from(new Set(allJobs));

        uniqueCrew.push({
          ...crewMember,
          job: uniqueJobs.join(" / "),
        });
      }
    }
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <Container className="flex flex-col gap-16 items-center justify-center">
      <h1 className="text-5xl md:text-6xl font-lobster mt-4">Cast & Crew</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
        <CreditMembers type="cast" members={credits ? credits.cast : []} />
        <CreditMembers type="crew" members={uniqueCrew} />
      </div>
    </Container>
  );
}
