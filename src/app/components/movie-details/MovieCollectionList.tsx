import { getRegionFromCookies } from "@/lib/getRegionFromCookies";
import { getCollectionMovies } from "@/services/movieService";
import { ICollection } from "@/types/tmdb";
import { MovieSlider } from "../ui/MovieSlider";

type MovieCollectionListProps = {
  id: number;
};

export const MovieCollectionList = async ({ id }: MovieCollectionListProps) => {
  const { language } = await getRegionFromCookies();
  const collection: ICollection = await getCollectionMovies(id, language);

  return (
    <div className="">
      <h3 className="text-3xl font-semibold text-base-bg mb-4">
        {collection.name}
      </h3>
      <MovieSlider
        movies={collection.parts}
        type={"small"}
        sortedByDate={true}
      />
    </div>
  );
};
