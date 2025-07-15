import { tmdbFetch } from "../tmdbFetcher";

export const getPopularMovies = async (lang: string, country: string) => {
  try {
    const movies = await tmdbFetch("/movie/popular", {
      language: lang,
      page: 1,
      region: country,
    });
    return movies.results;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    throw error;
  }
};

export const getUpcomingMovies = async (lang: string, country: string) => {
  try {
    const movies = await tmdbFetch("/movie/upcoming", {
      language: lang,
      page: 1,
      region: country,
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

export const getMovieDetailsFromTmdb = async (id: string, lang: string) => {
  try {
    const movieDetails = await tmdbFetch(`/movie/${id}`, {
      append_to_response: "videos,credits",
      language: lang,
    });

    if (!movieDetails) {
      throw new Error("No movie details found for the given id");
    }

    const trailer =
      movieDetails.videos?.results?.find(
        (video: { type: string; site: string }) =>
          video.type === "Trailer" && video.site === "YouTube"
      ) || null;

    return {
      ...movieDetails,
      trailer,
    };
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

export const getMovieDetailsFromOmdb = async (id: string) => {
  try {
    const movieDetails = await fetch(
      `https://www.omdbapi.com/?i=${id}&apikey=${process.env.OMDB_API_KEY}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch movie details from OMDB");
      }
      return response.json();
    });
    if (movieDetails) {
      return movieDetails;
    } else {
      throw new Error("No movie details found for the given id");
    }
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

export const getMovieCredits = async (id: number, lang: string) => {
  try {
    const credits = await tmdbFetch(`/movie/${id}/credits`, {
      language: lang,
    });
    return credits;
  } catch (error) {
    console.error("Error fetching movie credits:", error);
    throw error;
  }
};

export const getMoviesByKeyword = async (query: string, page: number, language: string) => {
  try {
    const movies = await tmdbFetch("/search/movie", {
      query,
      page,
      language
    });
    if (movies && movies.results) {
      return movies;
    } else {
      throw new Error("No results found in the response");
    }
  } catch (error) {
    console.error("Error fetching movies by keyword:", error);
    throw error;
  }
};
