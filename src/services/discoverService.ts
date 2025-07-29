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
    const castRes = await fetch(
      `${BASE_URL}/movie/discover?cast=${personId}&lang=${lang}&page=${page}`,
      {
        next: { revalidate: 300 },
      }
    );
    if (!castRes.ok) {
      const text = await castRes.text();
      console.error(
        `Failed to fetch movies with cast ${personId}:`,
        castRes.status,
        text
      );
      throw new Error(`Failed to fetch movies with cast ${personId}`);
    }

    const crewRes = await fetch(
      `${BASE_URL}/movie/discover?crew=${personId}&lang=${lang}&page=${page}`,
      {
        next: { revalidate: 300 },
      }
    );
    if (!crewRes.ok) {
      const text = await crewRes.text();
      console.error(
        `Failed to fetch movies with crew ${personId}:`,
        crewRes.status,
        text
      );
      throw new Error(`Failed to fetch movies with crew ${personId}`);
    }
    return {
      cast: await castRes.json(),
      crew: await crewRes.json(),
    };
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

export const getMoviesByCompany = async (
  companyId: string,
  lang: string,
  page: number
) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/discover?company=${companyId}&lang=${lang}&page=${page}`,
      {
        next: { revalidate: 300 },
      }
    );
    if (!response.ok) {
      const text = await response.text();
      console.error(
        `Failed to fetch movies with company ${companyId}:`,
        response.status,
        text
      );
      throw new Error(`Failed to fetch movies with company ${companyId}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching movies with company ${companyId}:`, error);
    throw error;
  }
};

export const getMoviesByCountry = async (
  countryCode: string,
  lang: string,
  page: number
) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/discover?country=${countryCode}&lang=${lang}&page=${page}`,
      {
        next: { revalidate: 300 },
      }
    );
    if (!response.ok) {
      const text = await response.text();
      console.error(
        `Failed to fetch movies with country ${countryCode}:`,
        response.status,
        text
      );
      throw new Error(`Failed to fetch movies with country ${countryCode}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching movies with country ${countryCode}:`, error);
    throw error;
  }
};
