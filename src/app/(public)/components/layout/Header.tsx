"use client";

import { siteConfig } from "@/lib/config/config";
import Link from "next/link";
import { AccountCircle, Close, Search } from "../ui/icons/MaterialSymbols";
import { useState } from "react";
import { SearchForm } from "../search/SearchForm";

export const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header>
      <div className="bg-accent-bg text-base-bg h-16 flex items-center justify-between px-4">
        <Link className="font-lobster text-3xl" href={"/"}>
          <span>{siteConfig.siteName}</span>
        </Link>
        <div className="flex items-center gap-4">
          {isSearchOpen ? (
            <div className="flex items-center justify-end gap-4 w-full">
              <SearchForm isHeader />
              <button
                onClick={() => setIsSearchOpen(false)}
                aria-label="Close search"
              >
                <span className="sr-only">Close search</span>
                <Close width={24} height={24} fill={"var(--color-base-bg)"} />
              </button>
            </div>
          ) : (
            <button
              className="cursor-pointer"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Search button"
            >
              <span className="sr-only">Search</span>
              <Search width={24} height={24} fill={"var(--color-base-bg)"} />
            </button>
          )}
          <Link className=" text-base-bg" href={"/profile"}>
            <span className="sr-only">Profile</span>
            <AccountCircle width={24} height={24} fill={"var(--color-base-bg)"} />
          </Link>
        </div>
      </div>
    </header>
  );
};
