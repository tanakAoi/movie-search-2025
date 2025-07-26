import { getRegionFromCookies } from "@/lib/getRegionFromCookies";
import { ICollection } from "@/types/tmdb";
import { MovieSlider } from "../ui/MovieSlider";
import { getCollectionMovies } from "@/services/specificMovieService";

type MovieCollectionListProps = {
  id: number;
};

export const MovieCollectionList = async ({ id }: MovieCollectionListProps) => {
  const { language } = await getRegionFromCookies();
  const collection: ICollection = await getCollectionMovies(id, language);

  return (
    <div className="">
      <h3 className="text-2xl md:text-3xl font-semibold text-base-bg mb-4">
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
