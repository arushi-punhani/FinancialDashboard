import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import ChartsSection from './components/ChartsSection';
import Insights from './components/Insights';
import RoleSwitcher from './components/RoleSwitcher';
import SummaryCards from './components/SummaryCards';
import TransactionsTable from './components/TransactionsTable';
import initialTransactions from './Data/transactions';

const categoryBudgets = {
  'Living Expenses': 18000,
  Food: 9000,
  Shopping: 12000,
  Travel: 8000,
  Misc: 5000,
};

const panelMotion = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.35 },
  transition: { duration: 0.45, ease: 'easeOut' },
};

export default function App() {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [role, setRole] = useState('viewer');
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');

  const income = useMemo(
    () =>
      transactions
        .filter((t) => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0),
    [transactions]
  );

  const expenses = useMemo(
    () =>
      transactions
        .filter((t) => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0),
    [transactions]
  );

  const balance = income - expenses;

  const filteredTransactions = useMemo(
    () =>
      transactions.filter((t) => {
        const matchesSearch = t.category.toLowerCase().includes(search.toLowerCase());
        const matchesType = filterType === 'all' || t.type === filterType;
        return matchesSearch && matchesType;
      }),
    [transactions, search, filterType]
  );

  const categoryTotals = useMemo(() => {
    const totals = {};
    transactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        totals[t.category] = (totals[t.category] || 0) + t.amount;
      });
    return totals;
  }, [transactions]);

  const budgetSegments = useMemo(
    () =>
      Object.entries(categoryBudgets).map(([category, budget]) => {
        const spent = categoryTotals[category] || 0;

        return {
          category,
          budget,
          spent,
          left: Math.max(budget - spent, 0),
          overBudget: Math.max(spent - budget, 0),
        };
      }),
    [categoryTotals]
  );

  const monthlyBudget = useMemo(() => {
    const limit = Object.values(categoryBudgets).reduce((sum, amount) => sum + amount, 0);
    const remaining = limit - expenses;
    const spentRatio = limit === 0 ? 0 : expenses / limit;

    return {
      limit,
      spent: expenses,
      remaining,
      progress: Math.min(spentRatio, 1),
    };
  }, [expenses]);

  const highestCategory = useMemo(() => {
    const entries = Object.entries(categoryTotals);
    if (!entries.length) return 'No expense data yet';
    return entries.sort((a, b) => b[1] - a[1])[0][0];
  }, [categoryTotals]);

  const addTransaction = () => {
    const type = window.prompt('Type (income/expense):', 'expense');
    if (!type || !['income', 'expense'].includes(type)) return;

    const category = window.prompt('Category:', 'Misc');
    if (!category) return;

    const amountInput = window.prompt('Amount:', '1000');
    const amount = Number(amountInput);
    if (!Number.isFinite(amount) || amount <= 0) return;

    const newTransaction = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      amount,
      category,
      type,
    };

    setTransactions((prev) => [newTransaction, ...prev]);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.16),_transparent_28%),linear-gradient(135deg,#020202_0%,#090909_35%,#121212_100%)] px-4 py-8 sm:px-6 lg:px-10 xl:px-12">
      <div className="pointer-events-none absolute -left-24 -top-28 h-96 w-96 rounded-full bg-orange-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -right-28 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:140px_140px] opacity-20" />

      <div className="relative w-full">
        <motion.header
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 border-b border-orange-500/10 pb-6"
        >
          <p className="text-sm font-bold uppercase tracking-[0.4em] text-orange-400">Personal Finance</p>
          <h1 className="mt-3 max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.04em] text-orange-400 drop-shadow-[0_0_28px_rgba(251,146,60,0.18)] sm:text-6xl xl:text-7xl">
            Finance Dashboard
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-zinc-300 sm:text-lg">
            Track your cashflow, monitor trends, and make smarter decisions.
          </p>
        </motion.header>

        <motion.section {...panelMotion} className="mb-4 rounded-3xl border border-orange-500/15 bg-black/55 p-5 backdrop-blur-xl">
          <RoleSwitcher role={role} setRole={setRole} addTransaction={addTransaction} />
        </motion.section>

        <motion.section {...panelMotion} className="mb-4">
          <SummaryCards income={income} expenses={expenses} balance={balance} />
        </motion.section>

        <motion.section {...panelMotion} className="mb-4 rounded-3xl border border-orange-500/15 bg-black/55 p-5 backdrop-blur-xl">
          <ChartsSection budgetSegments={budgetSegments} monthlyBudget={monthlyBudget} />
        </motion.section>

        <motion.section {...panelMotion} className="mb-4 rounded-3xl border border-orange-500/15 bg-black/55 p-5 backdrop-blur-xl">
          <TransactionsTable
            filteredTransactions={filteredTransactions}
            search={search}
            setSearch={setSearch}
            filterType={filterType}
            setFilterType={setFilterType}
          />
        </motion.section>

        <motion.section {...panelMotion} className="rounded-3xl border border-orange-500/15 bg-black/55 p-5 backdrop-blur-xl">
          <Insights highestCategory={highestCategory} />
        </motion.section>
      </div>
    </div>
  );
}
