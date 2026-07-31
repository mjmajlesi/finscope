import { useState, useEffect, useCallback } from 'react';
import type { CoinChart } from '../types';
import { fetchCoinChart } from '../api/coingecko';

export function useCoinChart(coinId: string, days: number = 7) {
  const [data, setData] = useState<CoinChart | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!coinId) return;
    
    setLoading(true);
    setError(null);
    try {
      const chartData = await fetchCoinChart(coinId, days);
      // fetchCoinChart is a function that fetches the chart data for a specific coin and number of days from the CoinGecko API.
      setData(chartData);
    } catch (err) {
      setError((err as Error).message || `Failed to fetch chart for ${coinId}`);
    } finally {
      setLoading(false);
    }
  }, [coinId, days]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
