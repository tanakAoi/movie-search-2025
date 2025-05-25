import { siteConfig } from "../lib/config";


export const Footer = () => {
  return (
    <footer className="footer items-center p-4 bg-neutral text-neutral-content">
      <aside className="items-center grid-flow-col">
        <p className="text-sm text-accent-bg-fixed">
          &copy; {new Date().getFullYear()} {siteConfig.siteName}. All rights reserved.
        </p>
      </aside>
    </footer>
  );
};
