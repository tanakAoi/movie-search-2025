import Image from "next/image";

type AvatarProps = {
  name: string;
  image?: string | null;
  size: number;
};

export const Avatar = ({ name, image, size }: AvatarProps) => {
  if (image) {
    return (
      <Image
        src={image.replace("s96-c", "s256-c")}
        alt={name}
        width={size}
        height={size}
        className="rounded-full object-cover"
      />
    );
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  const initials = getInitials(name);

  return (
    <div
      className="rounded-full bg-accent-bg text-base-bg flex items-center justify-center font-bold"
      style={{ width: size, height: size, fontSize: size / 2 }}
    >
      {initials}
    </div>
  );
};
