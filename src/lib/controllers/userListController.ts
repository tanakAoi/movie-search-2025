import { prisma } from "../db/prisma";

export async function getUserWatchlist(userId: string) {
  return await prisma.watchlist.findMany({
    where: { user_id: userId },
    include: {
      Movie: true,
    },
  });
}

export async function addMovieToWatchlist(
  userId: string,
  movieData: {
    id: string;
    title?: string;
    posterPath?: string;
  }
) {
  await prisma.movie.upsert({
    where: { id: movieData.id },
    update: {
      title: movieData.title,
      poster_path: movieData.posterPath,
    },
    create: {
      id: movieData.id,
      title: movieData.title,
      poster_path: movieData.posterPath,
      last_fetched: new Date(),
    },
  });

  try {
    await prisma.watchlist.create({
      data: {
        user_id: userId,
        movie_id: movieData.id,
      },
    });
    return { added: true };
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error adding movie to watchlist:", err.message);
    } else {
      console.error("Unknown error adding movie to watchlist:", err);
    }
    throw err;
  }
}

export async function removeMovieFromWatchlist(
  userId: string,
  movieId: string
) {
  try {
    await prisma.watchlist.deleteMany({
      where: {
        user_id: userId,
        movie_id: movieId,
      },
    });
    return { removed: true };
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error removing movie from watchlist:", err.message);
    } else {
      console.error("Unknown error removing movie from watchlist:", err);
    }
    throw err;
  }
}

export async function getUserFavorites(userId: string) {
  return await prisma.favorite.findMany({
    where: { user_id: userId },
    include: {
      Movie: true,
    },
  });
}

export async function addMovieToFavorites(
  userId: string,
  movieData: {
    id: string;
    title?: string;
    posterPath?: string;
  }
) {
  await prisma.movie.upsert({
    where: { id: movieData.id },
    update: {
      title: movieData.title,
      poster_path: movieData.posterPath,
    },
    create: {
      id: movieData.id,
      title: movieData.title,
      poster_path: movieData.posterPath,
      last_fetched: new Date(),
    },
  });

  try {
    await prisma.favorite.create({
      data: {
        user_id: userId,
        movie_id: movieData.id,
      },
    });
    return { added: true };
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error adding movie to favorites:", err.message);
    } else {
      console.error("Unknown error adding movie to favorites:", err);
    }
    throw err;
  }
}

export async function removeMovieFromFavorites(
  userId: string,
  movieId: string
) {
  try {
    await prisma.favorite.deleteMany({
      where: {
        user_id: userId,
        movie_id: movieId,
      },
    });
    return { removed: true };
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error removing movie from favorites:", err.message);
    } else {
      console.error("Unknown error removing movie from favorites:", err);
    }
    throw err;
  }
}
