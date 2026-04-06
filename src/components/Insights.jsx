export default function Insights({ highestCategory }) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow">
      <h2 className="font-semibold mb-2">Insights</h2>
      <p>Highest spending category: {highestCategory}</p>
      <p>Monthly expenses are stable.</p>
    </div>
  );
}