import { siteConfig } from "@/lib/config";

export const Footer = () => {
  return (
    <footer className="w-full text-center p-4 bg-base-fg text-base-bg">
      <p className="text-sm text-accent-bg-fixed">
        &copy; {new Date().getFullYear()} {siteConfig.siteName}. All rights
        reserved.
      </p>
    </footer>
  );
};
