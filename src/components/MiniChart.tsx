import { Area, AreaChart, ResponsiveContainer } from 'recharts';

interface MiniChartProps {
  data: { time: number; price: number }[];
  positive: boolean;
  className?: string;
}

export function MiniChart({ data, positive, className = '' }: MiniChartProps) {
  if (!data.length) return null;

  const color = positive ? 'var(--color-status-up)' : 'var(--color-status-down)';

  return (
    <div className={`h-10 w-full ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id="miniChartFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.35} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="price"
            stroke={color}
            strokeWidth={1.5}
            fill="url(#miniChartFill)"
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}