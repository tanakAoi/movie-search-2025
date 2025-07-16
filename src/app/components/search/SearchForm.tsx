"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { Close, Search } from "../ui/icons/MaterialSymbols";

interface SearchFormProps {
  isHeader?: boolean;
}

export const SearchForm = ({ isHeader }: SearchFormProps) => {
  const router = useRouter();
  const [searchWord, setSearchWord] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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

  return isHeader ? (
    isSearchOpen ? (
      <>
        <div className="items-center justify-end gap-4 w-full hidden md:flex">
          <form
            className="relative flex flex-col items-center gap-5 w-full bg-transparent max-w-xl"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Type here"
              className="w-full bg-base-bg text-base-fg focus:outline-none focus:border-accent-fg rounded-full px-5 py-2"
              onChange={handleChange}
            />
            <button className="cursor-pointer absolute top-1/2 right-3 transform -translate-y-1/2">
              <Search width={20} height={20} fill={"var(--color-accent-bg)"} />
              <span className="sr-only">Search</span>
            </button>
          </form>
          <button
            onClick={() => setIsSearchOpen(false)}
            aria-label="Close search"
          >
            <span className="sr-only">Close search</span>
            <Close width={24} height={24} fill={"var(--color-base-bg)"} />
          </button>
        </div>
        <div className="md:hidden absolute top-16 left-0 w-full bg-base-bg/90 px-4 py-3 z-50">
          <form onSubmit={handleSubmit} className="flex gap-2 w-full">
            <input
              type="text"
              className="flex-1 px-4 py-2 focus:outline-none text-base-fg"
              onChange={handleChange}
              placeholder="Search..."
            />
            <button className="cursor-pointer absolute top-1/2 right-12 transform -translate-y-1/2">
              <Search width={20} height={20} fill={"var(--color-accent-bg)"} />
              <span className="sr-only">Search</span>
            </button>
            <button
              onClick={() => setIsSearchOpen(false)}
              aria-label="Close search"
              className="cursor-pointer absolute top-1/2 right-3 transform -translate-y-1/2"
            >
              <span className="sr-only">Close search</span>
              <Close width={24} height={24} fill={"var(--color-accent-bg)"} />
            </button>
          </form>
        </div>
      </>
    ) : (
      <button
        className="cursor-pointer"
        onClick={() => setIsSearchOpen(!isSearchOpen)}
        aria-label="Search button"
      >
        <span className="sr-only">Search</span>
        <Search width={24} height={24} fill={"var(--color-base-bg)"} />
      </button>
    )
  ) : (
    <form
      className="relative flex flex-col items-center gap-5 w-full bg-transparent max-w-2xl"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Type here"
        className="w-full bg-base-bg text-base-fg focus:outline-none focus:border-accent-fg rounded-full px-6 py-4"
        onChange={handleChange}
      />
      <button className="uppercase cursor-pointer  px-4 py-4 md:px-8 text-base-bg bg-accent-bg absolute top-0 right-0 rounded-r-full font-bold">
        Search
      </button>
    </form>
  );
};
