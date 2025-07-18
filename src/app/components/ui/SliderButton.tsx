import { ChevronLeft } from "./icons/MaterialSymbols";

type SliderButtonProps = {
  onClick: () => void;
  direction: "left" | "right";
  className?: string;
};
export const SliderButton = ({
  onClick,
  direction,
  className,
}: SliderButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`absolute top-1/2 -translate-y-1/2 z-10 bg-base-bg/60 rounded-full p-2 ${
        direction === "left" ? "-left-5" : "-right-5 rotate-180"
      } ${className}`}
    >
      <ChevronLeft width={32} height={32} fill={"var(--color-base-fg)"} />
    </button>
  );
};
