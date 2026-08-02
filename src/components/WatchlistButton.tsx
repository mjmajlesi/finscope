import { Star } from 'lucide-react';
import { useWatchlistContext } from '../hooks/useWatchlistContext';

interface WatchlistButtonProps {
  coinId: string;
  className?: string;
}

export function WatchlistButton({ coinId, className = '' }: WatchlistButtonProps) {
  const { isWatched, toggle } = useWatchlistContext();
  const watched = isWatched(coinId);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(coinId);
      }}
      aria-label={watched ? 'Remove from watchlist' : 'Add to watchlist'}
      className={`p-2 rounded-lg transition-all duration-200 cursor-pointer ${
        watched
          ? 'text-brand bg-brand/10 hover:bg-brand/20'
          : 'text-text-muted hover:text-text-primary hover:bg-bg-card-hover'
      } ${className}`}
    >
      <Star className={`w-5 h-5 ${watched ? 'fill-current' : ''}`} />
    </button>
  );
}