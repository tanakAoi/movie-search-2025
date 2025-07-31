"use client";

import { AddWatchlist, Watchlist } from "./icons/MaterialSymbols";
import {
  AddMovieToWatchlist,
  RemoveMovieFromWatchlist,
} from "@/services/userListService";
import { useListItems } from "@/context/ListItemsContext";
import { motion } from "motion/react";
import { toast } from "sonner";

type WatchlistButtonProps = {
  movieId: string;
  title: string;
  posterPath?: string;
};

export const WatchlistButton = ({
  movieId,
  title,
  posterPath = "",
}: WatchlistButtonProps) => {
  const { watchlist, refreshLists } = useListItems();
  const isAdded = watchlist.find((movie) => movie.movie_id === movieId);

  const handleAdd = async () => {
    try {
      await AddMovieToWatchlist({
        id: movieId,
        title,
        posterPath,
      });
      refreshLists();
      toast.success("Movie added to watchlist!");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        if (error.message.includes("401")) {
          toast.error("Please log in to add movies to your watchlist.");
        } else {
          toast.error("Failed to add movie. Please try again later.");
        }
      } else {
        toast.error("An unknown error occurred.");
      }
    }
  };

  const handleRemove = async () => {
    try {
      await RemoveMovieFromWatchlist(movieId);
      refreshLists();
      toast.success("Movie removed from watchlist!");
    } catch (error) {
      console.error("Error removing from watchlist:", error);
      toast.error("Failed to remove movie. Please try again later.");
    }
  };

  return (
    <motion.button
      onClick={isAdded ? handleRemove : handleAdd}
      className="cursor-pointer flex flex-col items-center justify-center gap-2"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      aria-label={isAdded ? "Remove from watchlist" : "Add to watchlist"}
    >
      {isAdded ? (
        <>
          <Watchlist width={36} height={36} fill="#06923E" />
          <span className="text-xs text-base-bg">Remove from watchlist</span>
        </>
      ) : (
        <>
          <AddWatchlist width={36} height={36} fill="var(--color-base-bg)" />
          <span className="text-xs text-base-bg">Add to watchlist</span>
        </>
      )}
    </motion.button>
  );
};
