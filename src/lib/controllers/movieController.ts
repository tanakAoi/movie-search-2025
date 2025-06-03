import { moviedb } from "../tmdb/tmdb";

export const getPopularMovies = async () => {
  try {
    const movies = await moviedb.moviePopular();
    if (movies && movies.results) {
      return movies.results;
    } else {
      throw new Error("No results found in the response");
    }
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    throw error;
  }
};

export const getUpcomingMovies = async () => {
  try {
    const movies = await moviedb.upcomingMovies({
      language: "en-US",
      page: 1,
      region: "US",
    });
    if (movies && movies.results) {
      return movies.results;
    } else {
      throw new Error("No results found in the response");
    }
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    throw error;
  }
};

export const getMoviesByKeyword = async (query: string) => {
  try {
    const movies = await moviedb.searchMovie({ query });
    if (movies && movies.results) {
      return movies.results;
    } else {
      throw new Error("No results found in the response");
    }
  } catch (error) {
    console.error("Error fetching movies by keyword:", error);
    throw error;
  }
};
