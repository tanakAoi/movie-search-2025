export interface IListItem {
  id: string;
  created_at: string;
  user_id: string;
  movie_id: string;
  Movie: IListMovie;
}

export interface IListMovie {
  created_at: string;
  id: string;
  last_fetched: string;
  poster_path: string;
  title: string;
}
