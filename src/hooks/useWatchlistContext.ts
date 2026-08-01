import { useContext } from 'react';
import { WatchlistContext } from '../context/WatchlistContext';

export function useWatchlistContext() {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error('useWatchlistContext must be used within a WatchlistProvider');
  }
  return context;
}