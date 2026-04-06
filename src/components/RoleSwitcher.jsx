export default function RoleSwitcher({ role, setRole, addTransaction }) {
  return (
    <div className="mb-6 flex gap-4 items-center">
      <label>Role:</label>
      <select
        className="border rounded px-3 py-2"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="viewer">Viewer</option>
        <option value="admin">Admin</option>
      </select>

      {role === 'admin' && (
        <button
          onClick={addTransaction}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Add Transaction
        </button>
      )}
    </div>
  );
}