import Link from "next/link";

export const LinkIcon = ({
  href,
  srText,
  children,
}: {
  href: string;
  srText: string;
  children: React.ReactNode;
}) => {
  return (
    <Link href={href} className="text-base-bg">
      <span className="sr-only">{srText}</span>
      {children}
    </Link>
  );
};
