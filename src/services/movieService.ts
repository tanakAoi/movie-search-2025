const BASE_URL = process.env.BASE_URL;

export const getPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/api/movie/popular`);
  return response.json();
};

export const getMoviesByKeyword = async (query: string) => {
  const response = await fetch(`${BASE_URL}/api/movie/search?q=${query}`);
  return response.json();
};