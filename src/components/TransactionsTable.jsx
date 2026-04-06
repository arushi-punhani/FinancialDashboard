import { motion } from 'framer-motion';

export default function TransactionsTable({
  filteredTransactions,
  search,
  setSearch,
  filterType,
  setFilterType,
}) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-semibold text-white">Transactions</h2>
        <div className="flex flex-wrap gap-2">
          <input
            placeholder="Search category"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 rounded-xl border border-blue-200/20 bg-blue-900/60 px-3 text-sm text-slate-100 placeholder:text-blue-100/45 outline-none transition focus:border-cyan-300/50"
          />

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="h-10 rounded-xl border border-blue-200/20 bg-blue-900/60 px-3 text-sm text-slate-100 outline-none transition focus:border-cyan-300/50"
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-blue-200/15">
        <table className="min-w-full border-collapse text-left text-sm">
          <thead className="bg-blue-900/60 text-[11px] uppercase tracking-[0.14em] text-blue-100/80">
            <tr>
              <th className="px-3 py-3">Date</th>
              <th className="px-3 py-3">Amount</th>
              <th className="px-3 py-3">Category</th>
              <th className="px-3 py-3">Type</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((t, index) => (
              <motion.tr
                key={t.id}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.24, delay: index * 0.03 }}
                className="border-t border-blue-200/10 odd:bg-blue-900/20 even:bg-blue-950/15"
              >
                <td className="px-3 py-3 text-blue-100/90">{formatDate(t.date)}</td>
                <td className={`px-3 py-3 font-semibold ${t.type === 'income' ? 'text-emerald-300' : 'text-rose-300'}`}>
                  {t.type === 'income' ? '+' : '-'}
                  {formatCurrency(t.amount)}
                </td>
                <td className="px-3 py-3">
                  <span className="inline-flex rounded-full bg-blue-400/20 px-3 py-1 text-xs font-medium text-blue-100">
                    {t.category}
                  </span>
                </td>
                <td className="px-3 py-3">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      t.type === 'income'
                        ? 'bg-emerald-400/20 text-emerald-200'
                        : 'bg-rose-400/20 text-rose-200'
                    }`}
                  >
                    {t.type.charAt(0).toUpperCase() + t.type.slice(1)}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredTransactions.length === 0 && (
        <p className="mt-3 text-sm text-blue-100/65">No transactions match your filters.</p>
      )}
    </div>
  );
}
