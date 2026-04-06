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
    { label: 'Total Balance', value: balance, tone: 'from-blue-500/45 to-blue-900/80' },
    { label: 'Total Income', value: income, tone: 'from-cyan-500/40 to-blue-900/80' },
    { label: 'Total Expenses', value: expenses, tone: 'from-indigo-500/40 to-blue-900/80' },
  ];

  return (
    <div className="grid gap-3 md:grid-cols-3">
      {cards.map((card, index) => (
        <motion.article
          key={card.label}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: index * 0.08, duration: 0.35 }}
          className={`rounded-2xl border border-blue-200/20 bg-gradient-to-br ${card.tone} p-5 backdrop-blur-xl`}
        >
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-100/75">{card.label}</h2>
          <p className="mt-3 text-3xl font-semibold text-white">{formatCompactCurrency(card.value)}</p>
        </motion.article>
      ))}
    </div>
  );
}
