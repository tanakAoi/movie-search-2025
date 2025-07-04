import { moviedb } from "../tmdb/tmdb";

export const getPopularMovies = async (country: string | null) => {
  try {
    const movies = await moviedb.moviePopular({
      language: "en-US",
      page: 1,
      region: country || "US",
    });
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

export const getUpcomingMovies = async (country: string | null) => {
  try {
    const movies = await moviedb.upcomingMovies({
      language: "en-US",
      page: 1,
      region: country || "US",
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

export const getMovieDetailsFromTmdb = async (id: string) => {
  try {
    const movieDetails = await moviedb.movieInfo({ id });
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

export const getTrailer = async (id: string) => {
  try {
    const videos = await moviedb.movieVideos({ id });
    if (videos && videos.results) {
      const trailer = videos.results.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );
      return trailer || null;
    } else {
      throw new Error("No videos found for the given movie id");
    }
  } catch (error) {
    console.error("Error fetching movie trailer:", error);
    throw error;
  }
};

export const getCredits = async (id: string) => {
  try {
    const credits = await moviedb.movieCredits({ id });
    if (credits) {
      return credits;
    } else {
      throw new Error("No credits found for the given movie id");
    }
  } catch (error) {
    console.error("Error fetching movie credits:", error);
    throw error;
  }
};

export const getMoviesByKeyword = async (query: string, page: number) => {
  try {
    const movies = await moviedb.searchMovie({ query, page });
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
