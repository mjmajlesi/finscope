import { useState, useEffect, useCallback } from 'react';
import type { Coin } from '../types';
import { fetchTopCoins } from '../api/coingecko';

export function useMarketData(limit: number = 20) {
  const [data, setData] = useState<Coin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const coins = await fetchTopCoins(limit);
      setData(coins);
    } catch (err) {
      setError((err as Error).message || 'Failed to fetch market data');
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
