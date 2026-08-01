import type { ReactNode } from 'react';
import { WatchlistContext } from './WatchlistContext';
import { useWatchlist } from '../hooks/useWatchlist';

export function WatchlistProvider({ children }: { children: ReactNode }) {
  const watchlistData = useWatchlist();

  return (
    <WatchlistContext.Provider value={watchlistData}>
      {children}
    </WatchlistContext.Provider>
  );
}