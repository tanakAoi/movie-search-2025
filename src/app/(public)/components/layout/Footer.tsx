import { siteConfig } from "@/lib/config/config";

export const Footer = () => {
  return (
    <footer className="w-full px-8 py-4 lg:py-6 bg-base-fg text-base-bg">
      <div className="text-xs text-accent-bg-fixed flex flex-col justify-center items-center lg:items-end text-center lg:text-start gap-3 **:[a]:underline">
        <p className="lg:self-start ">
          &copy; {new Date().getFullYear()} {siteConfig.siteName}. All rights
          reserved.
        </p>
        <div className="flex flex-col gap-3">
          <p>
            Designed and built by{" "}
            <a href={siteConfig.portfolio} target="_blank">
              me
            </a>
            , inspired by{" "}
            <a href="https://www.themoviedb.org/" target="_blank">
              TMDB
            </a>{" "}
            and{" "}
            <a href="https://filmarks.com/" target="_blank">
              Filmarks
            </a>
            .
          </p>
          <p>
            This product uses the{" "}
            <a
              href="https://developer.themoviedb.org/docs/getting-started"
              target="_blank"
            >
              TMDB API
            </a>{" "}
            but is not endorsed or certified by TMDB.
          </p>
        </div>
      </div>
    </footer>
  );
};
