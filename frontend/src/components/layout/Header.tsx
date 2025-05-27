import { siteConfig } from "@/lib/config";
import Link from "next/link";

export const Header = () => {
  return (
    <header>
      <div className="bg-accent-bg text-base-bg h-16 flex items-center justify-between px-4">
        <Link className="font-lobster text-3xl" href={"/"}>
          <span>{siteConfig.siteName}</span>
        </Link>
      </div>
    </header>
  );
};
