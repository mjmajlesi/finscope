import { createContext } from 'react';

export interface WatchlistContextValue {
  watchlist: string[];
  toggle: (coinId: string) => void;
  isWatched: (coinId: string) => boolean;
}

export const WatchlistContext = createContext<WatchlistContextValue | null>(null);