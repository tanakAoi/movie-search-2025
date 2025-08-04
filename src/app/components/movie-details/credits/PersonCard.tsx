import Image from "next/image";

type PersonCardProps = {
  name: string;
  imagePath: string | null;
  label: string;
};

export const PersonCard = ({ name, imagePath, label }: PersonCardProps) => {
  return (
    <div className="flex items-center w-full">
      <figure className="w-[90px] h-[90px] md:w-[120px] md:h-[120px] *:rounded-full p-1 flex-shrink-0 overflow-hidden ring-2 ring-transparent group-hover:ring-base-bg/75 rounded-full transition-all duration-300">
        {imagePath ? (
          <Image
            src={`https://image.tmdb.org/t/p/w185${imagePath}`}
            alt={name}
            width={120}
            height={120}
            className="aspect-square object-cover object-center"
          />
        ) : (
          <span className="bg-accent-bg/95 text-base-bg flex items-center justify-center w-full h-full">
            No Image
          </span>
        )}
      </figure>
      <div className="ml-4">
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-base-bg/75">{label}</p>
      </div>
    </div>
  );
};
