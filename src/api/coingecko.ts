import type { Coin, CoinChart } from '../types';
import type { ExchangeRates, CurrencyPair } from '../types';
import { MOCK_COINS, generateMockChartData, MOCK_EXCHANGE_RATES } from './mockData';

const COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3';
const FRANKFURTER_BASE_URL = 'https://api.frankfurter.app';

export class CoinGeckoAPIError extends Error {
  public readonly status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = 'CoinGeckoAPIError';
    this.status = status;
  }
}

export class ExchangeAPIError extends Error {
  public readonly status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = 'ExchangeAPIError';
    this.status = status;
  }
}

export async function fetchTopCoins(limit: number = 20): Promise<Coin[]> {
  try {
    const url = `${COINGECKO_BASE_URL}/coins/markets?vs_currency=usd&per_page=${limit}&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d%2C30d%2C90d%2C180d%2C270d%2C1y`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new CoinGeckoAPIError(`Failed to fetch top coins: ${response.status} ${response.statusText}`, response.status);
    }
    
    const data = await response.json() as Array<{
      id: string;
      symbol: string;
      name: string;
      image?: string;
      current_price: number;
      market_cap: number;
      market_cap_rank?: number;
      total_volume: number;
      high_24h?: number;
      low_24h?: number;
      price_change_24h?: number;
      price_change_percentage_24h?: number;
      price_change_percentage_1h_in_currency?: { usd?: number };
      price_change_percentage_7d_in_currency?: { usd?: number };
      sparkline_in_7d?: { price: number[] };
      circulating_supply?: number;
      total_supply?: number;
      max_supply?: number;
      ath?: { usd?: number };
      ath_change_percentage?: { usd?: number };
      atl?: { usd?: number };
      atl_change_percentage?: { usd?: number };
      last_updated?: string;
    }>;
    
    return data.map((coin) => ({
      id: coin.id,
      symbol: coin.symbol.toLowerCase(),
      name: coin.name,
      image: coin.image,
      current_price: coin.current_price,
      market_cap: coin.market_cap,
      market_cap_rank: coin.market_cap_rank || undefined,
      total_volume: coin.total_volume,
      high_24h: coin.high_24h,
      low_24h: coin.low_24h,
      price_change_24h: coin.price_change_24h,
      price_change_percentage_24h: coin.price_change_percentage_24h,
      price_change_percentage_1h_in_currency: coin.price_change_percentage_1h_in_currency?.usd || undefined,
      price_change_percentage_7d_in_currency: coin.price_change_percentage_7d_in_currency?.usd || undefined,
      sparkline_in_7d: coin.sparkline_in_7d,
      circulating_supply: coin.circulating_supply,
      total_supply: coin.total_supply || undefined,
      max_supply: coin.max_supply || undefined,
      ath: coin.ath?.usd,
      ath_change_percentage: coin.ath_change_percentage?.usd,
      atl: coin.atl?.usd,
      atl_change_percentage: coin.atl_change_percentage?.usd,
      last_updated: coin.last_updated,
    }));
  } catch (error) {
    if (error instanceof CoinGeckoAPIError) {
      throw error;
    }
    // ponytail: fallback to mock data when API is unreachable (CORS, geo-block, etc.)
    console.warn('[FinScope] CoinGecko API unreachable, using mock data:', (error as Error).message);
    return MOCK_COINS.slice(0, limit);
  }
}

export async function fetchCoinChart(coinId: string, days: number = 7): Promise<CoinChart> {
  try {
    const url = `${COINGECKO_BASE_URL}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}&interval=daily`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new CoinGeckoAPIError(`Failed to fetch coin chart: ${response.status} ${response.statusText}`, response.status);
    }
    
    const data = await response.json();
    
    return {
      prices: data.prices,
      market_caps: data.market_caps,
      total_volumes: data.total_volumes,
    };
  } catch (error) {
    if (error instanceof CoinGeckoAPIError) {
      throw error;
    }
    console.warn('[FinScope] CoinGecko chart API unreachable, using mock data:', (error as Error).message);
    return generateMockChartData(days);
  }
}

export async function fetchCoinSearch(query: string): Promise<Coin[]> {
  try {
    const url = `${COINGECKO_BASE_URL}/search?query=${encodeURIComponent(query)}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new CoinGeckoAPIError(`Failed to search coins: ${response.status} ${response.statusText}`, response.status);
    }
    
    const data = await response.json();
    
    return data.coins.slice(0, 10).map((coin: { id: string; symbol: string; name: string; price?: number }) => ({
      id: coin.id,
      symbol: coin.symbol.toLowerCase(),
      name: coin.name,
      current_price: coin.price || 0,
      market_cap: 0,
      total_volume: 0,
    }));
  } catch (error) {
    if (error instanceof CoinGeckoAPIError) {
      throw error;
    }
    console.warn('[FinScope] CoinGecko search API unreachable, using mock data:', (error as Error).message);
    return MOCK_COINS.filter(c => c.name.toLowerCase().includes(query.toLowerCase()) || c.symbol.includes(query.toLowerCase()));
  }
}

export async function fetchExchangeRates(base: string = 'USD'): Promise<ExchangeRates> {
  try {
    const url = `${FRANKFURTER_BASE_URL}/latest?from=${base}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new ExchangeAPIError(`Failed to fetch exchange rates: ${response.status} ${response.statusText}`, response.status);
    }
    
    const data = await response.json();
    return data as ExchangeRates;
  } catch (error) {
    if (error instanceof ExchangeAPIError) {
      throw error;
    }
    console.warn('[FinScope] Frankfurter API unreachable, using mock data:', (error as Error).message);
    return MOCK_EXCHANGE_RATES as ExchangeRates;
  }
}

export async function convertCurrency(from: string, to: string): Promise<CurrencyPair> {
  try {
    const url = `${FRANKFURTER_BASE_URL}/latest?from=${from}&to=${to}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new ExchangeAPIError(`Failed to convert currency: ${response.status} ${response.statusText}`, response.status);
    }
    
    const data = await response.json();
    const rate = data.rates[to];
    
    return {
      from,
      to,
      rate,
      lastUpdated: data.date,
    };
  } catch (error) {
    if (error instanceof ExchangeAPIError) {
      throw error;
    }
    console.warn('[FinScope] Frankfurter convert API unreachable, using mock data:', (error as Error).message);
    const mockRate = MOCK_EXCHANGE_RATES.rates[from.toUpperCase()] && MOCK_EXCHANGE_RATES.rates[to.toUpperCase()]
      ? MOCK_EXCHANGE_RATES.rates[to.toUpperCase()] / MOCK_EXCHANGE_RATES.rates[from.toUpperCase()]
      : 1;
    return {
      from,
      to,
      rate: mockRate,
      lastUpdated: MOCK_EXCHANGE_RATES.date,
    };
  }
}

export async function fetchMarketSummary(topCoins: Coin[]): Promise<{ totalMarketCap: number; total24hVolume: number; btcDominance: number; activeCoins: number }> {
  const totalMarketCap = topCoins.reduce((sum, coin) => sum + (coin.market_cap || 0), 0);
  const total24hVolume = topCoins.reduce((sum, coin) => sum + (coin.total_volume || 0), 0);
  
  let btcDominance = 0;
  try {
    const btcCoin = topCoins.find(coin => coin.id === 'bitcoin');
    const ethCoin = topCoins.find(coin => coin.id === 'ethereum');
    const btcCap = btcCoin?.market_cap || 0;
    const ethCap = ethCoin?.market_cap || 0;
    
    if (totalMarketCap - ethCap > 0) {
      btcDominance = (btcCap / (totalMarketCap - ethCap)) * 100;
    }
  } catch {
    btcDominance = 0;
  }
  
  return {
    totalMarketCap,
    total24hVolume,
    btcDominance,
    activeCoins: topCoins.length,
  };
}