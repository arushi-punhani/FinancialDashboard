import { motion } from 'framer-motion';

export default function ChartsSection({ categoryTotals }) {
  const entries = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);
  const fallbackData = [
    ['Savings', 12],
    ['Food', 8],
    ['Travel', 6],
    ['Shopping', 5],
  ];
  const data = entries.length ? entries : fallbackData;
  const maxAmount = Math.max(...data.map(([, amount]) => amount));

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-2">
        <h2 className="text-xl font-semibold text-white">Spending Breakdown</h2>
        <p className="text-sm text-blue-100/70">Top categories this month</p>
      </div>

      <div className="grid h-56 grid-cols-2 items-end gap-3 sm:grid-cols-4 lg:grid-cols-5">
        {data.map(([label, amount], index) => {
          const height = Math.max(16, Math.round((amount / maxAmount) * 100));

          return (
            <div key={label} className="flex flex-col items-center gap-2">
              <div className="flex h-44 w-full items-end overflow-hidden rounded-xl border border-blue-200/15 bg-blue-950/70">
                <motion.div
                  initial={{ height: 0 }}
                  whileInView={{ height: `${height}%` }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.5, delay: 0.06 * index }}
                  className="w-full rounded-t-xl bg-gradient-to-t from-blue-500 to-cyan-300"
                />
              </div>
              <span className="max-w-full truncate text-xs text-blue-100/75">{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
