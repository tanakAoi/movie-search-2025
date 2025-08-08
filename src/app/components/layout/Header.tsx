import { siteConfig } from "@/lib/config";
import Link from "next/link";
import {
  AccountCircle,
  Favorite,
  Watchlist,
} from "../ui/icons/MaterialSymbols";
import { SearchForm } from "../search/SearchForm";
import { RegionModal } from "@/app/components/header/RegionModal";
import { LinkIcon } from "../ui/LinkIcon";

export const Header = () => {
  return (
    <header className="relative">
      <div className="bg-accent-bg text-base-bg h-16 flex items-center justify-between px-4">
        <Link className="font-lobster text-3xl" href={"/"}>
          <span>{siteConfig.siteName}</span>
        </Link>
        <div className="flex items-center gap-4">
          <SearchForm isHeader />
          <RegionModal />
          <LinkIcon href="/watchlist" srText="Watchlist">
            <Watchlist width={24} height={24} fill={"var(--color-base-bg)"} />
          </LinkIcon>
          <LinkIcon href="/favorites" srText="Favorites">
            <Favorite width={24} height={24} fill={"var(--color-base-bg)"} />
          </LinkIcon>
          <LinkIcon href="/profile" srText="Profile">
            <AccountCircle
              width={24}
              height={24}
              fill={"var(--color-base-bg)"}
            />
          </LinkIcon>
        </div>
      </div>
    </header>
  );
};
