const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getWatchlist = async () => {
  try {
    const response = await fetch(`${BASE_URL}/watchlist`);
    if (!response.ok) {
      throw new Error(`Error fetching watchlist: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching watchlist:`, error);
    throw error;
  }
};

export const AddMovieToWatchlist = async (movieData: {
  id: string;
  title: string;
  posterPath: string;
}) => {
  try {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ movieData }),
    };

    const response = await fetch(`${BASE_URL}/watchlist`, options);
    const data = await response.json();

    if (!response.ok) {
      throw {
        status: response.status,
        message: data?.error ?? "Unknown error",
      };
    }

    return data;
  } catch (error) {
    console.error(`Error updating watchlist:`, error);
    throw error;
  }
};

export const RemoveMovieFromWatchlist = async (movieId: string) => {
  try {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ movieId }),
    };

    const response = await fetch(`${BASE_URL}/watchlist`, options);

    if (!response.ok) {
      throw new Error(
        `Error removing movie from watchlist: ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error(`Error removing movie from watchlist:`, error);
    throw error;
  }
};

export const getFavorites = async () => {
  try {
    const response = await fetch(`${BASE_URL}/favorites`);
    if (!response.ok) {
      throw new Error(`Error fetching favorites: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching favorites:`, error);
    throw error;
  }
};

export const AddMovieToFavorites = async (movieData: {
  id: string;
  title: string;
  posterPath: string;
}) => {
  try {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ movieData }),
    };

    const response = await fetch(`${BASE_URL}/favorites`, options);
    const data = await response.json();

    if (!response.ok) {
      throw {
        status: response.status,
        message: data?.error ?? "Unknown error",
      };
    }

    return data;
  } catch (error) {
    console.error(`Error updating watchlist:`, error);
    throw error;
  }
};

export const RemoveMovieFromFavorites = async (movieId: string) => {
  try {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ movieId }),
    };

    const response = await fetch(`${BASE_URL}/favorites`, options);

    if (!response.ok) {
      throw new Error(
        `Error removing movie from favorites: ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error(`Error removing movie from favorites:`, error);
    throw error;
  }
};
