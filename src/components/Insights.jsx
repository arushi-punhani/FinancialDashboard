import { motion } from 'framer-motion';

export default function Insights({ highestCategory }) {
  const cards = [
    {
      title: 'Top Spending Category',
      text: `Your highest spending is in ${highestCategory}. A weekly cap here can boost savings fast.`,
      tone: 'from-orange-500/18 to-transparent border-orange-400/20',
    },
    {
      title: 'Cashflow Snapshot',
      text: 'Income vs expense trends are visible in one place now, so monthly planning is easier.',
      tone: 'from-amber-500/16 to-transparent border-orange-400/15',
    },
    {
      title: 'Action Tip',
      text: 'Automate a fixed transfer on salary day to build a stronger emergency fund.',
      tone: 'from-orange-600/16 to-transparent border-amber-300/15',
    },
  ];

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold text-orange-300">Insights</h2>
      <div className="grid gap-3 md:grid-cols-3">
        {cards.map((card, index) => (
          <motion.article
            key={card.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8, scale: 1.015 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: index * 0.08, duration: 0.35 }}
            className={`rounded-2xl border bg-gradient-to-br p-4 shadow-[0_18px_38px_rgba(0,0,0,0.35)] transition-[box-shadow,border-color] duration-300 hover:border-orange-400/45 hover:shadow-[0_24px_52px_rgba(249,115,22,0.18)] ${card.tone}`}
          >
            <h3 className="mb-2 text-sm font-semibold text-orange-100">{card.title}</h3>
            <p className="text-sm leading-relaxed text-zinc-400">{card.text}</p>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
