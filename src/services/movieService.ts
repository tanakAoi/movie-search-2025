const BASE_URL = process.env.API_BASE_URL;

export const getPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular`, {
    next: { revalidate: 300 },
  });
  return response.json();
};

export const getUpcomingMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/upcoming`, {
    next: { revalidate: 300 },
  });
  return response.json();
};

export const getMoviesByKeyword = async (query: string) => {
  const response = await fetch(`${BASE_URL}/movie/search?q=${query}`, {
    next: { revalidate: 300 },
  });
  return response.json();
};
