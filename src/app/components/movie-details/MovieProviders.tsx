import { IMovieProvider } from "@/types/tmdb";
import Link from "next/link";
import Image from "next/image";

type IMovieProvidersProps = {
  providers: IMovieProvider;
};

export const MovieProviders = ({ providers }: IMovieProvidersProps) => {
  return (
    <div className="flex flex-col gap-3 text-base-bg">
      {providers.flatrate?.length && providers.flatrate.length > 0 && (
        <div>
          <h3 className="font-semibold mb-2">Watch</h3>
          <ul className="flex flex-wrap gap-1">
            {providers.flatrate.map((provider) => (
              <li
                key={provider.provider_id}
                className="text-[11px] flex flex-col gap-1.5 items-center w-16 text-center break-words"
              >
                <Image
                  width={92}
                  height={92}
                  src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                  alt={provider.provider_name}
                  className="inline-block w-12 h-12 rounded-md aspect-square object-cover"
                />
                {provider.provider_name}
              </li>
            ))}
          </ul>
        </div>
      )}
      {providers.buy?.length && providers.buy.length > 0 && (
        <div>
          <h3 className="font-semibold mb-2">Buy</h3>
          <ul className="flex flex-wrap gap-1">
            {providers.buy.map((provider) => (
              <li
                key={provider.provider_id}
                className="text-[11px] flex flex-col gap-1.5 items-center w-16 text-center break-words"
              >
                <Image
                  width={92}
                  height={92}
                  src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                  alt={provider.provider_name}
                  className="inline-block w-12 h-12 rounded-md aspect-square"
                />
                {provider.provider_name}
              </li>
            ))}
          </ul>
        </div>
      )}
      {providers.rent?.length && providers.rent.length > 0 && (
        <div>
          <h3 className="font-semibold mb-2">Rent</h3>
          <ul className="flex flex-wrap gap-1">
            {providers.rent.map((provider) => (
              <li
                key={provider.provider_id}
                className="text-[11px] flex flex-col gap-1.5 items-center w-16 text-center break-words"
              >
                <Image
                  width={92}
                  height={92}
                  src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                  alt={provider.provider_name}
                  className="inline-block w-12 h-12 rounded-md aspect-square"
                />
                {provider.provider_name}
              </li>
            ))}
          </ul>
        </div>
      )}
      <p className="text-xs text-base-bg/75 mt-4">
        Watch provider data © powered by{" "}
        <Link
          href="https://www.justwatch.com"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          JustWatch
        </Link>
        .
      </p>
    </div>
  );
};
