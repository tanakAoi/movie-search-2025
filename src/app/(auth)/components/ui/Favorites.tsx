"use client";

import { Container } from "@/app/components/layout/Container";
import { MovieGrid } from "@/app/components/ui/MovieGrid";
import { PageHeading } from "@/app/components/ui/PageHeading";
import Loading from "@/app/loading";
import { useListItems } from "@/context/ListItemsContext";

export const Favorites = () => {
  const { favorites } = useListItems();

  if (!favorites) {
    return <Loading />;
  }

  return (
    <div className="bg-base-fg text-base-bg">
      <PageHeading type="movie" title={"Favorites"} />
      <Container>
        {favorites.length > 0 ? (
          <MovieGrid movies={favorites.map((item) => item.Movie)} />
        ) : (
          <div className="flex flex-col items-center justify-center h-screen">
            <p>Your favorites list is empty.</p>
          </div>
        )}
      </Container>
    </div>
  );
};
