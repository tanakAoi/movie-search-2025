export const isReleased = (status: string, releaseDate: string): boolean => {
  return status === "Released" || new Date(releaseDate) <= new Date();
};
