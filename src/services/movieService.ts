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
    const response = await fetch(
      `${BASE_URL}/movie/${id}/credits?lang=${lang}`,
      {
        next: { revalidate: 300 },
      }
    );
    return await response.json();
  } catch (error) {
    console.error(`Error fetching movie credits for id ${id}:`, error);
    throw error;
  }
};

export const getMoviesByKeyword = async (
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

/* export const getDiscoverMovies = async (
  options: DiscoverMovieOptions,
  language: string,
  page: number
) => {
  try {
    const query = new URLSearchParams();
    console.log(query);

    for (const key in options) {
      const value = options[key];
      if (value !== undefined) {
        query.append(key === "lang" ? "language" : key, String(value));
      }
    }

    const response = await fetch(
      `${BASE_URL}/movie/discover?${query.toString()}`,
      {
        next: { revalidate: 300 },
      }
    );
    if (!response.ok) {
      const text = await response.text();
      console.error("Failed to fetch discover movies:", response.status, text);
      throw new Error("Failed to fetch discover movies");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching discover movies:", error);
    throw error;
  }
}; */

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

export const getSimilarMovies = async (id: number, lang: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${id}/similar?lang=${lang}`,
      {
        next: { revalidate: 300 },
      }
    );
    if (!response.ok) {
      const text = await response.text();
      console.error("Failed to fetch similar movies:", response.status, text);
      throw new Error("Failed to fetch similar movies");
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching similar movies for id ${id}:`, error);
    throw error;
  }
};

export const getMoviesByGenre = async (
  genreId: string,
  lang: string,
  page: number
) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/discover?genre=${genreId}&lang=${lang}&page=${page}`,
      {
        next: { revalidate: 300 },
      }
    );
    if (!response.ok) {
      const text = await response.text();
      console.error(
        `Failed to fetch movies with genre ${genreId}:`,
        response.status,
        text
      );
      throw new Error(`Failed to fetch movies with genre ${genreId}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching movies with genre ${genreId}:`, error);
    throw error;
  }
};

export const getMoviesByPerson = async (
  personId: string,
  lang: string,
  page: number
) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/discover?person=${personId}&lang=${lang}&page=${page}`,
      {
        next: { revalidate: 300 },
      }
    );
    if (!response.ok) {
      const text = await response.text();
      console.error(
        `Failed to fetch movies with person ${personId}:`,
        response.status,
        text
      );
      throw new Error(`Failed to fetch movies with person ${personId}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching movies with person ${personId}:`, error);
    throw error;
  }
};
