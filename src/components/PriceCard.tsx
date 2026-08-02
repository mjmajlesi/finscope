import { Link } from 'react-router';
import { MiniChart } from './MiniChart';
import { WatchlistButton } from './WatchlistButton';
import type { Coin } from '../types';

interface PriceCardProps {
  coin: Coin;
  className?: string;
}

export function PriceCard({ coin, className = '' }: PriceCardProps) {
  const change24h = coin.price_change_percentage_24h ?? 0;
  const positive = change24h >= 0;

  const sparklineData = coin.sparkline_in_7d?.price ?? [];
  const miniChartData = sparklineData.length > 0
    ? sparklineData.map((price, i) => ({ time: i, price }))
    : Array.from({ length: 24 }, (_, i) => ({
        time: i,
        price: coin.current_price * (0.95 + (i / 24) * 0.1),
      }));

  return (
    <Link
      to={`/markets/${coin.id}`}
      className={`group block bg-bg-card hover:bg-bg-card-hover rounded-xl p-5 transition-all duration-200 border border-transparent hover:border-brand/30 ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <img
            src={coin.image || `https://assets.coingecko.com/coins/images/1/standard/bitcoin.png`}
            alt={coin.name}
            className="w-10 h-10 rounded-full object-cover shrink-0"
            onError={(e) => {
              e.currentTarget.src = `https://assets.coingecko.com/coins/images/1/standard/bitcoin.png`;
            }}
          />
          <div className="min-w-0">
            <h3 className="font-semibold text-text-primary truncate">{coin.name}</h3>
            <p className="text-sm text-text-muted uppercase">{coin.symbol}</p>
          </div>
        </div>
        <WatchlistButton coinId={coin.id} className="shrink-0" />
      </div>

      <div className="mt-4 flex items-end justify-between gap-4">
        <div className="text-right min-w-0">
          <p className="text-xl font-bold text-text-primary">
            ${coin.current_price?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
          </p>
          <p className={`text-sm font-medium ${positive ? 'text-status-up' : 'text-status-down'}`}>
            {positive ? '+' : ''}{change24h.toFixed(2)}%
          </p>
        </div>
      </div>

      <div className="mt-4">
        <MiniChart data={miniChartData} positive={positive} />
      </div>

      {coin.market_cap_rank && (
        <div className="mt-3 pt-3 border-t border-bg-card-hover flex items-center justify-between text-xs text-text-muted">
          <span>Rank: #{coin.market_cap_rank}</span>
          <span>${coin.market_cap?.toLocaleString() || '—'}</span>
        </div>
      )}
    </Link>
  );
}