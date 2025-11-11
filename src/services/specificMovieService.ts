const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getMovieDetails = async (id: string, lang: string) => {
  try {
    const response = await fetch(`${BASE_URL}/movie/${id}?lang=${lang}`, {
      next: { revalidate: 86400 },
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
        next: { revalidate: 86400 },
      }
    );
    return await response.json();
  } catch (error) {
    console.error(`Error fetching movie credits for id ${id}:`, error);
    throw error;
  }
};

export const getSimilarMovies = async (id: number, lang: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${id}/similar?lang=${lang}`,
      {
        next: { revalidate: 86400 },
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

export const getCollectionMovies = async (id: number, lang: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/collection/${id}?lang=${lang}`,
      {
        next: { revalidate: 86400 },
      }
    );
    if (!response.ok) {
      const text = await response.text();
      console.error(
        `Failed to fetch movies for collection ${id}:`,
        response.status,
        text
      );
      throw new Error(`Failed to fetch movies for collection ${id}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching movies for collection ${id}:`, error);
    throw error;
  }
};

export const getMovieKeywords = async (id: number, lang: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${id}/keywords?lang=${lang}`,
      {
        next: { revalidate: 86400 },
      }
    );
    if (!response.ok) {
      const text = await response.text();
      console.error(
        `Failed to fetch keywords for movie ${id}:`,
        response.status,
        text
      );
      throw new Error(`Failed to fetch keywords for movie ${id}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching keywords for movie ${id}:`, error);
    throw error;
  }
};
