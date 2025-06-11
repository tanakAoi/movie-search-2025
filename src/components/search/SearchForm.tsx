"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

export const SearchForm = () => {
  const router = useRouter();
  const [searchWord, setSearchWord] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!searchWord.trim()) {
      return;
    }
    router.push(`/search?query=${encodeURIComponent(searchWord)}`);
  };

  return (
    <form
      className="relative flex flex-col items-center gap-5 max-w-2xl w-full bg-transparent"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Type here"
        className="w-full bg-base-bg text-base-fg px-6 focus:outline-none focus:border-accent-fg py-4 rounded-full"
        onChange={handleChange}
      />
      <button className="uppercase cursor-pointer  px-4 py-4 md:px-8 text-base-bg bg-accent-bg absolute top-0 right-0 rounded-r-full font-bold">
        Search
      </button>
    </form>
  );
};
