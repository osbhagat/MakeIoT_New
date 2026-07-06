import React from "react";
import { useNavigate } from "react-router-dom";
import {
  LogOut, Users, IndianRupee, Clock, Phone, RefreshCw, Gift,
  BookOpen, Wallet, Save, Loader2, Mail, Trash2,
} from "lucide-react";
import { api } from "../lib/api";
import ResetDataModal from "../components/ResetDataModal";

export default function AdminDashboard() {
  const nav = useNavigate();
  const [stats, setStats] = React.useState(null);
  const [enrollments, setEnrollments] = React.useState([]);
  const [callbacks, setCallbacks] = React.useState([]);
  const [referrals, setReferrals] = React.useState([]);
  const [topReferrers, setTopReferrers] = React.useState([]);
  const [courseContent, setCourseContent] = React.useState([]);
  const [tab, setTab] = React.useState("enrollments");
  const [loading, setLoading] = React.useState(false);
  const [resetOpen, setResetOpen] = React.useState(false);

  const load = React.useCallback(async () => {
    setLoading(true);
    try {
      const [s, e, c, r, tr, cc] = await Promise.all([
        api.get("/admin/stats"),
        api.get("/admin/enrollments"),
        api.get("/admin/callbacks"),
        api.get("/admin/referrals"),
        api.get("/admin/top-referrers"),
        api.get("/admin/course-content"),
      ]);
      setStats(s.data);
      setEnrollments(e.data);
      setCallbacks(c.data);
      setReferrals(r.data);
      setTopReferrers(tr.data);
      setCourseContent(cc.data);
    } catch (err) {
      if (err?.response?.status === 401) {
        nav("/admin/login");
      }
    } finally {
      setLoading(false);
    }
  }, [nav]);

  React.useEffect(() => {
    // Verify session (httpOnly cookie) via /admin/me; if unauthorized, redirect.
    api.get("/admin/me")
      .then(() => load())
      .catch(() => nav("/admin/login"));
  }, [load, nav]);

  const logout = async () => {
    try { await api.post("/admin/logout"); } catch { /* ignore */ }
    nav("/admin/login");
  };

  return (
    <div className="min-h-screen bg-slate-50" data-testid="admin-dashboard-page">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/assets/logo.png" alt="Make IoT" className="h-12 w-auto object-contain" />
            <div className="text-xs text-slate-500 font-mono border-l border-slate-200 pl-3">ADMIN · ENROLLMENT DASHBOARD</div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={load} data-testid="admin-refresh-btn" className="btn-outline !py-2 !px-3 text-sm">
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} /> Refresh
            </button>
            <button
              onClick={() => setResetOpen(true)}
              data-testid="admin-reset-btn"
              className="inline-flex items-center gap-1.5 py-2 px-3 text-sm font-semibold rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition"
            >
              <Trash2 size={16} /> Erase Data
            </button>
            <button onClick={logout} data-testid="admin-logout-btn" className="btn-primary !py-2 !px-3 text-sm">
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </header>

      <ResetDataModal
        open={resetOpen}
        onClose={() => setResetOpen(false)}
        onDone={load}
      />

      <main className="max-w-7xl mx-auto px-5 lg:px-8 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard icon={<Users size={18} />} label="Enrollments" value={stats?.total_enrollments ?? "—"} testid="stat-total" />
          <StatCard icon={<IndianRupee size={18} />} label="Revenue" value={stats ? `₹${stats.revenue_inr}` : "—"} testid="stat-revenue" accent />
          <StatCard icon={<Clock size={18} />} label="Pending" value={stats?.pending ?? "—"} testid="stat-pending" />
          <StatCard icon={<Gift size={18} />} label="Referrals" value={stats?.referrals_count ?? "—"} testid="stat-referrals" />
          <StatCard icon={<Wallet size={18} />} label="Credits Due" value={stats ? `₹${stats.outstanding_credits_inr}` : "—"} testid="stat-credits" />
        </div>

        <div className="mt-8 flex gap-1 border-b border-slate-200 overflow-x-auto">
          <TabBtn testid="tab-enrollments" active={tab === "enrollments"} onClick={() => setTab("enrollments")}>
            Enrollments ({enrollments.length})
          </TabBtn>
          <TabBtn testid="tab-referrals" active={tab === "referrals"} onClick={() => setTab("referrals")}>
            Referrals ({referrals.length})
          </TabBtn>
          <TabBtn testid="tab-credits" active={tab === "credits"} onClick={() => setTab("credits")}>
            Credits ({topReferrers.length})
          </TabBtn>
          <TabBtn testid="tab-course-content" active={tab === "course-content"} onClick={() => setTab("course-content")}>
            Course Content
          </TabBtn>
          <TabBtn testid="tab-callbacks" active={tab === "callbacks"} onClick={() => setTab("callbacks")}>
            Callbacks ({callbacks.length})
          </TabBtn>
        </div>

        {tab === "enrollments" && <EnrollmentsTable rows={enrollments} onReload={load} />}
        {tab === "referrals" && <ReferralsTable rows={referrals} />}
        {tab === "credits" && <CreditsTable rows={topReferrers} />}
        {tab === "course-content" && <CourseContentEditor rows={courseContent} onReload={load} />}
        {tab === "callbacks" && <CallbacksTable rows={callbacks} />}
      </main>
    </div>
  );
}

function StatCard({ icon, label, value, testid, accent }) {
  return (
    <div data-testid={testid} className={`rounded-xl border p-5 bg-white ${accent ? "border-[#F97316]/40 eng-shadow-accent" : "border-slate-200 eng-shadow"}`}>
      <div className="flex items-center gap-2 text-slate-500 text-xs font-mono uppercase tracking-widest">
        {icon} {label}
      </div>
      <div className="mt-3 font-display font-bold text-3xl text-slate-900">{value}</div>
    </div>
  );
}

function TabBtn({ children, active, onClick, testid }) {
  return (
    <button onClick={onClick} data-testid={testid}
      className={`px-5 py-3 text-sm font-medium border-b-2 -mb-px transition whitespace-nowrap ${
        active ? "border-[#0055FF] text-[#0055FF]" : "border-transparent text-slate-500 hover:text-slate-900"
      }`}>
      {children}
    </button>
  );
}

function StatusBadge({ status }) {
  const map = {
    paid: "bg-green-100 text-green-700 border-green-200",
    pending: "bg-amber-100 text-amber-700 border-amber-200",
    failed: "bg-red-100 text-red-700 border-red-200",
  };
  return (
    <span className={`inline-flex text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded border ${map[status] || "bg-slate-100 text-slate-700 border-slate-200"}`}>
      {status}
    </span>
  );
}

function EnrollmentsTable({ rows, onReload }) {
  const [resending, setResending] = React.useState("");
  const resend = async (id) => {
    setResending(id);
    try { await api.post("/admin/resend-email", { enrollment_id: id }); onReload(); }
    finally { setResending(""); }
  };
  return (
    <div className="mt-6 bg-white border border-slate-200 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr className="text-left text-xs font-mono uppercase tracking-widest text-slate-500">
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Contact</th>
              <th className="px-5 py-3">Program</th>
              <th className="px-5 py-3">Amount</th>
              <th className="px-5 py-3">Ref Code</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (<tr><td colSpan={8} className="px-5 py-8 text-center text-slate-500">No enrollments yet.</td></tr>)}
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-slate-100">
                <td className="px-5 py-3">
                  <div className="font-medium text-slate-900">{r.name}</div>
                  {r.college && <div className="text-xs text-slate-500">{r.college}</div>}
                </td>
                <td className="px-5 py-3">
                  <div className="text-slate-700">{r.email}</div>
                  <div className="text-xs text-slate-500 font-mono">{r.phone}</div>
                </td>
                <td className="px-5 py-3 text-slate-700">{r.program_name}</td>
                <td className="px-5 py-3 font-mono">
                  ₹{r.amount_inr}
                  {r.discount_inr > 0 && (
                    <div className="text-[10px] text-green-600">−₹{r.discount_inr} referral</div>
                  )}
                </td>
                <td className="px-5 py-3 font-mono text-xs">
                  {r.referral_code_own && <div className="text-[#F97316] font-semibold">{r.referral_code_own}</div>}
                  {r.referral_code_used && <div className="text-slate-500">via {r.referral_code_used}</div>}
                  {r.credits_earned_inr > 0 && (
                    <div className="text-[10px] text-green-700 font-mono">+ ₹{r.credits_earned_inr} credits</div>
                  )}
                </td>
                <td className="px-5 py-3">
                  <StatusBadge status={r.payment_status} />
                  {r.email_sent && <div className="text-[10px] text-green-600 font-mono mt-1">✓ email sent</div>}
                </td>
                <td className="px-5 py-3 text-xs text-slate-500 font-mono">{new Date(r.created_at).toLocaleString()}</td>
                <td className="px-5 py-3">
                  {r.payment_status === "paid" && (
                    <button onClick={() => resend(r.id)} disabled={resending === r.id}
                      data-testid={`resend-email-${r.id}`}
                      className="inline-flex items-center gap-1 text-xs text-[#0055FF] hover:underline">
                      {resending === r.id ? <Loader2 size={12} className="animate-spin" /> : <Mail size={12} />}
                      Resend
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ReferralsTable({ rows }) {
  return (
    <div className="mt-6 bg-white border border-slate-200 rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr className="text-left text-xs font-mono uppercase tracking-widest text-slate-500">
            <th className="px-5 py-3">Referrer</th>
            <th className="px-5 py-3">Code</th>
            <th className="px-5 py-3">Referred Friend</th>
            <th className="px-5 py-3">Credit</th>
            <th className="px-5 py-3">Date</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (<tr><td colSpan={5} className="px-5 py-8 text-center text-slate-500">No referrals yet.</td></tr>)}
          {rows.map((r) => (
            <tr key={r.id} className="border-b border-slate-100">
              <td className="px-5 py-3">
                <div className="font-medium">{r.referrer_name}</div>
                <div className="text-xs text-slate-500">{r.referrer_email}</div>
              </td>
              <td className="px-5 py-3 font-mono text-[#F97316] font-semibold">{r.referrer_code}</td>
              <td className="px-5 py-3">
                <div className="font-medium">{r.referred_name}</div>
                <div className="text-xs text-slate-500">{r.referred_email}</div>
              </td>
              <td className="px-5 py-3 font-mono text-green-700 font-semibold">+ ₹{r.credit_amount_inr}</td>
              <td className="px-5 py-3 text-xs text-slate-500 font-mono">{new Date(r.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CreditsTable({ rows }) {
  return (
    <div className="mt-6 bg-white border border-slate-200 rounded-xl overflow-hidden">
      <div className="p-5 border-b border-slate-100 bg-slate-50">
        <div className="text-sm text-slate-600">
          Users below are owed credit for successful referrals. Fulfil via cash / Amazon gift card / next-batch discount.
        </div>
      </div>
      <table className="w-full text-sm">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr className="text-left text-xs font-mono uppercase tracking-widest text-slate-500">
            <th className="px-5 py-3">Name</th>
            <th className="px-5 py-3">Contact</th>
            <th className="px-5 py-3">Code</th>
            <th className="px-5 py-3">Credit Owed</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (<tr><td colSpan={4} className="px-5 py-8 text-center text-slate-500">No credits earned yet.</td></tr>)}
          {rows.map((r) => (
            <tr key={r.id} className="border-b border-slate-100">
              <td className="px-5 py-3 font-medium">{r.name}</td>
              <td className="px-5 py-3">
                <div>{r.email}</div><div className="text-xs text-slate-500 font-mono">{r.phone}</div>
              </td>
              <td className="px-5 py-3 font-mono text-[#F97316]">{r.referral_code_own}</td>
              <td className="px-5 py-3 font-mono font-bold text-green-700">₹{r.credits_earned_inr}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CourseContentEditor({ rows, onReload }) {
  const [drafts, setDrafts] = React.useState({});
  const [saving, setSaving] = React.useState("");
  React.useEffect(() => {
    const d = {};
    rows.forEach((r) => { d[r.program_id] = { ...r }; });
    setDrafts(d);
  }, [rows]);

  const update = (pid, field, val) => {
    setDrafts((d) => ({ ...d, [pid]: { ...d[pid], [field]: val } }));
  };
  const save = async (pid) => {
    setSaving(pid);
    try {
      const d = drafts[pid];
      await api.put(`/admin/course-content/${pid}`, {
        program_id: pid,
        course_link: d.course_link || "",
        coupon_code: d.coupon_code || "",
        whatsapp_group_link: d.whatsapp_group_link || "",
        welcome_note: d.welcome_note || "",
      });
      onReload();
    } finally { setSaving(""); }
  };

  return (
    <div className="mt-6 space-y-5">
      <div className="rounded-xl border border-slate-200 bg-blue-50/60 p-4 text-sm text-slate-700 flex gap-3">
        <BookOpen size={18} className="text-[#0055FF] shrink-0 mt-0.5" />
        <div>
          Content added here is emailed automatically to a student the moment their payment succeeds — Udemy course link, coupon code, WhatsApp group invite, and a welcome note.
        </div>
      </div>
      {rows.map((r) => {
        const d = drafts[r.program_id] || {};
        return (
          <div key={r.program_id} className="rounded-xl border border-slate-200 bg-white p-6" data-testid={`content-card-${r.program_id}`}>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <div className="font-display font-bold text-lg text-slate-900">{r.program_name}</div>
                <div className="text-xs text-slate-500 font-mono">₹{r.program_amount_inr} · ID: {r.program_id}</div>
              </div>
              <button onClick={() => save(r.program_id)} disabled={saving === r.program_id}
                data-testid={`save-content-${r.program_id}`}
                className="btn-primary !py-2 !px-4 text-sm">
                {saving === r.program_id ? <><Loader2 className="animate-spin" size={14}/> Saving…</> : <><Save size={14}/> Save</>}
              </button>
            </div>
            <div className="mt-5 grid md:grid-cols-2 gap-4">
              <ContentField label="Course Link (Udemy / other)"
                value={d.course_link || ""}
                onChange={(v) => update(r.program_id, "course_link", v)}
                placeholder="https://www.udemy.com/course/..."
                testid={`content-link-${r.program_id}`} />
              <ContentField label="Coupon / Access Code"
                value={d.coupon_code || ""}
                onChange={(v) => update(r.program_id, "coupon_code", v)}
                placeholder="MAKEIOT100OFF"
                testid={`content-coupon-${r.program_id}`} />
              <ContentField label="WhatsApp Group Invite Link" className="md:col-span-2"
                value={d.whatsapp_group_link || ""}
                onChange={(v) => update(r.program_id, "whatsapp_group_link", v)}
                placeholder="https://chat.whatsapp.com/..."
                testid={`content-wa-${r.program_id}`} />
              <ContentField label="Welcome Note (optional)" textarea className="md:col-span-2"
                value={d.welcome_note || ""}
                onChange={(v) => update(r.program_id, "welcome_note", v)}
                placeholder="Batch starts on X. First live session on Y…"
                testid={`content-note-${r.program_id}`} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ContentField({ label, value, onChange, placeholder, className = "", textarea, testid }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-xs font-mono uppercase tracking-widest text-slate-500">{label}</span>
      {textarea ? (
        <textarea data-testid={testid} value={value} onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder} rows={3}
          className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:border-[#0055FF]" />
      ) : (
        <input data-testid={testid} value={value} onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:outline-none focus:border-[#0055FF]" />
      )}
    </label>
  );
}

function CallbacksTable({ rows }) {
  return (
    <div className="mt-6 bg-white border border-slate-200 rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr className="text-left text-xs font-mono uppercase tracking-widest text-slate-500">
            <th className="px-5 py-3">Name</th><th className="px-5 py-3">Phone</th>
            <th className="px-5 py-3">Email</th><th className="px-5 py-3">Requested</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (<tr><td colSpan={4} className="px-5 py-8 text-center text-slate-500">No callback requests.</td></tr>)}
          {rows.map((r) => (
            <tr key={r.id} className="border-b border-slate-100">
              <td className="px-5 py-3 font-medium">{r.name}</td>
              <td className="px-5 py-3 font-mono">{r.phone}</td>
              <td className="px-5 py-3">{r.email || "—"}</td>
              <td className="px-5 py-3 text-xs text-slate-500 font-mono">{new Date(r.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
