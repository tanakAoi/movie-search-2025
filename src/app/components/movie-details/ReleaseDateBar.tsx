export const ReleaseDateBar = ({ date }: { date: string }) => {
  return (
    <p className="text-center text-base-fg bg-base-bg/75 p-4 w-full">
      This movie will be released on{" "}
      <span className="font-bold text-accent-bg">
        {new Date(date).toLocaleDateString()}
      </span>
      .
    </p>
  );
};
