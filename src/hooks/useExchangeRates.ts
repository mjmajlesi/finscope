import { useState, useEffect, useCallback, useRef } from 'react';
import type { ExchangeRates, CurrencyPair } from '../types';
import { fetchExchangeRates, convertCurrency } from '../api/coingecko';

export function useExchangeRates(base: string = 'USD') {
  const [rates, setRates] = useState<ExchangeRates | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchExchangeRates(base);
      setRates(data);
    } catch (err) {
      setError((err as Error).message || 'Failed to fetch exchange rates');
    } finally {
      setLoading(false);
    }
  }, [base]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { rates, loading, error, refetch: fetchData };
}

export function useCurrencyConverter(amount: number, from: string, to: string) {
  const [result, setResult] = useState<CurrencyPair | null>(null);
  const [convertedAmount, setConvertedAmount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const latestRequestId = useRef(0);

  const convert = useCallback(async () => {
    if (!amount || amount <= 0 || !from || !to) return;
    if (from === to) {
      setConvertedAmount(amount);
      setResult({
        from,
        to,
        rate: 1,
        lastUpdated: new Date().toISOString(),
      });
      return;
    }

    const requestId = ++latestRequestId.current;
    setLoading(true);
    setError(null);

    try {
      const pair = await convertCurrency(from, to);
      
      // Only update if this is still the latest request
      if (requestId === latestRequestId.current) {
        setResult(pair);
        setConvertedAmount(amount * pair.rate);
      }
    } catch (err) {
      if (requestId === latestRequestId.current) {
        setError((err as Error).message || 'Failed to convert currency');
      }
    } finally {
      if (requestId === latestRequestId.current) {
        setLoading(false);
      }
    }
  }, [amount, from, to]);

  useEffect(() => {
    convert();
  }, [convert]);

  return { result, convertedAmount, loading, error, refetch: convert };
}