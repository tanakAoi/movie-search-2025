const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

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

export const getMoviesByKeyword = async (
  keywordId: string,
  lang: string,
  page: number
) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/discover?keyword=${keywordId}&lang=${lang}&page=${page}`,
      {
        next: { revalidate: 300 },
      }
    );
    if (!response.ok) {
      const text = await response.text();
      console.error(
        `Failed to fetch movies with keyword ${keywordId}:`,
        response.status,
        text
      );
      throw new Error(`Failed to fetch movies with keyword ${keywordId}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching movies with keyword ${keywordId}:`, error);
    throw error;
  }
};