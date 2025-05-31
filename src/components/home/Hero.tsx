import { SearchForm } from "../search/SearchForm";

export const Hero = () => {
  return (
    <>
      <div className="flex flex-col items-center gap-5 w-full bg-base-fg text-base-bg py-10 px-auto">
        <h1 className="text-4xl font-bold font-lobster">Welcome to Movique</h1>
        <p className="text-md">Find your favorite movies and TV shows</p>
      </div>
      <div className="flex items-center">
        <SearchForm />
      </div>
    </>
  );
};
