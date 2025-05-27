import { IMovie } from "./IMovie";

export interface IMovieExt extends IMovie {
    Rated: string
    Runtime: string
    Genre: string
    Director: string
    Actors: string
    Plot: string
    imdbRating: string
}