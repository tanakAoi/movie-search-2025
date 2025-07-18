export type DiscoverMovieOptions = {
  lang: string;
  page: number;
  with_genres?: string;
  with_cast?: string;
  with_keywords?: string;
  [key: string]: string | number | undefined;
};
