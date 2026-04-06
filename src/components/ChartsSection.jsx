export default function ChartsSection({ categoryTotals }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <div className="bg-white p-4 rounded-2xl shadow">
        <h2 className="font-semibold mb-2">Balance Trend</h2>
        <div className="h-40 flex items-end gap-3">
          {[40, 60, 45, 70, 55].map((v, i) => (
            <div key={i} className="flex-1 bg-gray-300 rounded" style={{ height: `${v * 2}px` }} />
          ))}
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow">
        <h2 className="font-semibold mb-2">Spending Breakdown</h2>
        {Object.entries(categoryTotals).map(([cat, amt]) => (
          <div key={cat}>{cat}: ₹{amt}</div>
        ))}
      </div>
    </div>
  );
}