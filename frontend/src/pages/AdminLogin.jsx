import React from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Loader2 } from "lucide-react";
import { api } from "../lib/api";

export default function AdminLogin() {
  const [email, setEmail] = React.useState("admin@makeiot.in");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api.post("/admin/login", { email, password });
      nav("/admin/dashboard");
    } catch (err) {
      setError(err?.response?.data?.detail || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 grid place-items-center px-4" data-testid="admin-login-page">
      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 eng-shadow p-8">
        <div className="w-12 h-12 rounded-xl bg-[#0055FF]/10 text-[#0055FF] grid place-items-center">
          <Lock size={22} />
        </div>
        <h1 className="mt-4 font-display font-bold text-2xl text-slate-900">Admin Login</h1>
        <p className="text-sm text-slate-500 mt-1">Sign in to manage enrollments.</p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-mono uppercase tracking-widest text-slate-500">Email</label>
            <input
              data-testid="admin-email-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:outline-none focus:border-[#0055FF]"
              required
            />
          </div>
          <div>
            <label className="text-xs font-mono uppercase tracking-widest text-slate-500">Password</label>
            <input
              data-testid="admin-password-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:outline-none focus:border-[#0055FF]"
              required
            />
          </div>
          {error && <div className="text-sm text-red-600" data-testid="admin-login-error">{error}</div>}
          <button
            type="submit"
            data-testid="admin-login-submit"
            disabled={loading}
            className="btn-primary w-full justify-center"
          >
            {loading ? <><Loader2 className="animate-spin" size={16} /> Signing in…</> : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
