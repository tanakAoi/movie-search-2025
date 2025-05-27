"use client";

import { useSearchContext } from "@/contexts/SearchContext";
import { getMoviesByWord } from "@/services/movieService";
import { ChangeEvent, FormEvent } from "react";

export const SearchForm = () => {
  const { searchWord, setSearchWord, movies, setMovies } = useSearchContext();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setSearchWord(searchWord);

    const moviesData = await getMoviesByWord(searchWord);
    setMovies(moviesData);
  };

  return (
    <form
      className="relative flex flex-col items-center gap-5 w-full bg-base-fg px-30 pb-10"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        value={movies.length > 0 ? "" : searchWord}
        placeholder="Type here"
        className="w-full bg-base-bg text-base-fg px-6 focus:outline-none focus:border-accent-fg py-4 rounded-full"
        onChange={handleChange}
      />
      <button className="uppercase cursor-pointer py-4 px-8 text-base-bg bg-accent-bg absolute top-0 right-0 rounded-r-full mr-30 font-bold">
        Search
      </button>
    </form>
  );
};
