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

export const getMoviesByQuery = async (
  query: string,
  page: number,
  lang: string
) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/search?q=${query}&page=${page}&lang=${lang}`,
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

export const getGenres = async (lang: string) => {
  try {
    const response = await fetch(`${BASE_URL}/movie/genres?lang=${lang}`, {
      next: { revalidate: 1800 },
    });
    if (!response.ok) {
      const text = await response.text();
      console.error("Failed to fetch genres:", response.status, text);
      throw new Error("Failed to fetch genres");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching genres:", error);
    throw error;
  }
};

export const getKeywordDetails = async (id: string, lang: string) => {
  try {
    const response = await fetch(`${BASE_URL}/movie/keyword/${id}?lang=${lang}`, {
      next: { revalidate: 300 },
    });
    if (!response.ok) {
      const text = await response.text();
      console.error(`Failed to fetch keyword details for ${id}:`, response.status, text);
      throw new Error(`Failed to fetch keyword details for ${id}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching keyword details for ${id}:`, error);
    throw error;
  }
}

export const getMovieProviders = async (id: number, country: string) => {
  try {
    const response = await fetch(`${BASE_URL}/movie/${id}/providers?country=${country}`, {
      next: { revalidate: 300 },
    });
    if (!response.ok) {
      const text = await response.text();
      console.error(`Failed to fetch providers for movie ${id}:`, response.status, text);
      throw new Error(`Failed to fetch providers for movie ${id}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching providers for movie ${id}:`, error);
    throw error;
  }
}