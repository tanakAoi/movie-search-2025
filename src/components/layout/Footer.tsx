import { siteConfig } from "@/lib/config/config";

export const Footer = () => {
  return (
    <footer className="w-full p-4 bg-base-fg text-base-bg">
      <div className="text-xs text-accent-bg-fixed flex justify-between items-center">
        <p className="">
          &copy; {new Date().getFullYear()} {siteConfig.siteName}. All rights
          reserved.
        </p>
        <p>
          This product uses the{" "}
          <a
            href="https://www.themoviedb.org/"
            target="_blank"
            className="underline"
          >
            TMDB
          </a>{" "}
          API but is not endorsed or certified by TMDB.
        </p>
      </div>
    </footer>
  );
};
