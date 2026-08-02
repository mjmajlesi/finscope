import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  change?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function StatCard({ icon: Icon, label, value, change, className = '' }: StatCardProps) {
  return (
    <div className={`bg-bg-card hover:bg-bg-card-hover rounded-xl p-6 transition-all duration-200 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-brand/10 rounded-lg">
            <Icon className="w-6 h-6 text-brand" />
          </div>
          <div>
            <p className="text-sm font-medium text-text-muted mb-1">{label}</p>
            <p className="text-2xl font-bold text-text-primary">{value}</p>
          </div>
        </div>
        {change && (
          <div className={`flex items-center gap-1 text-sm font-medium ${change.isPositive ? 'text-status-up' : 'text-status-down'}`}>
            <span>{change.isPositive ? '↑' : '↓'}</span>
            <span>{Math.abs(change.value).toFixed(2)}%</span>
          </div>
        )}
      </div>
    </div>
  );
}