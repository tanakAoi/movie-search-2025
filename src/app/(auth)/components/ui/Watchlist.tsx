"use client";

import { Container } from "@/app/components/layout/Container";
import { MovieGrid } from "@/app/components/ui/MovieGrid";
import { PageHeading } from "@/app/components/ui/PageHeading";
import Loading from "@/app/loading";
import { useListItems } from "@/context/ListItemsContext";

export const Watchlist = () => {
  const { watchlist } = useListItems();

  if (!watchlist) {
    return <Loading />;
  }

  return (
    <div className="bg-base-fg text-base-bg">
      <PageHeading type="movie" title={"Watchlist"} />
      <Container>
        {watchlist.length > 0 ? (
          <MovieGrid movies={watchlist.map((item) => item.Movie)} />
        ) : (
          <div className="flex flex-col items-center justify-center h-64">
            <p>Your watchlist is empty.</p>
          </div>
        )}
      </Container>
    </div>
  );
};
