interface SkeletonLoaderProps {
  count?: number;
  className?: string;
}

export function SkeletonLoader({ count = 4, className = '' }: SkeletonLoaderProps) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-bg-card rounded-xl p-6 animate-pulse"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-bg-card-hover" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-bg-card-hover rounded w-1/2" />
              <div className="h-3 bg-bg-card-hover rounded w-1/3" />
            </div>
          </div>
          <div className="mt-6 h-8 bg-bg-card-hover rounded w-2/3" />
          <div className="mt-4 h-4 bg-bg-card-hover rounded w-1/4" />
        </div>
      ))}
    </div>
  );
}