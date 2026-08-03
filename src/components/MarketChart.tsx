import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';
import type { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';
import { useCoinChart } from '../hooks/useCoinChart';

const TIME_RANGES: { label: string; days: number }[] = [
  { label: '1D', days: 1 },
  { label: '7D', days: 7 },
  { label: '30D', days: 30 },
  { label: '90D', days: 90 },
  { label: '1Y', days: 365 },
];

interface MarketChartProps {
  coinId: string;
  coinName: string;
  coinSymbol: string;
}

export function MarketChart({ coinId, coinName, coinSymbol }: MarketChartProps) {
  const [days, setDays] = useState(7);
  const { data, loading, error } = useCoinChart(coinId, days);

  const chartData = useMemo(() => {
    if (!data?.prices) return [];
    return data.prices.map(([time, price]) => ({ time, price }));
  }, [data]);

  const priceRange = useMemo(() => {
    if (!chartData.length) return { min: 0, max: 0 };
    const prices = chartData.map(d => d.price);
    return {
      min: Math.min(...prices) * 0.99,
      max: Math.max(...prices) * 1.01,
    };
  }, [chartData]);

  const currentPrice = chartData[chartData.length - 1]?.price;
  const firstPrice = chartData[0]?.price;
  const isPositive = currentPrice && firstPrice ? currentPrice >= firstPrice : true;

  function formatDate(ts: number): string {
    const d = new Date(ts);
    if (days <= 1) return d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
    if (days <= 7) return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    return d.toLocaleDateString(undefined, { month: 'short', year: '2-digit' });
  }

  if (error) {
    return <div className="text-status-down p-4">Failed to load chart data</div>;
  }

  return (
    <div className="bg-bg-card rounded-xl p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-text-primary">{coinName} Price</h2>
          <p className="text-text-muted text-sm">
            {currentPrice && `$${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}`}
            {coinSymbol && <span className="uppercase ml-2">{coinSymbol}</span>}
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {TIME_RANGES.map((tr) => (
            <button
              key={tr.days}
              onClick={() => setDays(tr.days)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                days === tr.days
                  ? 'bg-brand text-black'
                  : 'bg-bg-card-hover hover:bg-bg-card-hover text-text-muted'
              }`}
            >
              {tr.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="h-80 flex items-center justify-center text-text-muted">
          Loading chart...
        </div>
      ) : (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, bottom: 0, left: 10 }}>
              <defs>
                <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={isPositive ? 'var(--color-status-up)' : 'var(--color-status-down)'} stopOpacity={0.35} />
                  <stop offset="100%" stopColor={isPositive ? 'var(--color-status-up)' : 'var(--color-status-down)'} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-bg-card-hover)" vertical={false} />
              <XAxis
                dataKey="time"
                tickFormatter={formatDate}
                stroke="var(--color-text-muted)"
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                domain={[priceRange.min, priceRange.max]}
                tickFormatter={(v) => `$${v >= 1000 ? (v / 1000).toFixed(1) + 'k' : v.toFixed(2)}`}
                stroke="var(--color-text-muted)"
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                width={70}
              />
              <Tooltip
                contentStyle={{
                  background: 'var(--color-bg-card)',
                  border: '1px solid var(--color-bg-card-hover)',
                  borderRadius: '8px',
                  color: 'var(--color-text-primary)',
                }}
                formatter={(value: ValueType | undefined, name: NameType | undefined): [ReactNode, NameType] => {
                  const v = typeof value === 'number' ? value : undefined;
                  const n = name !== undefined ? String(name) : undefined;
                  if (v === undefined || n === undefined) return ['—', name ?? ''];
                  if (n === 'price') return [`$${v.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}`, 'Price'];
                  return [v, n];
                }}
                labelFormatter={(label: ReactNode) => {
                  const ts = typeof label === 'number' ? label : 0;
                  return formatDate(ts);
                }}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke={isPositive ? 'var(--color-status-up)' : 'var(--color-status-down)'}
                strokeWidth={2}
                fill="url(#priceGradient)"
                dot={false}
                activeDot={{ r: 5, fill: isPositive ? 'var(--color-status-up)' : 'var(--color-status-down)', strokeWidth: 2, stroke: 'var(--color-bg-card)' }}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}