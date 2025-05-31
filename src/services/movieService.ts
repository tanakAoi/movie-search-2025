export const getPopularMovies = async () => {
  const response = await fetch("/api/movie/popular");
  return response.json();
};

export const getMoviesByKeyword = async (query: string) => {
  const response = await fetch(`/api/movie/search?q=${query}`);
  return response.json();
};
