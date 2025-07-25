export interface IMovie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  error?: string;
}

export interface IMovieDetails extends IMovie {
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string | null;
    backdrop_path: string | null;
  };
  budget: number;
  genres: { id: number; name: string }[];
  homepage: string;
  imdb_id: string;
  origin_counrty: string[];
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: { iso_3166_1: string; name: string }[];
  revenue: number;
  runtime: number;
  spoken_languages: { iso_639_1: string; name: string }[];
  status: string;
  tagline: string;
  scores: IScores[];
  trailer: IVideo;
  credits: ICredit;
}

export interface IScores {
  source: string;
  value: string;
}

export interface ICredit {
  id: number;
  crew: {
    jobLabel: string;
    adult: boolean;
    credit_id: string;
    department: string;
    gender: number;
    id: number;
    job: string;
    known_for_department: string;
    name: string;
    profile_path: string | null;
  }[];
  cast: {
    adult: boolean;
    cast_id: number;
    character: string;
    credit_id: string;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    order: number;
    original_name: string;
    popularity: number;
    profile_path: string | null;
  }[];
}

export interface IVideo {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
}

export interface ICountry {
  iso_3166_1: string;
  english_name: string;
  native_name: string;
}

export interface ILanguage {
  iso_639_1: string;
  english_name: string;
  name: string;
}

export interface IGenre {
  id: number;
  name: string;
}

export interface IPerson {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday: string | null;
  gender: number;
  homepage: string | null;
  id: number;
  known_for_department: string;
  movie_credits: {
    cast: IMovie[];
    crew: IMovie[];
  };
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string | null;
}

export interface ICollection {
  backdrop_path: string | null;
  id: number;
  name: string;
  overview: string;
  parts: IMovie[];
  poster_path: string | null;
}