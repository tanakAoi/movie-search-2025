"use client";

import { useState, useEffect } from "react";
import { IMovie } from "../models/IMovie";
import { getMoviesByWord } from "../services/movieService";
import { SearchForm } from "./SearchForm";
import { ShowResult } from "./ShowResult";

export const MovieSearch = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [searchWord, setSearchWord] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedMovies = localStorage.getItem("movies");
    const storedSearchWord = localStorage.getItem("search word");

    if (storedMovies) {
      setMovies(JSON.parse(storedMovies));
    }
    if (storedSearchWord) {
      setSearchWord(storedSearchWord);
    }
  }, []);

  const searchMovies = async (word: string) => {
    setIsLoading(true);

    setSearchWord(word);
    localStorage.setItem("search word", word);

    const moviesData = await getMoviesByWord(word);
    setMovies(moviesData);
    localStorage.setItem("movies", JSON.stringify(moviesData));
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen">
      <SearchForm search={searchMovies} />
      <ShowResult
        movies={movies}
        searchWord={searchWord}
        isLoading={isLoading}
      />
    </div>
  );
};
