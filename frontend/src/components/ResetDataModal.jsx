import React from "react";
import { AlertTriangle, Loader2, Trash2, X } from "lucide-react";
import { api } from "../lib/api";

const SCOPES = [
  { id: "enrollments", label: "Enrollments + Revenue" },
  { id: "referrals", label: "Referrals & Credits" },
  { id: "callbacks", label: "Callback Requests" },
];

export default function ResetDataModal({ open, onClose, onDone }) {
  const [selected, setSelected] = React.useState(["enrollments", "referrals", "callbacks"]);
  const [phrase, setPhrase] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [result, setResult] = React.useState(null);

  React.useEffect(() => {
    if (open) {
      setSelected(["enrollments", "referrals", "callbacks"]);
      setPhrase("");
      setLoading(false);
      setError("");
      setResult(null);
    }
  }, [open]);

  if (!open) return null;

  const toggle = (id) => {
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  };

  const submit = async () => {
    setError("");
    if (phrase !== "DELETE ALL") {
      setError("Type DELETE ALL exactly to confirm.");
      return;
    }
    if (selected.length === 0) {
      setError("Pick at least one data type to erase.");
      return;
    }
    setLoading(true);
    try {
      const { data } = await api.post("/admin/reset-data", {
        confirm: phrase,
        scopes: selected,
      });
      setResult(data);
      onDone?.();
    } catch (err) {
      setError(err?.response?.data?.detail || "Failed to erase data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[60] bg-slate-900/70 backdrop-blur-sm grid place-items-center p-4"
      data-testid="reset-data-modal"
    >
      <div className="bg-white rounded-2xl w-full max-w-md relative eng-shadow p-7">
        <button onClick={onClose} className="absolute right-3 top-3 p-2 rounded-lg hover:bg-slate-100" data-testid="reset-close">
          <X size={18} />
        </button>

        {!result ? (
          <>
            <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 grid place-items-center">
              <AlertTriangle size={22} />
            </div>
            <h3 className="mt-4 font-display font-bold text-xl text-slate-900">Erase admin data</h3>
            <p className="text-sm text-slate-500 mt-1">
              This <strong>permanently deletes</strong> the selected data. Course content settings are kept.
            </p>

            <div className="mt-5 space-y-2">
              {SCOPES.map((s) => (
                <label key={s.id} className="flex items-center gap-3 border border-slate-200 rounded-lg px-3 py-2.5 cursor-pointer hover:bg-slate-50">
                  <input
                    type="checkbox"
                    checked={selected.includes(s.id)}
                    onChange={() => toggle(s.id)}
                    className="w-4 h-4 accent-red-600"
                    data-testid={`reset-scope-${s.id}`}
                  />
                  <span className="text-sm font-medium text-slate-900">{s.label}</span>
                </label>
              ))}
            </div>

            <div className="mt-5">
              <label className="text-xs font-mono uppercase tracking-widest text-slate-500">
                Type <span className="text-red-600 font-bold">DELETE ALL</span> to confirm
              </label>
              <input
                data-testid="reset-confirm-input"
                value={phrase}
                onChange={(e) => setPhrase(e.target.value)}
                placeholder="DELETE ALL"
                className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 font-mono uppercase tracking-widest focus:outline-none focus:border-red-500"
              />
            </div>

            {error && <div className="mt-3 text-sm text-red-600" data-testid="reset-error">{error}</div>}

            <div className="mt-6 flex items-center gap-3">
              <button onClick={onClose} className="flex-1 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50" data-testid="reset-cancel">
                Cancel
              </button>
              <button
                onClick={submit}
                disabled={loading || phrase !== "DELETE ALL"}
                data-testid="reset-submit"
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold"
              >
                {loading ? <><Loader2 size={16} className="animate-spin" /> Erasing…</> : <><Trash2 size={16} /> Erase Data</>}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 grid place-items-center">
              <Trash2 size={22} />
            </div>
            <h3 className="mt-4 font-display font-bold text-xl text-slate-900">Data erased</h3>
            <ul className="mt-3 space-y-1 text-sm text-slate-700 font-mono" data-testid="reset-result">
              {result.enrollments_deleted != null && <li>Enrollments removed: {result.enrollments_deleted}</li>}
              {result.callbacks_deleted != null && <li>Callbacks removed: {result.callbacks_deleted}</li>}
              {result.referrals_deleted != null && <li>Referrals removed: {result.referrals_deleted}</li>}
            </ul>
            <button
              onClick={onClose}
              data-testid="reset-done"
              className="mt-6 btn-primary w-full justify-center"
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
}
