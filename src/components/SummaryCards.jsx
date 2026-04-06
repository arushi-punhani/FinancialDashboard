export default function SummaryCards({ income, expenses, balance }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-white p-4 rounded-2xl shadow">Balance: ₹{balance}</div>
      <div className="bg-white p-4 rounded-2xl shadow">Income: ₹{income}</div>
      <div className="bg-white p-4 rounded-2xl shadow">Expenses: ₹{expenses}</div>
    </div>
  );
}