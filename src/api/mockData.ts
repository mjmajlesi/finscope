import type { Coin, CoinChart, ExchangeRates } from '../types';

// ponytail: static mock data, replace with real API when access is restored
export const MOCK_COINS: Coin[] = [
  { id: 'bitcoin', symbol: 'btc', name: 'Bitcoin', current_price: 64500, market_cap: 1270000000000, market_cap_rank: 1, total_volume: 28000000000, price_change_24h: 1200, price_change_percentage_24h: 1.89, price_change_percentage_1h_in_currency: 0.12, price_change_percentage_7d_in_currency: 5.2, sparkline_in_7d: { price: Array.from({length: 168}, (_, i) => 62000 + Math.sin(i/20) * 3000 + i * 15) }, circulating_supply: 19700000, total_supply: 21000000, image: '' },
  { id: 'ethereum', symbol: 'eth', name: 'Ethereum', current_price: 3450, market_cap: 414000000000, market_cap_rank: 2, total_volume: 15000000000, price_change_24h: -45, price_change_percentage_24h: -1.29, price_change_percentage_1h_in_currency: -0.05, price_change_percentage_7d_in_currency: 3.1, sparkline_in_7d: { price: Array.from({length: 168}, (_, i) => 3300 + Math.sin(i/15) * 200 + i * 1) }, circulating_supply: 120000000, image: '' },
  { id: 'tether', symbol: 'usdt', name: 'Tether', current_price: 1.0, market_cap: 110000000000, market_cap_rank: 3, total_volume: 52000000000, price_change_24h: 0.001, price_change_percentage_24h: 0.01, sparkline_in_7d: { price: Array.from({length: 168}, () => 1) }, circulating_supply: 110000000000, image: '' },
  { id: 'binancecoin', symbol: 'bnb', name: 'BNB', current_price: 580, market_cap: 87000000000, market_cap_rank: 4, total_volume: 1800000000, price_change_24h: 8, price_change_percentage_24h: 1.40, price_change_percentage_1h_in_currency: 0.3, price_change_percentage_7d_in_currency: 4.5, sparkline_in_7d: { price: Array.from({length: 168}, (_, i) => 560 + Math.sin(i/18) * 30 + i * 0.1) }, circulating_supply: 150000000, image: '' },
  { id: 'solana', symbol: 'sol', name: 'Solana', current_price: 145, market_cap: 67000000000, market_cap_rank: 5, total_volume: 2400000000, price_change_24h: 5.2, price_change_percentage_24h: 3.73, price_change_percentage_1h_in_currency: 0.8, price_change_percentage_7d_in_currency: 12.4, sparkline_in_7d: { price: Array.from({length: 168}, (_, i) => 130 + Math.sin(i/12) * 15 + i * 0.1) }, circulating_supply: 440000000, image: '' },
  { id: 'ripple', symbol: 'xrp', name: 'XRP', current_price: 0.62, market_cap: 34000000000, market_cap_rank: 6, total_volume: 1200000000, price_change_24h: -0.01, price_change_percentage_24h: -1.59, price_change_percentage_1h_in_currency: -0.2, price_change_percentage_7d_in_currency: 2.1, sparkline_in_7d: { price: Array.from({length: 168}, (_, i) => 0.58 + Math.sin(i/16) * 0.04 + i * 0.0002) }, circulating_supply: 55000000000, image: '' },
  { id: 'usd-coin', symbol: 'usdc', name: 'USDC', current_price: 1.0, market_cap: 33000000000, market_cap_rank: 7, total_volume: 7000000000, price_change_24h: 0, price_change_percentage_24h: 0, sparkline_in_7d: { price: Array.from({length: 168}, () => 1) }, circulating_supply: 33000000000, image: '' },
  { id: 'staked-ether', symbol: 'steth', name: 'Lido Staked Ether', current_price: 3440, market_cap: 14000000000, market_cap_rank: 8, total_volume: 45000000, price_change_24h: -48, price_change_percentage_24h: -1.38, price_change_percentage_1h_in_currency: -0.1, price_change_percentage_7d_in_currency: 2.9, sparkline_in_7d: { price: Array.from({length: 168}, (_, i) => 3290 + Math.sin(i/15) * 200 + i * 1) }, circulating_supply: 9700000, image: '' },
  { id: 'cardano', symbol: 'ada', name: 'Cardano', current_price: 0.45, market_cap: 16000000000, market_cap_rank: 9, total_volume: 420000000, price_change_24h: -0.008, price_change_percentage_24h: -1.75, price_change_percentage_1h_in_currency: -0.1, price_change_percentage_7d_in_currency: 5.6, sparkline_in_7d: { price: Array.from({length: 168}, (_, i) => 0.40 + Math.sin(i/14) * 0.05 + i * 0.0003) }, circulating_supply: 35600000000, image: '' },
  { id: 'dogecoin', symbol: 'doge', name: 'Dogecoin', current_price: 0.15, market_cap: 22000000000, market_cap_rank: 10, total_volume: 980000000, price_change_24h: 0.003, price_change_percentage_24h: 2.04, price_change_percentage_1h_in_currency: 0.4, price_change_percentage_7d_in_currency: 8.2, sparkline_in_7d: { price: Array.from({length: 168}, (_, i) => 0.14 + Math.sin(i/13) * 0.02 + i * 0.0001) }, circulating_supply: 144000000000, image: '' },
  { id: 'polkadot', symbol: 'dot', name: 'Polkadot', current_price: 7.2, market_cap: 10000000000, market_cap_rank: 11, total_volume: 280000000, price_change_24h: 0.15, price_change_percentage_24h: 2.13, price_change_percentage_1h_in_currency: 0.2, price_change_percentage_7d_in_currency: 6.4, sparkline_in_7d: { price: Array.from({length: 168}, (_, i) => 6.8 + Math.sin(i/17) * 0.5 + i * 0.003) }, circulating_supply: 1400000000, image: '' },
  { id: 'polygon', symbol: 'matic', name: 'Polygon', current_price: 0.72, market_cap: 7200000000, market_cap_rank: 12, total_volume: 350000000, price_change_24h: -0.02, price_change_percentage_24h: -2.70, price_change_percentage_1h_in_currency: -0.3, price_change_percentage_7d_in_currency: 1.8, sparkline_in_7d: { price: Array.from({length: 168}, (_, i) => 0.68 + Math.sin(i/15) * 0.05 + i * 0.0002) }, circulating_supply: 10000000000, image: '' },
  { id: 'avalanche-2', symbol: 'avax', name: 'Avalanche', current_price: 35.5, market_cap: 13500000000, market_cap_rank: 13, total_volume: 420000000, price_change_24h: 1.2, price_change_percentage_24h: 3.50, price_change_percentage_1h_in_currency: 0.5, price_change_percentage_7d_in_currency: 9.2, sparkline_in_7d: { price: Array.from({length: 168}, (_, i) => 33 + Math.sin(i/14) * 3 + i * 0.015) }, circulating_supply: 380000000, image: '' },
  { id: 'chainlink', symbol: 'link', name: 'Chainlink', current_price: 14.8, market_cap: 8700000000, market_cap_rank: 14, total_volume: 310000000, price_change_24h: 0.45, price_change_percentage_24h: 3.14, price_change_percentage_1h_in_currency: 0.3, price_change_percentage_7d_in_currency: 7.8, sparkline_in_7d: { price: Array.from({length: 168}, (_, i) => 13.5 + Math.sin(i/16) * 1.5 + i * 0.008) }, circulating_supply: 590000000, image: '' },
  { id: 'uniswap', symbol: 'uni', name: 'Uniswap', current_price: 7.5, market_cap: 5700000000, market_cap_rank: 15, total_volume: 180000000, price_change_24h: 0.2, price_change_percentage_24h: 2.74, price_change_percentage_1h_in_currency: 0.1, price_change_percentage_7d_in_currency: 4.3, sparkline_in_7d: { price: Array.from({length: 168}, (_, i) => 7.0 + Math.sin(i/18) * 0.6 + i * 0.003) }, circulating_supply: 750000000, image: '' },
  { id: 'litecoin', symbol: 'ltc', name: 'Litecoin', current_price: 83, market_cap: 6200000000, market_cap_rank: 16, total_volume: 420000000, price_change_24h: 1.5, price_change_percentage_24h: 1.84, price_change_percentage_1h_in_currency: 0.1, price_change_percentage_7d_in_currency: 3.9, sparkline_in_7d: { price: Array.from({length: 168}, (_, i) => 80 + Math.sin(i/17) * 4 + i * 0.018) }, circulating_supply: 74000000, image: '' },
  { id: 'bitcoin-cash', symbol: 'bch', name: 'Bitcoin Cash', current_price: 460, market_cap: 9100000000, market_cap_rank: 17, total_volume: 290000000, price_change_24h: 8.5, price_change_percentage_24h: 1.88, price_change_percentage_1h_in_currency: 0.2, price_change_percentage_7d_in_currency: 6.1, sparkline_in_7d: { price: Array.from({length: 168}, (_, i) => 440 + Math.sin(i/15) * 25 + i * 0.12) }, circulating_supply: 19700000, image: '' },
  { id: 'stellar', symbol: 'xlm', name: 'Stellar', current_price: 0.11, market_cap: 3200000000, market_cap_rank: 18, total_volume: 85000000, price_change_24h: -0.002, price_change_percentage_24h: -1.79, price_change_percentage_1h_in_currency: -0.1, price_change_percentage_7d_in_currency: 2.5, sparkline_in_7d: { price: Array.from({length: 168}, (_, i) => 0.10 + Math.sin(i/14) * 0.015 + i * 0.00006) }, circulating_supply: 29000000000, image: '' },
  { id: 'cosmos', symbol: 'atom', name: 'Cosmos', current_price: 8.5, market_cap: 3300000000, market_cap_rank: 19, total_volume: 150000000, price_change_24h: 0.3, price_change_percentage_24h: 3.66, price_change_percentage_1h_in_currency: 0.4, price_change_percentage_7d_in_currency: 7.1, sparkline_in_7d: { price: Array.from({length: 168}, (_, i) => 8.0 + Math.sin(i/16) * 0.6 + i * 0.003) }, circulating_supply: 390000000, image: '' },
  { id: 'monero', symbol: 'xmr', name: 'Monero', current_price: 165, market_cap: 3050000000, market_cap_rank: 20, total_volume: 95000000, price_change_24h: 2.5, price_change_percentage_24h: 1.54, price_change_percentage_1h_in_currency: 0.1, price_change_percentage_7d_in_currency: 5.3, sparkline_in_7d: { price: Array.from({length: 168}, (_, i) => 158 + Math.sin(i/17) * 8 + i * 0.04) }, circulating_supply: 18500000, image: '' },
];

export function generateMockChartData(days: number = 7): CoinChart {
  const now = Date.now();
  const points = days <= 1 ? 24 : days;
  const interval = days <= 1 ? 3600000 : 86400000;
  const basePrice = 64500;
  const volatility = basePrice * 0.03;

  const prices: [number, number][] = [];
  const market_caps: [number, number][] = [];
  const total_volumes: [number, number][] = [];

  for (let i = 0; i < points; i++) {
    const time = now - (points - i) * interval;
    const variation = Math.sin(i / 3) * volatility + (Math.random() - 0.5) * volatility * 0.3;
    const price = basePrice + variation + i * (basePrice * 0.001);
    
    prices.push([time, price]);
    market_caps.push([time, price * 19700000]);
    total_volumes.push([time, 25000000000 + Math.sin(i / 5) * 5000000000]);
  }

  return { prices, market_caps, total_volumes };
}

export const MOCK_EXCHANGE_RATES: ExchangeRates = {
  base: 'USD',
  date: new Date().toISOString().split('T')[0],
  rates: {
    EUR: 0.92, GBP: 0.79, JPY: 149.5, CNY: 7.24, CAD: 1.36, AUD: 1.53, CHF: 0.88,
    SEK: 10.42, NOK: 10.68, DKK: 6.87, PLN: 3.98, CZK: 22.5, HUF: 362, RON: 4.58,
    BGN: 1.80, TRY: 33.5, INR: 83.2, KRW: 1325, SGD: 1.34, HKD: 7.82, NZD: 1.64,
    MXN: 17.15, BRL: 4.97, ZAR: 18.35, PHP: 56.2, THB: 35.8, MYR: 4.72, IDR: 15800,
    ILS: 3.68, CLP: 925, COP: 3950, PEN: 3.72, ARS: 870, VND: 24500, AED: 3.67,
    SAR: 3.75, QAR: 3.64, KWD: 0.31, BHD: 0.38,
    BTC: 0.0000155, ETH: 0.00029, SOL: 0.0069, XRP: 1.61, DOGE: 6.67,
    ADA: 2.22, DOT: 0.139, MATIC: 1.39, AVAX: 0.028, LINK: 0.068,
    UNI: 0.133, LTC: 0.012, BCH: 0.0022, XLM: 9.09, ATOM: 0.118, XMR: 0.0061,
  },
};