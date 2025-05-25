import { ChangeEvent, FormEvent, useState } from "react";

export interface ISearchFormProps {
  search: (text: string) => void;
}

export const SearchForm = ({ search }: ISearchFormProps) => {
  const [searchWord, setSearchWord] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    search(searchWord);
    setSearchWord("");
  };

  return (
    <form className="flex flex-col items-center gap-5 pt-24" onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchWord}
        placeholder="Type here"
        className="input input-bordered w-full max-w-xs"
        onChange={handleChange}
      />
      <button className="btn">SEARCH</button>
    </form>
  );
};
