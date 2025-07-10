const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getPopularMovies = async (lang: string, country: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?lang=${lang}&country=${country}`,
      {
        next: { revalidate: 300 },
      }
    );

    if (!response.ok) {
      const text = await response.text();
      console.error("Failed to fetch popular movies:", response.status, text);
      throw new Error("Failed to fetch popular movies");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    throw error;
  }
};

export const getUpcomingMovies = async (lang: string, country: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/upcoming?lang=${lang}&country=${country}`,
      {
        next: { revalidate: 300 },
      }
    );
    if (!response.ok) {
      const text = await response.text();
      console.error("Failed to fetch upcoming movies:", response.status, text);
      throw new Error("Failed to fetch upcoming movies");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    throw error;
  }
};

export const getMovieDetails = async (id: string, lang: string) => {
  try {
    const response = await fetch(`${BASE_URL}/movie/${id}?lang=${lang}`, {
      next: { revalidate: 300 },
    });
    return await response.json();
  } catch (error) {
    console.error(`Error fetching movie details for id ${id}:`, error);
    throw error;
  }
};

export const getMovieCredits = async (id: number, lang: string) => {
  try {
    const response = await fetch(`${BASE_URL}/movie/${id}/credits?lang=${lang}`, {
      next: { revalidate: 300 },
    });
    return await response.json();
  } catch (error) {
    console.error(`Error fetching movie credits for id ${id}:`, error);
    throw error;
  }
};

export const getMoviesByKeyword = async (query: string, page: number) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/search?q=${query}&page=${page}`,
      {
        next: { revalidate: 300 },
      }
    );
    return await response.json();
  } catch (error) {
    console.error(`Error searching movies with query "${query}":`, error);
    throw error;
  }
};
