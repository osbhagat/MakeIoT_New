import React from "react";
import { X, CheckCircle2, Loader2, CreditCard, TicketPercent, Copy, Share2 } from "lucide-react";
import { api } from "../lib/api";

const PROGRAMS = [
  { id: "arduino-iot", label: "Arduino & IoT — ₹999 (Online)", amount: 999 },
  { id: "stm32-embedded", label: "Embedded STM32 — ₹1499 (Online)", amount: 1499 },
  { id: "offline-pune", label: "Offline @ Pune — ₹2999", amount: 2999 },
];

export default function EnrollmentModal({ open, initialProgram, initialRef, onClose }) {
  const [step, setStep] = React.useState("form"); // form | paying | success
  const [form, setForm] = React.useState({
    name: "", email: "", phone: "", program_id: initialProgram || "stm32-embedded",
    college: "", message: "", referral_code: initialRef || "",
  });
  const [refStatus, setRefStatus] = React.useState({ state: "idle", discount: 0, referrer: "", message: "" });
  const [enrollment, setEnrollment] = React.useState(null);
  const [ownRefCode, setOwnRefCode] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [isMocked, setIsMocked] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      setStep("form");
      setError("");
      setEnrollment(null);
      setOwnRefCode("");
      setIsMocked(false);
      setRefStatus({ state: "idle", discount: 0, referrer: "", message: "" });
      setForm((f) => ({
        ...f,
        program_id: initialProgram || f.program_id,
        referral_code: initialRef || f.referral_code,
      }));
    }
  }, [open, initialProgram, initialRef]);

  // Auto-validate referral when both code and program are set
  React.useEffect(() => {
    if (!open) return;
    const code = form.referral_code.trim();
    if (!code) { setRefStatus({ state: "idle", discount: 0, referrer: "", message: "" }); return; }
    const t = setTimeout(async () => {
      setRefStatus((s) => ({ ...s, state: "checking" }));
      try {
        const { data } = await api.post("/referrals/validate", { code, program_id: form.program_id });
        setRefStatus({
          state: "valid",
          discount: data.discount_inr,
          referrer: data.referrer_name,
          message: `₹${data.discount_inr} off — referred by ${data.referrer_name}`,
        });
      } catch (err) {
        setRefStatus({
          state: "invalid", discount: 0, referrer: "",
          message: err?.response?.data?.detail || "Invalid code",
        });
      }
    }, 500);
    return () => clearTimeout(t);
  }, [form.referral_code, form.program_id, open]);

  if (!open) return null;

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const selectedProgram = PROGRAMS.find((p) => p.id === form.program_id);
  const finalAmount = Math.max(selectedProgram.amount - (refStatus.state === "valid" ? refStatus.discount : 0), 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.phone) {
      setError("Please fill name, email and phone.");
      return;
    }
    setLoading(true);
    try {
      const payload = { ...form };
      if (!payload.referral_code || refStatus.state !== "valid") delete payload.referral_code;
      const { data: enroll } = await api.post("/enrollments", payload);
      setEnrollment(enroll);
      const { data: order } = await api.post("/razorpay/create-order", { enrollment_id: enroll.id });
      setIsMocked(order.is_mocked);
      setStep("paying");
      if (order.is_mocked) {
        setLoading(false);
      } else {
        openRazorpay(enroll, order);
      }
    } catch (err) {
      setError(err?.response?.data?.detail || "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const openRazorpay = (enroll, order) => {
    const options = {
      key: order.key_id,
      amount: order.amount,
      currency: order.currency,
      name: "MakeIoT",
      description: enroll.program_name,
      order_id: order.order_id,
      prefill: { name: enroll.name, email: enroll.email, contact: enroll.phone },
      theme: { color: "#0055FF" },
      handler: async (res) => {
        try {
          const { data } = await api.post("/razorpay/verify", {
            enrollment_id: enroll.id,
            razorpay_order_id: res.razorpay_order_id,
            razorpay_payment_id: res.razorpay_payment_id,
            razorpay_signature: res.razorpay_signature,
          });
          setOwnRefCode(data.referral_code || "");
          setStep("success");
        } catch (err) {
          setError("Payment verification failed. Please contact support.");
          setStep("form");
        } finally {
          setLoading(false);
        }
      },
      modal: {
        ondismiss: () => { setLoading(false); setStep("form"); },
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleMockPay = async () => {
    setLoading(true);
    try {
      const { data } = await api.post("/razorpay/mock-pay", { enrollment_id: enrollment.id });
      setOwnRefCode(data.referral_code || "");
      setStep("success");
    } catch {
      setError("Simulated payment failed.");
    } finally {
      setLoading(false);
    }
  };

  const shareUrl = ownRefCode
    ? `${window.location.origin}?ref=${ownRefCode}`
    : window.location.origin;
  const waMessage = encodeURIComponent(
    `Hey! I just enrolled in Make IoT's Embedded & IoT internship 🚀\n\nUse my code ${ownRefCode} to get ₹200 off — ${shareUrl}`
  );

  const copyCode = async () => {
    await navigator.clipboard.writeText(ownRefCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div
      className="fixed inset-0 z-[60] bg-slate-900/70 backdrop-blur-sm grid place-items-center p-4 overflow-y-auto"
      data-testid="enrollment-modal"
    >
      <div className="bg-white rounded-2xl w-full max-w-2xl relative eng-shadow my-8">
        <button
          onClick={onClose}
          data-testid="enrollment-close-btn"
          className="absolute right-3 top-3 p-2 rounded-lg hover:bg-slate-100"
        >
          <X size={20} />
        </button>

        {step === "form" && (
          <form onSubmit={handleSubmit} className="p-7">
            <div className="text-xs font-mono uppercase tracking-widest text-[#0055FF]">Enroll · Step 1 of 2</div>
            <h3 className="mt-1 font-display font-bold text-2xl text-slate-900">Reserve your seat</h3>
            <p className="text-sm text-slate-500 mt-1">
              Fill in your details and complete payment to secure your slot.
            </p>

            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <Field label="Full Name *">
                <input data-testid="enroll-name" required value={form.name} onChange={update("name")}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:outline-none focus:border-[#0055FF]" />
              </Field>
              <Field label="Phone *">
                <input data-testid="enroll-phone" required value={form.phone} onChange={update("phone")}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:outline-none focus:border-[#0055FF]" />
              </Field>
              <Field label="Email *" className="sm:col-span-2">
                <input data-testid="enroll-email" type="email" required value={form.email} onChange={update("email")}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:outline-none focus:border-[#0055FF]" />
              </Field>
              <Field label="Choose Program *" className="sm:col-span-2">
                <select data-testid="enroll-program" value={form.program_id} onChange={update("program_id")}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 bg-white focus:outline-none focus:border-[#0055FF]">
                  {PROGRAMS.map((p) => (
                    <option key={p.id} value={p.id}>{p.label}</option>
                  ))}
                </select>
              </Field>
              <Field label="College (optional)">
                <input data-testid="enroll-college" value={form.college} onChange={update("college")}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:outline-none focus:border-[#0055FF]" />
              </Field>
              <Field label="Referral code (optional)">
                <div className="relative">
                  <TicketPercent size={16} className="absolute left-3 top-3 text-slate-400" />
                  <input
                    data-testid="enroll-referral"
                    value={form.referral_code}
                    onChange={(e) => setForm({ ...form, referral_code: e.target.value.toUpperCase() })}
                    placeholder="MK-XXXX-XXXX"
                    className={`w-full rounded-lg border pl-9 pr-3 py-2.5 font-mono uppercase tracking-wider focus:outline-none ${
                      refStatus.state === "valid" ? "border-green-500" :
                      refStatus.state === "invalid" ? "border-red-400" : "border-slate-300 focus:border-[#0055FF]"
                    }`}
                  />
                </div>
                {refStatus.state === "checking" && (
                  <div className="text-xs text-slate-500 mt-1" data-testid="ref-status-checking">Checking…</div>
                )}
                {refStatus.state === "valid" && (
                  <div className="text-xs text-green-700 mt-1 font-medium" data-testid="ref-status-valid">✓ {refStatus.message}</div>
                )}
                {refStatus.state === "invalid" && (
                  <div className="text-xs text-red-600 mt-1" data-testid="ref-status-invalid">{refStatus.message}</div>
                )}
              </Field>
            </div>

            <div className="mt-6 rounded-lg border border-slate-200 p-4 bg-slate-50">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">{selectedProgram.label.split(" — ")[0]}</span>
                <span className="text-slate-900 font-medium">₹{selectedProgram.amount}</span>
              </div>
              {refStatus.state === "valid" && (
                <div className="flex justify-between text-sm mt-1 text-green-700" data-testid="discount-row">
                  <span>Referral discount</span>
                  <span>− ₹{refStatus.discount}</span>
                </div>
              )}
              <div className="flex justify-between text-base mt-2 pt-2 border-t border-slate-200">
                <span className="font-semibold text-slate-900">Total</span>
                <span className="font-display font-bold text-slate-900" data-testid="final-amount">₹{finalAmount}</span>
              </div>
            </div>

            {error && <div className="mt-4 text-sm text-red-600" data-testid="enroll-error">{error}</div>}

            <button
              type="submit"
              disabled={loading}
              data-testid="enroll-submit-btn"
              className="btn-primary mt-6 w-full justify-center"
            >
              {loading ? <><Loader2 className="animate-spin" size={16} /> Processing…</> : <><CreditCard size={18} /> Continue to Payment</>}
            </button>
            <p className="text-[11px] text-slate-500 mt-3 text-center">
              Payments powered by Razorpay. UPI · Cards · NetBanking · Wallets.
            </p>
          </form>
        )}

        {step === "paying" && isMocked && (
          <div className="p-7">
            <div className="text-xs font-mono uppercase tracking-widest text-[#F97316]">Test Mode · Simulated Payment</div>
            <h3 className="mt-1 font-display font-bold text-2xl text-slate-900">Complete simulated payment</h3>
            <div className="mt-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-sm p-4">
              <strong>MOCKED:</strong> Razorpay keys not configured. Click below to simulate a successful payment.
            </div>
            <button onClick={handleMockPay} disabled={loading} data-testid="mock-pay-btn"
              className="btn-accent mt-6 w-full justify-center">
              {loading ? <><Loader2 className="animate-spin" size={16} /> Simulating…</> : "Simulate Successful Payment"}
            </button>
          </div>
        )}

        {step === "success" && (
          <div className="p-8">
            <div className="text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-green-100 text-green-600 grid place-items-center">
                <CheckCircle2 size={28} />
              </div>
              <h3 className="mt-4 font-display font-bold text-2xl text-slate-900">You&apos;re enrolled! 🎉</h3>
              <p className="mt-2 text-slate-600 max-w-md mx-auto">
                Check your email — course link, coupon &amp; onboarding details are on their way.
              </p>
            </div>

            {ownRefCode && (
              <div className="mt-6 rounded-2xl bg-[#0A0F1C] text-white p-6" data-testid="referral-share-block">
                <div className="text-xs font-mono uppercase tracking-widest text-[#F97316]">🎁 Your referral code</div>
                <div className="mt-2 font-display font-bold text-xl">Earn ₹200 per friend</div>
                <p className="text-slate-300 text-sm mt-1">
                  Share this code. Friends get ₹200 off. You earn ₹200 credit for every successful referral.
                </p>
                <div className="mt-4 flex items-center gap-2 bg-white/10 rounded-lg p-3">
                  <div className="flex-1 font-mono font-bold text-lg tracking-widest text-[#F97316]" data-testid="own-referral-code">
                    {ownRefCode}
                  </div>
                  <button onClick={copyCode} data-testid="copy-ref-code"
                    className="px-3 py-2 rounded-md bg-white/15 hover:bg-white/25 text-white text-sm inline-flex items-center gap-1.5">
                    <Copy size={14} /> {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
                <div className="mt-3 flex flex-col sm:flex-row gap-2">
                  <a
                    href={`https://wa.me/?text=${waMessage}`}
                    target="_blank" rel="noopener noreferrer"
                    data-testid="share-whatsapp"
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1DA851] text-white font-semibold py-2.5 rounded-lg"
                  >
                    <Share2 size={16} /> Share on WhatsApp
                  </a>
                  <button
                    onClick={() => { navigator.clipboard.writeText(shareUrl); setCopied(true); setTimeout(()=>setCopied(false), 1600); }}
                    className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 text-white font-semibold py-2.5 px-4 rounded-lg text-sm"
                    data-testid="copy-share-url"
                  >
                    Copy Link
                  </button>
                </div>
              </div>
            )}

            <button onClick={onClose} data-testid="enroll-close-success"
              className="btn-primary mt-6 w-full justify-center">
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, children, className = "" }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-xs font-mono uppercase tracking-widest text-slate-500">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
