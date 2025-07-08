export const DefaultButton = ({
  text,
  onClick,
  disabled = false,
  className = "",
}: {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 bg-accent-bg text-base-bg hover:bg-base-bg hover:text-accent-bg border-2 border-transparent hover:border-accent-bg rounded cursor-pointer ${className}`}
    >
      {text}
    </button>
  );
};
