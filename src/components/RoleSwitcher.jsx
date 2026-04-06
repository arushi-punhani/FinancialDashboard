import { AnimatePresence, motion } from 'framer-motion';

export default function RoleSwitcher({ role, setRole, addTransaction }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <label htmlFor="role-select" className="text-sm font-medium text-zinc-300">
          Current Role
        </label>
        <select
          id="role-select"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="h-10 rounded-xl border border-orange-500/20 bg-zinc-950/85 px-3 text-sm text-zinc-100 outline-none transition focus:border-orange-400/55"
        >
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>

        <AnimatePresence>
          {role === 'admin' && (
            <motion.button
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              onClick={addTransaction}
              type="button"
              className="h-10 rounded-xl bg-gradient-to-r from-orange-400 to-amber-300 px-4 text-sm font-semibold text-black shadow-lg shadow-orange-500/25 transition hover:brightness-110"
            >
              + Add Transaction
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <p className="text-sm text-zinc-400">
        {role === 'viewer' ? 'View-only access enabled' : 'Admin access enabled'}
      </p>
    </div>
  );
}
