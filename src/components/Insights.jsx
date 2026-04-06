import { motion } from 'framer-motion';

export default function Insights({ highestCategory }) {
  const cards = [
    {
      title: 'Top Spending Category',
      text: `Your highest spending is in ${highestCategory}. A weekly cap here can boost savings fast.`,
      tone: 'from-blue-500/40 to-cyan-400/20 border-cyan-300/30',
    },
    {
      title: 'Cashflow Snapshot',
      text: 'Income vs expense trends are visible in one place now, so monthly planning is easier.',
      tone: 'from-indigo-500/35 to-blue-400/10 border-blue-300/20',
    },
    {
      title: 'Action Tip',
      text: 'Automate a fixed transfer on salary day to build a stronger emergency fund.',
      tone: 'from-sky-500/30 to-blue-500/10 border-sky-300/20',
    },
  ];

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold text-white">Insights</h2>
      <div className="grid gap-3 md:grid-cols-3">
        {cards.map((card, index) => (
          <motion.article
            key={card.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: index * 0.08, duration: 0.35 }}
            className={`rounded-2xl border bg-gradient-to-br p-4 ${card.tone}`}
          >
            <h3 className="mb-2 text-sm font-semibold text-blue-50">{card.title}</h3>
            <p className="text-sm leading-relaxed text-blue-100/75">{card.text}</p>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
