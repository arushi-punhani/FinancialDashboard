import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';

const slicePalette = ['#fb923c', '#f97316', '#fdba74', '#f59e0b', '#ea580c'];

const polarToCartesian = (cx, cy, radius, angleInDegrees) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;

  return {
    x: cx + radius * Math.cos(angleInRadians),
    y: cy + radius * Math.sin(angleInRadians),
  };
};

const describeArc = (cx, cy, radius, startAngle, endAngle) => {
  const start = polarToCartesian(cx, cy, radius, endAngle);
  const end = polarToCartesian(cx, cy, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y} Z`;
};

const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);

export default function ChartsSection({ budgetSegments, monthlyBudget }) {
  const segments = useMemo(() => {
    const totalBudget = budgetSegments.reduce((sum, segment) => sum + segment.budget, 0);
    let startAngle = 0;

    return budgetSegments.map((segment, index) => {
      const sweep = totalBudget === 0 ? 0 : (segment.budget / totalBudget) * 360;
      const endAngle = startAngle + sweep;
      const enrichedSegment = {
        ...segment,
        color: slicePalette[index % slicePalette.length],
        percentage: totalBudget === 0 ? 0 : Math.round((segment.budget / totalBudget) * 100),
        path: describeArc(120, 120, 90, startAngle, endAngle),
      };

      startAngle = endAngle;
      return enrichedSegment;
    });
  }, [budgetSegments]);

  const [activeCategory, setActiveCategory] = useState(segments[0]?.category ?? '');

  const activeSegment =
    segments.find((segment) => segment.category === activeCategory) ?? segments[0] ?? null;

  const remainingRatio =
    monthlyBudget.limit === 0 ? 0 : Math.max(monthlyBudget.remaining, 0) / monthlyBudget.limit;

  const budgetTone =
    remainingRatio > 0.45
      ? {
          bar: 'from-emerald-400 to-green-500',
          text: 'text-emerald-300',
          note: 'Healthy runway left this month',
        }
      : remainingRatio > 0.2
        ? {
            bar: 'from-amber-300 to-orange-400',
            text: 'text-amber-200',
            note: 'Budget is getting tighter',
          }
        : {
            bar: 'from-rose-400 to-red-500',
            text: 'text-rose-300',
            note: 'High spend level for this month',
          };

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="text-xl font-semibold text-orange-300">Budget Allocation</h2>
          <p className="mt-1 text-sm text-zinc-400">
            Hover a slice to see spent and remaining budget for that category
          </p>
        </div>
        <p className={`text-sm font-medium ${budgetTone.text}`}>{budgetTone.note}</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(380px,520px)_1fr]">
        <div className="rounded-3xl border border-orange-500/15 bg-zinc-950/75 p-4">
          <div className="flex items-center justify-center">
            <svg viewBox="0 0 240 240" className="h-80 w-80 overflow-visible sm:h-96 sm:w-96">
              {segments.map((segment) => (
                <motion.path
                  key={segment.category}
                  d={segment.path}
                  fill={segment.color}
                  stroke="rgba(12, 10, 9, 0.98)"
                  strokeWidth={activeSegment?.category === segment.category ? 5 : 3}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.04, filter: 'brightness(1.15)' }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.3 }}
                  style={{ transformOrigin: '120px 120px', cursor: 'pointer' }}
                  onMouseEnter={() => setActiveCategory(segment.category)}
                />
              ))}
              <circle cx="120" cy="120" r="54" fill="rgba(12, 10, 9, 0.95)" />
              <text
                x="120"
                y="112"
                textAnchor="middle"
                className="fill-orange-200 text-[9px] font-semibold uppercase tracking-[0.18em] sm:text-[10px]"
              >
                Monthly Limit
              </text>
              <text x="120" y="140" textAnchor="middle" className="fill-white text-[18px] font-semibold sm:text-[20px]">
                {formatCurrency(monthlyBudget.limit)}
              </text>
            </svg>
          </div>

          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {segments.map((segment) => (
              <button
                key={segment.category}
                type="button"
                onMouseEnter={() => setActiveCategory(segment.category)}
                onFocus={() => setActiveCategory(segment.category)}
                className={`rounded-2xl border px-3 py-3 text-left transition ${
                  activeSegment?.category === segment.category
                    ? 'border-orange-400/45 bg-orange-950/25'
                    : 'border-orange-500/10 bg-black/45 hover:border-orange-400/30'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: segment.color }}
                    />
                    <span className="text-sm font-medium text-zinc-100">{segment.category}</span>
                  </div>
                  <span className="text-xs text-zinc-500">{segment.percentage}%</span>
                </div>
                <p className="mt-2 text-xs text-zinc-500">
                  Budget {formatCurrency(segment.budget)}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          <motion.div
            key={activeSegment?.category}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-orange-500/15 bg-gradient-to-br from-orange-950/18 to-black p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
                  Active Segment
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-white">
                  {activeSegment?.category ?? 'No category'}
                </h3>
              </div>
              <span
                className="rounded-full px-3 py-1 text-xs font-semibold text-slate-950"
                style={{ backgroundColor: activeSegment?.color ?? '#38bdf8' }}
              >
                {activeSegment?.percentage ?? 0}% of budget
              </span>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl border border-orange-500/10 bg-zinc-950/75 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Spent</p>
                <p className="mt-2 text-2xl font-semibold text-rose-300">
                  {formatCurrency(activeSegment?.spent ?? 0)}
                </p>
              </div>
              <div className="rounded-2xl border border-orange-500/10 bg-zinc-950/75 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Left</p>
                <p className="mt-2 text-2xl font-semibold text-emerald-300">
                  {formatCurrency(activeSegment?.left ?? 0)}
                </p>
              </div>
              <div className="rounded-2xl border border-orange-500/10 bg-zinc-950/75 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Limit</p>
                <p className="mt-2 text-2xl font-semibold text-white">
                  {formatCurrency(activeSegment?.budget ?? 0)}
                </p>
              </div>
            </div>

            {(activeSegment?.overBudget ?? 0) > 0 && (
              <p className="mt-4 text-sm text-rose-300">
                Over budget by {formatCurrency(activeSegment.overBudget)} in this segment.
              </p>
            )}
          </motion.div>

          <div className="rounded-3xl border border-orange-500/15 bg-zinc-950/70 p-5">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-orange-200">Monthly Budget Limit</h3>
                <p className="mt-1 text-sm text-zinc-400">
                  {formatCurrency(monthlyBudget.spent)} spent out of {formatCurrency(monthlyBudget.limit)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Remaining</p>
                <p className={`mt-1 text-2xl font-semibold ${budgetTone.text}`}>
                  {formatCurrency(Math.max(monthlyBudget.remaining, 0))}
                </p>
              </div>
            </div>

            <div className="mt-4 h-4 overflow-hidden rounded-full bg-black ring-1 ring-inset ring-orange-500/10">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${Math.min(monthlyBudget.progress * 100, 100)}%` }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className={`h-full rounded-full bg-gradient-to-r ${budgetTone.bar}`}
              />
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm">
              <span className="text-zinc-400">
                Left this month: <span className={`font-semibold ${budgetTone.text}`}>{formatCurrency(Math.max(monthlyBudget.remaining, 0))}</span>
              </span>
              <span className="text-zinc-400">
                {monthlyBudget.remaining < 0
                  ? `Exceeded by ${formatCurrency(Math.abs(monthlyBudget.remaining))}`
                  : `${Math.round(remainingRatio * 100)}% of budget still available`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
