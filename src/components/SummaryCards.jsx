import { motion } from 'framer-motion';

export default function SummaryCards({ income, expenses, balance }) {
  const formatCompactCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(amount);
  };

  const cards = [
    { label: 'Total Balance', value: balance, tone: 'from-orange-500/30 via-orange-400/12 to-black' },
    { label: 'Total Income', value: income, tone: 'from-amber-500/25 via-orange-400/10 to-black' },
    { label: 'Total Expenses', value: expenses, tone: 'from-rose-500/18 via-orange-500/10 to-black' },
  ];

  return (
    <div className="grid gap-3 md:grid-cols-3">
      {cards.map((card, index) => (
        <motion.article
          key={card.label}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -10, scale: 1.02 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: index * 0.08, duration: 0.35 }}
          className={`rounded-2xl border border-orange-500/20 bg-gradient-to-br ${card.tone} p-5 shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-[box-shadow,border-color] duration-300 hover:border-orange-400/50 hover:shadow-[0_28px_65px_rgba(251,146,60,0.18)]`}
        >
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">{card.label}</h2>
          <p className="mt-3 text-3xl font-semibold text-white">{formatCompactCurrency(card.value)}</p>
        </motion.article>
      ))}
    </div>
  );
}
