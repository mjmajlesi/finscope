import { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { useMarketData } from '../hooks/useMarketData';
import { SearchBar } from '../components/SearchBar';
import { MarketTable } from '../components/MarketTable';
import { MarketChart } from '../components/MarketChart';
import { SkeletonLoader } from '../components/SkeletonLoader';

export function Markets() {
  const { id } = useParams<{ id: string }>();
  const { data: coins, loading, error } = useMarketData(50);
  const [query, setQuery] = useState('');

  const selectedCoin = useMemo(() => {
    if (!id) return null;
    return coins.find((c) => c.id === id) ?? null;
  }, [id, coins]);

  const filtered = useMemo(() => {
    if (!query) return coins;
    const q = query.toLowerCase();
    return coins.filter(
      (c) => c.name.toLowerCase().includes(q) || c.symbol.toLowerCase().includes(q) || c.id.toLowerCase().includes(q)
    );
  }, [coins, query]);

  if (selectedCoin) {
    return (
      <div className="py-8 space-y-6">
        <Link to="/markets" className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Markets
        </Link>
        <MarketChart coinId={selectedCoin.id} coinName={selectedCoin.name} coinSymbol={selectedCoin.symbol} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Price', value: `$${selectedCoin.current_price?.toLocaleString()}` },
            { label: 'Market Cap', value: selectedCoin.market_cap ? `$${(selectedCoin.market_cap / 1e9).toFixed(2)}B` : '—' },
            { label: 'Volume 24h', value: selectedCoin.total_volume ? `$${(selectedCoin.total_volume / 1e9).toFixed(2)}B` : '—' },
            { label: '24h Change', value: `${(selectedCoin.price_change_percentage_24h ?? 0) >= 0 ? '+' : ''}${(selectedCoin.price_change_percentage_24h ?? 0).toFixed(2)}%`,
              color: (selectedCoin.price_change_percentage_24h ?? 0) >= 0 ? 'var(--color-status-up)' : 'var(--color-status-down)' },
          ].map((item) => (
            <div key={item.label} className="bg-bg-card rounded-xl p-4">
              <p className="text-xs text-text-muted mb-1">{item.label}</p>
              <p className="text-lg font-bold" style={{ color: item.color ?? 'var(--color-text-primary)' }}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Markets</h1>
        <p className="text-text-muted mt-1">Explore the full crypto market</p>
      </div>

      {error && (
        <div className="bg-status-down/10 border border-status-down/30 rounded-xl p-4 text-status-down">
          {error}
        </div>
      )}

      <SearchBar value={query} onChange={setQuery} placeholder="Search coins by name or symbol..." />

      {loading ? (
        <SkeletonLoader count={6} />
      ) : (
        <div className="bg-bg-card rounded-xl overflow-hidden">
          <MarketTable coins={filtered} />
        </div>
      )}
    </div>
  );
}