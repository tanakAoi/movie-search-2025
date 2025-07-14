"use client";

import { siteConfig } from "@/lib/config";
import Link from "next/link";
import {
  AccountCircle,
  Close,
  Globe,
  Search,
} from "../ui/icons/MaterialSymbols";
import { useState } from "react";
import { SearchForm } from "../search/SearchForm";
import { useRegion } from "@/context/RegionContext";
import { DefaultButton } from "@/app/(auth)/components/ui/DefaultButton";

export const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isRegionSettingsOpen, setIsRegionSettingsOpen] = useState(false);
  const { currentCountry, currentLanguage } = useRegion();

  return (
    <header>
      <div className="bg-accent-bg text-base-bg h-16 flex items-center justify-between px-4 relative">
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
          <button
            onClick={() => setIsRegionSettingsOpen(!isRegionSettingsOpen)}
            aria-label="Region settings"
            className="cursor-pointer"
          >
            <Globe width={24} height={24} fill={"var(--color-base-bg)"} />
          </button>
          {isRegionSettingsOpen && (
            <div className="absolute top-16 right-4 bg-base-bg/90 text-base-fg px-8 py-6 rounded shadow-lg z-99 flex flex-col gap-3">
              <p>
                Country:{" "}
                <span className="font-semibold">
                  {currentCountry?.native_name || "Unknown"}
                </span>
              </p>
              <p>
                Language:{" "}
                <span className="font-semibold">
                  {currentLanguage?.name || "Unknown"}
                </span>
              </p>
              <DefaultButton
                text="Change Settings"
                isLink
                href="/profile"
                size="sm"
              />
            </div>
          )}
          <Link className=" text-base-bg" href={"/profile"}>
            <span className="sr-only">Profile</span>
            <AccountCircle
              width={24}
              height={24}
              fill={"var(--color-base-bg)"}
            />
          </Link>
        </div>
      </div>
    </header>
  );
};
