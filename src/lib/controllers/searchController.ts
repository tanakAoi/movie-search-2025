import { tmdbFetch } from "../tmdbFetcher";

export const getMoviesByQuery = async (
  query: string,
  page: number,
  language: string
) => {
  try {
    const movies = await tmdbFetch("/search/movie", {
      query,
      page,
      language,
    });

    if (!movies) {
      throw new Error("No results found in the response");
    }

    return movies;
  } catch (error) {
    console.error("Error fetching movies by query:", error);
    throw error;
  }
};
