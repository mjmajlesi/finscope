import { useState, useCallback, useMemo } from 'react';

const WATCHLIST_KEY = 'finscope_watchlist';

function getInitialWatchlist(): string[] {
  try {
    const stored = localStorage.getItem(WATCHLIST_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    console.error('Failed to parse watchlist from localStorage');
  }
  return [];
}

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState<string[]>(getInitialWatchlist);

  const toggle = useCallback((coinId: string) => {
    setWatchlist((prev) => {
      let updated: string[];
      if (prev.includes(coinId)) {
        updated = prev.filter((id) => id !== coinId);
      } else {
        updated = [...prev, coinId];
      }
      try {
        localStorage.setItem(WATCHLIST_KEY, JSON.stringify(updated));
      } catch {
        console.error('Failed to save watchlist to localStorage');
      }
      return updated;
    });
  }, []);

  const watchlistSet = useMemo(() => new Set(watchlist), [watchlist]);

  const isWatched = useCallback(
    (coinId: string) => {
      return watchlistSet.has(coinId);
    },
    [watchlistSet]
  );

  return { watchlist, toggle, isWatched };
}