import Link from "next/link";
import { siteConfig } from "../lib/config";


export const Header = () => {
  return (
    <header>
      <div className="bg-zinc-300">
        <div className="flex-1">
          <Link className="btn btn-ghost text-xl" href={"/"}>
            {siteConfig.siteName}
          </Link>
        </div>
{/*         <div className="flex-none">
          <ul className="menu menu-horizontal px-1 flex gap-2">
            <li>
              <Link href={"/"} className="text-base">Home</Link>
            </li>
            <li>
              <Link href={"/movie"} className="text-base">Movie</Link>
            </li>
          </ul>
        </div> */}
      </div>
    </header>
  );
};
