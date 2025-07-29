type CountryFlagProps = {
  code: string;
  name?: string;
  size?: number;
};

export const CountryFlag = ({ code, name, size = 50 }: CountryFlagProps) => {
  const lowerCode = code.toLowerCase();
  const flagUrl = `https://flagcdn.com/${lowerCode}.svg`;

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="rounded-sm overflow-hidden aspect-[5/3]"
        style={{ width: `${size}px` }}
      >
        <img
          src={flagUrl}
          alt={`${code} flag`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      {name && (
        <span
          className="text-[10px] text-center leading-tight break-words"
          style={{ maxWidth: `${size}px` }}
        >
          {name}
        </span>
      )}
    </div>
  );
};
