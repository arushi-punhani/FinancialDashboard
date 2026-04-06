export default function TransactionsTable({
  filteredTransactions,
  search,
  setSearch,
  filterType,
  setFilterType,
}) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow mb-8">
      <h2 className="font-semibold mb-4">Transactions</h2>

      <div className="flex gap-4 mb-4">
        <input
          className="border px-3 py-2 rounded"
          placeholder="Search category"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border px-3 py-2 rounded"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>


      <table className="w-full">
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((t) => (
            <tr key={t.id}>
              <td>{t.date}</td>
              <td>₹{t.amount}</td>
              <td>{t.category}</td>
              <td>{t.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}