"use client";

import { IMovie } from "../models/IMovie";
import { createContext, useContext, useState } from "react";

type SearchContextType = {
  searchWord: string;
  setSearchWord: (word: string) => void;
  movies: IMovie[];
  setMovies: (movies: IMovie[]) => void;
};

const SearchContext = createContext<SearchContextType>({
  searchWord: "",
  setSearchWord: () => {},
  movies: [],
  setMovies: () => {},
});

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchWord, setSearchWord] = useState<string>("");
  const [movies, setMovies] = useState<IMovie[]>([]);

  return (
    <SearchContext.Provider
      value={{ searchWord, setSearchWord, movies, setMovies }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => useContext(SearchContext);
