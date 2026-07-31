export interface Coin {
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
  price_change_percentage_1h_in_currency?: number;
  price_change_percentage_7d_in_currency?: number;
  circulating_supply?: number;
  total_supply?: number;
  max_supply?: number;
  ath?: number;
  ath_change_percentage?: number;
  atl?: number;
  atl_change_percentage?: number;
  last_updated?: string;
}

export interface CoinChart {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

export interface CoinMarketData {
  current_price: { usd: number; eur: number; [key: string]: number };
  market_cap: { usd: number; eur: number; [key: string]: number };
  total_volume: { usd: number; eur: number; [key: string]: number };
  high_24h: { usd: number; eur: number; [key: string]: number };
  low_24h: { usd: number; eur: number; [key: string]: number };
  price_change_24h: number;
  price_change_percentage_24h: number;
  price_change_percentage_1h_in_currency: { usd: number; eur: number; [key: string]: number };
  price_change_percentage_7d_in_currency: { usd: number; eur: number; [key: string]: number };
  circulating_supply: number;
  total_supply?: number;
  max_supply?: number;
  ath: { usd: number; eur: number; [key: string]: number };
  ath_change_percentage: { usd: number; eur: number; [key: string]: number };
  atl: { usd: number; eur: number; [key: string]: number };
  atl_change_percentage: { usd: number; eur: number; [key: string]: number };
  last_updated: string;
}

export interface CoinDetail extends Coin {
  market_data?: CoinMarketData;
  description?: { en: string; fa?: string };
  links?: {
    homepage: string[];
    blockchain_site: string[];
    official_forum_url: string[];
    chat_url: string[];
    announcement_url: string[];
    twitter_screen_name: string;
    facebook_username: string;
    bitcointalk_thread_identifier: string;
    telegram_channel_identifier: string;
    subreddit_url: string;
    repos_url: {
      github: string[];
      bitbucket: string[];
    };
  };
}

export interface ExchangeRates {
  base: string;
  date: string;
  rates: Record<string, number>;
}

export interface CurrencyPair {
  from: string;
  to: string;
  rate: number;
  lastUpdated: string;
}

export interface MarketSummary {
  totalMarketCap: number;
  total24hVolume: number;
  btcDominance: number;
  activeCoins: number;
}

export interface WatchlistItem {
  coinId: string;
  addedAt: string;
}

export type TimeRange = '1d' | '7d' | '30d' | '90d' | '1y';

export const TIME_RANGE_DAYS: Record<TimeRange, number> = {
  '1d': 1,
  '7d': 7,
  '30d': 30,
  '90d': 90,
  '1y': 365,
};

export const FIAT_CURRENCIES = [
  'USD', 'EUR', 'GBP', 'JPY', 'CNY', 'CAD', 'AUD', 'CHF',
  'SEK', 'NOK', 'DKK', 'PLN', 'CZK', 'HUF', 'RON', 'BGN',
  'TRY', 'INR', 'KRW', 'SGD', 'HKD', 'NZD', 'MXN', 'BRL',
  'ZAR', 'PHP', 'THB', 'MYR', 'IDR', 'ILS', 'CLP', 'COP',
  'PEN', 'ARS', 'VND', 'AED', 'SAR', 'QAR', 'KWD', 'BHD'
] as const;

export const POPULAR_CRYPTO = [
  'bitcoin', 'ethereum', 'solana', 'ripple', 'dogecoin',
  'cardano', 'polkadot', 'polygon', 'avalanche-2', 'chainlink',
  'uniswap', 'litecoin', 'bitcoin-cash', 'stellar', 'cosmos',
  'monero', 'algorand', 'vechain', 'filecoin', 'internet-computer'
] as const;

export type FiatCurrency = typeof FIAT_CURRENCIES[number];
export type PopularCrypto = typeof POPULAR_CRYPTO[number];