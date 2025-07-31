"use client";

import { getFavorites, getWatchlist } from "@/services/userListService";
import { IListItem } from "@/types/list-item";
import { useSession } from "next-auth/react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type ListItemsContextType = {
  watchlist: IListItem[];
  favorites: IListItem[];
  refreshLists: () => void;
};

export const ListItemsContext = createContext<ListItemsContextType>({
  watchlist: [],
  favorites: [],
  refreshLists: () => {},
});

export const ListItemsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [watchlist, setWatchlist] = useState<IListItem[]>([]);
  const [favorites, setFavorites] = useState<IListItem[]>([]);
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";

  const refreshLists = useCallback(async () => {
    if (!isLoggedIn) return;

    try {
      const wl = await getWatchlist();
      const fav = await getFavorites();
      setWatchlist(wl);
      setFavorites(fav);
    } catch (e) {
      console.error("Failed to load user lists", e);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    refreshLists();
  }, [refreshLists]);

  return (
    <ListItemsContext.Provider value={{ watchlist, favorites, refreshLists }}>
      {children}
    </ListItemsContext.Provider>
  );
};

export const useListItems = () => useContext(ListItemsContext);
