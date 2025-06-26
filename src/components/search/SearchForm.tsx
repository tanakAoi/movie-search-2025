"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { Search } from "../ui/icons/MaterialSymbols";

interface SearchFormProps {
  isHeader?: boolean;
}

export const SearchForm = ({ isHeader }: SearchFormProps) => {
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
      className={`relative flex flex-col items-center gap-5 w-full bg-transparent ${
        isHeader ? "max-w-lg" : "max-w-2xl"
      }`}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Type here"
        className={`w-full bg-base-bg text-base-fg focus:outline-none focus:border-accent-fg rounded-full ${
          isHeader ? "px-5 py-2" : "px-6 py-4"
        } `}
        onChange={handleChange}
      />
      {isHeader ? (
        <button className="cursor-pointer absolute top-1/2 right-3 transform -translate-y-1/2">
          <Search width={20} height={20} fill={"var(--color-accent-bg)"} />
          <span className="sr-only">Search</span>
        </button>
      ) : (
        <button className="uppercase cursor-pointer  px-4 py-4 md:px-8 text-base-bg bg-accent-bg absolute top-0 right-0 rounded-r-full font-bold">
          Search
        </button>
      )}
    </form>
  );
};
