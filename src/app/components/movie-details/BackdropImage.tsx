  type BackdropImageProps = {
    backdropPath: string | null;
  };

  export const BackdropImage = ({ backdropPath }: BackdropImageProps) => {
    const imageUrl = `https://image.tmdb.org/t/p/original${backdropPath}`;

    return (
      <div
        style={{ backgroundImage: `url(${imageUrl})` }}
        className="fixed inset-0 bg-cover bg-center bg-no-repeat saturate-50 brightness-30 -z-10 bg-base-fg/75"
      />
    );
  };
