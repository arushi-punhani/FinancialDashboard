import { useMemo, useState } from 'react';
import transactionsData from './Data/transactions';
import RoleSwitcher from './components/RoleSwitcher';
import SummaryCards from './components/SummaryCards';
import ChartsSection from './components/ChartsSection';
import TransactionsTable from './components/TransactionsTable';
import Insights from './components/Insights';

export default function App() {
  const [transactions, setTransactions] = useState(transactionsData);
  const [role, setRole] = useState('viewer');
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((t) => t.category.toLowerCase().includes(search.toLowerCase()))
      .filter((t) => filterType === 'all' || t.type === filterType);
  }, [transactions, search, filterType]);

  const income = transactions.filter(t => t.type === 'income').reduce((a, b) => a + b.amount, 0);
  const expenses = transactions.filter(t => t.type === 'expense').reduce((a, b) => a + b.amount, 0);
  const balance = income - expenses;

  const categoryTotals = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const highestCategory = Object.keys(categoryTotals).length
    ? Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0][0]
    : 'No Data';
      const addTransaction = () => {
    setTransactions([
      ...transactions,
      { id: Date.now(), date: '2026-04-06', amount: 2000, category: 'Bills', type: 'expense' }
    ]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Finance Dashboard</h1>

      <RoleSwitcher role={role} setRole={setRole} addTransaction={addTransaction} />
      <SummaryCards income={income} expenses={expenses} balance={balance} />
      <ChartsSection categoryTotals={categoryTotals} />
      <TransactionsTable
        filteredTransactions={filteredTransactions}
        search={search}
        setSearch={setSearch}
        filterType={filterType}
        setFilterType={setFilterType}
      />
      <Insights highestCategory={highestCategory} />
          </div>
  );
}