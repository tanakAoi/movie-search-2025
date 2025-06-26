const BASE_URL = process.env.API_BASE_URL;

export const getPopularMovies = async () => {
  try {
    const response = await fetch(`${BASE_URL}/movie/popular`, {
      next: { revalidate: 300 },
    });
    return await response.json();
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    throw error;
  }
};

export const getUpcomingMovies = async () => {
  try {
    const response = await fetch(`${BASE_URL}/movie/upcoming`, {
      next: { revalidate: 300 },
    });
    return await response.json();
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    throw error;
  }
};

export const getMovieDetails = async (id: string) => {
  try {
    const response = await fetch(`${BASE_URL}/movie/${id}`, {
      next: { revalidate: 300 },
    });
    return await response.json();
  } catch (error) {
    console.error(`Error fetching movie details for id ${id}:`, error);
    throw error;
  }
};

export const getTrailer = async (id: number) => {
  try {
    const response = await fetch(`${BASE_URL}/movie/${id}/trailer`, {
      next: { revalidate: 300 },
    });
    return await response.json();
  } catch (error) {
    console.error(`Error fetching trailer for id ${id}:`, error);
    throw error;
  }
};

export const getCredits = async (id: number) => {
  try {
    const response = await fetch(`${BASE_URL}/movie/${id}/credits`, {
      next: { revalidate: 300 },
    });
    return await response.json();
  } catch (error) {
    console.error(`Error fetching credits for id ${id}:`, error);
    throw error;
  }
};

export const getMoviesByKeyword = async (query: string, page: number) => {
  try {
    const response = await fetch(`${BASE_URL}/movie/search?q=${query}&page=${page}`, {
      next: { revalidate: 300 },
    });
    return await response.json();
  } catch (error) {
    console.error(`Error searching movies with query "${query}":`, error);
    throw error;
  }
};
