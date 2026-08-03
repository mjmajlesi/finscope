import { useState } from 'react';
import { ArrowUpDown, RefreshCw } from 'lucide-react';
import { useCurrencyConverter } from '../hooks/useExchangeRates';

const FIAT_CURRENCIES = [
  'USD', 'EUR', 'GBP', 'JPY', 'IRR', 'CNY', 'CAD', 'AUD', 'CHF',
  'SEK', 'NOK', 'DKK', 'PLN', 'CZK', 'HUF', 'RON', 'BGN',
  'TRY', 'INR', 'KRW', 'SGD', 'HKD', 'NZD', 'MXN', 'BRL',
  'ZAR', 'PHP', 'THB', 'MYR', 'IDR', 'ILS', 'CLP', 'COP',
  'PEN', 'ARS', 'VND', 'AED', 'SAR', 'QAR', 'KWD', 'BHD'
] as const;

const POPULAR_CRYPTO = [
  'bitcoin', 'ethereum', 'solana', 'ripple', 'dogecoin',
  'cardano', 'polkadot', 'polygon', 'avalanche-2', 'chainlink',
  'uniswap', 'litecoin', 'bitcoin-cash', 'stellar', 'cosmos',
  'monero', 'algorand', 'vechain', 'filecoin', 'internet-computer'
] as const;

type Currency = typeof FIAT_CURRENCIES[number] | typeof POPULAR_CRYPTO[number];

interface CurrencyConverterProps {
  className?: string;
}

export function CurrencyConverter({ className = '' }: CurrencyConverterProps) {
  const [from, setFrom] = useState<Currency>('USD');
  const [to, setTo] = useState<Currency>('IRR');
  const [amount, setAmount] = useState<string>('1');
  const { result, convertedAmount, refetch } = useCurrencyConverter(
    parseFloat(amount) || 0,
    from,
    to
  );

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <div className={`bg-bg-card rounded-xl p-6 ${className}`}>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8">
        <div className="flex-1 sm:max-w-xs">
          <div className="flex items-center gap-3 mb-4">
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value as Currency)}
              className="w-24 bg-bg-card border border-bg-card-hover rounded-lg pl-2 pr-4 py-2 text-text-primary focus:outline-none focus:border-brand"
            >
              {FIAT_CURRENCIES.map((c) => (
                <option key={c} value={c}>
                  {c === 'IRR' ? 'IRR (ریال)' : c}
                </option>
              ))}
              {POPULAR_CRYPTO.map((c) => (
                <option key={c} value={c}>
                  {c.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-bg-card border border-bg-card-hover rounded-lg pl-4 pr-4 py-2 text-text-primary focus:outline-none focus:border-brand"
            placeholder="0"
          />
        </div>

        <div className="flex flex-col items-center gap-4">
          <button
            onClick={handleSwap}
            className="w-10 h-10 bg-brand/10 hover:bg-brand/20 rounded-lg flex items-center justify-center transition-colors"
          >
            <ArrowUpDown className="w-5 h-5 text-brand" />
          </button>
          <button
            onClick={refetch}
            className="w-10 h-10 bg-brand/10 hover:bg-brand/20 rounded-lg flex items-center justify-center transition-colors"
          >
            <RefreshCw className="w-5 h-5 text-brand" />
          </button>
        </div>

        <div className="flex-1 sm:max-w-xs">
          <div className="flex items-center gap-3 mb-4">
            <select
              value={to}
              onChange={(e) => setTo(e.target.value as Currency)}
              className="w-24 bg-bg-card border border-bg-card-hover rounded-lg pl-2 pr-4 py-2 text-text-primary focus:outline-none focus:border-brand"
            >
              {FIAT_CURRENCIES.map((c) => (
                <option key={c} value={c}>
                  {c === 'IRR' ? 'IRR (ریال)' : c}
                </option>
              ))}
              {POPULAR_CRYPTO.map((c) => (
                <option key={c} value={c}>
                  {c.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
          <div className="text-text-primary text-2xl font-bold">
            {result ? convertedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 }) : '0.00'}
          </div>
        </div>
      </div>

      {result && (
        <div className="mt-4 pt-4 border-t border-bg-card-hover text-text-muted text-sm">
          1 {from} = {result.rate.toFixed(6)} {to} • Updated: {new Date(result.lastUpdated).toLocaleString()}
        </div>
      )}
    </div>
  );
}