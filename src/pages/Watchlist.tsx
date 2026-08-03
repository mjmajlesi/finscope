import { useWatchlistContext } from '../hooks/useWatchlistContext';
import { useMarketData } from '../hooks/useMarketData';
import { PriceCard } from '../components/PriceCard';
import { SkeletonLoader } from '../components/SkeletonLoader';
import { Link } from 'react-router';
import { Star } from 'lucide-react';

export function Watchlist() {
  const { watchlist } = useWatchlistContext();
  const { data: coins, loading, error } = useMarketData(50);

  const watchedCoins = coins.filter((coin) => watchlist.includes(coin.id));

  if (loading) {
    return <SkeletonLoader count={6} />;
  }

  if (error) {
    return (
      <div className="text-status-down text-center py-12 px-4">
        Failed to load market data: {error}
      </div>
    );
  }

  if (watchedCoins.length === 0) {
    return (
      <div className="text-center py-16 space-y-4 px-4">
        <Star className="w-12 h-12 text-text-muted mx-auto" />
        <h2 className="text-2xl font-bold text-text-primary">Your Watchlist is Empty</h2>
        <p className="text-text-muted max-w-md mx-auto">
          Start adding coins by clicking the star icon on any coin card.
        </p>
        <Link
          to="/markets"
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand/10 hover:bg-brand/20 text-brand font-medium rounded-lg transition-colors"
        >
          Browse Markets
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-text-primary mb-2 text-center sm:text-left">Watchlist</h1>
      <p className="text-text-muted mb-8 text-center sm:text-left">{watchedCoins.length} coin{watchedCoins.length !== 1 ? 's' : ''} you're tracking</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {watchedCoins.map((coin) => (
          <PriceCard key={coin.id} coin={coin} />
        ))}
      </div>
    </div>
  );
}