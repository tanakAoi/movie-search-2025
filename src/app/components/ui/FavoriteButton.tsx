"use client";

import { AddFavorite, Favorite } from "./icons/MaterialSymbols";
import {
  AddMovieToFavorites,
  RemoveMovieFromFavorites,
} from "@/services/userListService";
import { useListItems } from "@/context/ListItemsContext";
import { motion } from "motion/react";
import { toast } from "sonner";

type FavoriteButtonProps = {
  movieId: string;
  title: string;
  posterPath?: string;
};

export const FavoriteButton = ({
  movieId,
  title,
  posterPath = "",
}: FavoriteButtonProps) => {
  const { favorites, refreshLists } = useListItems();
  const isAdded = favorites.find((movie) => movie.movie_id === movieId);

  const handleAdd = async () => {
    try {
      await AddMovieToFavorites({
        id: movieId,
        title,
        posterPath,
      });
      refreshLists();
      toast.success("Movie added to favorites!");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        if (error.message.includes("401")) {
          toast.error("Please log in to add movies to your favorites.");
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
      await RemoveMovieFromFavorites(movieId);
      refreshLists();
      toast.success("Movie removed from favorites!");
    } catch (error) {
      console.error("Error removing from favorites:", error);
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
      aria-label={isAdded ? "Remove from favorites" : "Add to favorites"}
    >
      {isAdded ? (
        <>
          <Favorite width={36} height={36} fill="#FF8DA1" />
          <span className="text-xs text-base-bg">Remove from favorites</span>
        </>
      ) : (
        <>
          <AddFavorite width={36} height={36} fill="var(--color-base-bg)" />
          <span className="text-xs text-base-bg">Add to favorites</span>
        </>
      )}
    </motion.button>
  );
};
