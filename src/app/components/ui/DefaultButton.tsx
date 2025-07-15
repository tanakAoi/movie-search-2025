import Link from "next/link";

export const DefaultButton = ({
  text,
  onClick,
  disabled = false,
  className = "",
  type = "button",
  isLink = false,
  href,
  size = "md",
}: {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit";
  isLink?: boolean;
  href?: string;
  size?: "sm" | "md" | "lg";
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={` bg-accent-bg text-base-bg hover:bg-base-bg hover:text-accent-bg border-2 border-transparent hover:border-accent-bg rounded cursor-pointer ${className} ${
        size === "sm"
          ? "text-sm px-2 py-1"
          : size === "lg"
          ? "text-lg px-5 py-3"
          : "text-md px-4 py-2"
      }`}
    >
      {isLink && href ? <Link href={href}>{text}</Link> : text}
    </button>
  );
};
