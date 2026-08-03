import { useState, useMemo } from 'react';
import { ArrowUpDown, TrendingUp, TrendingDown } from 'lucide-react';
import { WatchlistButton } from './WatchlistButton';
import type { Coin } from '../types';

type SortKey = 'rank' | 'name' | 'price' | 'change24h' | 'change7d' | 'marketCap' | 'volume';

interface MarketTableProps {
  coins: Coin[];
  className?: string;
}

const COLUMNS: { key: SortKey; label: string; align?: 'left' | 'right' }[] = [
  { key: 'rank', label: '#', align: 'left' },
  { key: 'name', label: 'Coin', align: 'left' },
  { key: 'price', label: 'Price', align: 'right' },
  { key: 'change24h', label: '24h %', align: 'right' },
  { key: 'change7d', label: '7d %', align: 'right' },
  { key: 'marketCap', label: 'Market Cap', align: 'right' },
  { key: 'volume', label: 'Volume (24h)', align: 'right' },
];

function formatNum(n: number, compact = false): string {
  if (compact) return `$${(n / 1e9).toFixed(2)}B`;
  return n.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

export function MarketTable({ coins, className = '' }: MarketTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>('rank');
  const [sortAsc, setSortAsc] = useState(true);

  const sorted = useMemo(() => {
    const keyFn: Record<SortKey, (c: Coin) => number | string> = {
      rank: (c) => c.market_cap_rank ?? 9999,
      name: (c) => c.name.toLowerCase(),
      price: (c) => c.current_price ?? 0,
      change24h: (c) => c.price_change_percentage_24h ?? 0,
      change7d: (c) => c.price_change_percentage_7d_in_currency ?? 0,
      marketCap: (c) => c.market_cap ?? 0,
      volume: (c) => c.total_volume ?? 0,
    };
    const fn = keyFn[sortKey];
    return [...coins].sort((a, b) => {
      const va = fn(a), vb = fn(b);
      if (va < vb) return sortAsc ? -1 : 1;
      if (va > vb) return sortAsc ? 1 : -1;
      return 0;
    });
  }, [coins, sortKey, sortAsc]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(key === 'name'); }
  }

  const cellClass = "px-4 py-3 text-sm whitespace-nowrap";

  return (
    <div className={`overflow-x-auto ${className}`}>
      {/* Desktop table */}
      <table className="w-full text-left hidden md:table">
        <thead>
          <tr className="border-b border-bg-card-hover text-text-muted">
            {COLUMNS.map((col) => (
              <th
                key={col.key}
                className={`${cellClass} font-medium cursor-pointer select-none hover:text-text-primary transition-colors ${
                  col.align === 'right' ? 'text-right' : 'text-left'
                }`}
                onClick={() => toggleSort(col.key)}
              >
                <span className="inline-flex items-center gap-1">
                  {col.label}
                  {sortKey === col.key && (
                    <ArrowUpDown className="w-3 h-3 text-brand" />
                  )}
                </span>
              </th>
            ))}
            <th className={`${cellClass} w-10`}></th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((coin) => {
            const chg24 = coin.price_change_percentage_24h ?? 0;
            const chg7d = coin.price_change_percentage_7d_in_currency ?? 0;
            return (
              <tr
                key={coin.id}
                className="border-b border-bg-card-hover hover:bg-bg-card-hover transition-colors cursor-pointer"
              >
                <td className={cellClass}>{coin.market_cap_rank ?? '—'}</td>
                <td className={`${cellClass} font-medium`}>
                  <div className="flex items-center gap-3">
                    <img src={coin.image} alt="" className="w-7 h-7 rounded-full" />
                    <div>
                      <span className="text-text-primary">{coin.name}</span>
                      <span className="ml-2 text-text-muted uppercase text-xs">{coin.symbol}</span>
                    </div>
                  </div>
                </td>
                <td className={`${cellClass} text-right font-medium text-text-primary`}>
                  {formatNum(coin.current_price)}
                </td>
                <td className={`${cellClass} text-right`}>
                  <span className={`inline-flex items-center gap-1 ${chg24 >= 0 ? 'text-status-up' : 'text-status-down'}`}>
                    {chg24 >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {Math.abs(chg24).toFixed(2)}%
                  </span>
                </td>
                <td className={`${cellClass} text-right`}>
                  <span className={chg7d >= 0 ? 'text-status-up' : 'text-status-down'}>
                    {chg7d >= 0 ? '+' : ''}{chg7d.toFixed(2)}%
                  </span>
                </td>
                <td className={`${cellClass} text-right text-text-muted`}>
                  {coin.market_cap ? formatNum(coin.market_cap, true) : '—'}
                </td>
                <td className={`${cellClass} text-right text-text-muted`}>
                  {coin.total_volume ? formatNum(coin.total_volume, true) : '—'}
                </td>
                <td className={`${cellClass} w-10`}>
                  <WatchlistButton coinId={coin.id} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {sorted.map((coin) => {
          const chg24 = coin.price_change_percentage_24h ?? 0;
          const chg7d = coin.price_change_percentage_7d_in_currency ?? 0;
          const isUp = chg24 >= 0;
          return (
            <div
              key={coin.id}
              className="bg-bg-card rounded-xl p-4 border border-bg-card-hover hover:border-brand/30 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <img src={coin.image} alt="" className="w-8 h-8 rounded-full" />
                  <div>
                    <span className="font-medium text-text-primary">{coin.name}</span>
                    <span className="ml-2 text-text-muted uppercase text-xs">{coin.symbol}</span>
                  </div>
                </div>
                <span className={`text-sm font-medium ${isUp ? 'text-status-up' : 'text-status-down'}`}>
                  {isUp ? '+' : ''}{chg24.toFixed(2)}%
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-text-muted text-xs">Price</span>
                  <p className="font-medium text-text-primary">{formatNum(coin.current_price)}</p>
                </div>
                <div>
                  <span className="text-text-muted text-xs">7d</span>
                  <p className={chg7d >= 0 ? 'text-status-up' : 'text-status-down'}>
                    {chg7d >= 0 ? '+' : ''}{chg7d.toFixed(2)}%
                  </p>
                </div>
                <div>
                  <span className="text-text-muted text-xs">Market Cap</span>
                  <p className="text-text-primary">{coin.market_cap ? formatNum(coin.market_cap, true) : '—'}</p>
                </div>
                <div>
                  <span className="text-text-muted text-xs">Volume</span>
                  <p className="text-text-primary">{coin.total_volume ? formatNum(coin.total_volume, true) : '—'}</p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-bg-card-hover flex justify-end">
                <WatchlistButton coinId={coin.id} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}