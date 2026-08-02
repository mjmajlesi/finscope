import { useMemo, useState } from 'react';
import { Activity, BarChart3, Coins, Globe } from 'lucide-react';
import { useMarketData } from '../hooks/useMarketData';
import { PriceCard } from '../components/PriceCard';
import { StatCard } from '../components/StatCard';
import { SearchBar } from '../components/SearchBar';
import { SkeletonLoader } from '../components/SkeletonLoader';

type Filter = 'all' | 'gainers' | 'losers';

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'gainers', label: 'Gainers' },
  { id: 'losers', label: 'Losers' },
];

export function Dashboard() {
  const { data: coins, loading, error, refetch } = useMarketData(20);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('all');

  const stats = useMemo(() => {
    if (!coins.length) return null;
    const totalMarketCap = coins.reduce((s, c) => s + (c.market_cap || 0), 0);
    const totalVolume = coins.reduce((s, c) => s + (c.total_volume || 0), 0);
    const btc = coins.find((c) => c.id === 'bitcoin');
    const btcDominance = btc && totalMarketCap ? (btc.market_cap / totalMarketCap) * 100 : 0;
    return { totalMarketCap, totalVolume, btcDominance, activeCoins: coins.length };
  }, [coins]);

  const filtered = useMemo(() => {
    let list = coins;
    if (query) {
      const q = query.toLowerCase();
      list = list.filter((c) => c.name.toLowerCase().includes(q) || c.symbol.toLowerCase().includes(q));
    }
    if (filter === 'gainers') list = list.filter((c) => (c.price_change_percentage_24h ?? 0) > 0);
    if (filter === 'losers') list = list.filter((c) => (c.price_change_percentage_24h ?? 0) < 0);
    return list;
  }, [coins, query, filter]);

  return (
    <div className="py-8 space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">Market Overview</h1>
          <p className="text-[var(--color-text-muted)] mt-1">Live crypto prices powered by CoinGecko</p>
        </div>
        <button
          onClick={refetch}
          className="px-4 py-2 rounded-lg bg-[var(--color-brand)]/10 hover:bg-[var(--color-brand)]/20 text-[var(--color-brand)] font-medium transition-colors cursor-pointer"
        >
          ↻ Refresh
        </button>
      </div>

      {error && (
        <div className="bg-[var(--color-status-down)]/10 border border-[var(--color-status-down)]/30 rounded-xl p-4 text-[var(--color-status-down)]">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          icon={Globe}
          label="Total Market Cap"
          value={stats ? `$${(stats.totalMarketCap / 1e12).toFixed(2)}T` : '—'}
        />
        <StatCard
          icon={BarChart3}
          label="24h Trading Volume"
          value={stats ? `$${(stats.totalVolume / 1e9).toFixed(2)}B` : '—'}
        />
        <StatCard
          icon={Activity}
          label="BTC Dominance"
          value={stats ? `${stats.btcDominance.toFixed(1)}%` : '—'}
        />
        <StatCard
          icon={Coins}
          label="Active Coins"
          value={stats?.activeCoins ?? '—'}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        <SearchBar value={query} onChange={setQuery} className="sm:max-w-md flex-1" />
        <div className="flex gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                filter === f.id
                  ? 'bg-[var(--color-brand)] text-black'
                  : 'bg-[var(--color-bg-card)] hover:bg-[var(--color-bg-card-hover)] text-[var(--color-text-muted)]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <SkeletonLoader count={8} />
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-[var(--color-text-muted)]">
          {query ? `No coins match "${query}"` : 'No coins found'}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((coin) => (
            <PriceCard key={coin.id} coin={coin} />
          ))}
        </div>
      )}
    </div>
  );
}