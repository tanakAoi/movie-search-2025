import Image from "next/image";

type PosterImageProps = {
  src: string | null | undefined;
  title: string;
  className?: string;
};

export const PosterImage = ({ src, title, className }: PosterImageProps) => {
  if (!src) {
    return (
      <div
        className={`bg-accent-bg text-base-bg w-full h-full flex items-center justify-center rounded-xl max-w-[300px] max-h-[400px] ${className}`}
      >
        No Image Available
      </div>
    );
  }
  return (
    <Image
      src={src}
      alt={title || "Movie Poster"}
      className={`rounded-lg ${className}`}
      width={400}
      height={600}
      priority
    />
  );
};
