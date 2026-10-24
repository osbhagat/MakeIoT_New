const GA_MEASUREMENT_ID = "G-0E3Q4JG7EQ";

const PRODUCTION_HOSTS = new Set([
  "makeiot.in",
  "www.makeiot.in",
]);

const ADMIN_SESSION_KEY = "makeiot_admin_analytics_disabled";
const AI_SOURCE_SESSION_KEY = "makeiot_ai_referrer";
const PURCHASE_KEY_PREFIX = "makeiot_ga4_purchase_";

const PROGRAMS = {
  "arduino-iot": {
    id: "arduino-iot",
    name: "Arduino & IoT (Online)",
    price: 999,
  },
  "stm32-embedded": {
    id: "stm32-embedded",
    name: "Embedded System with STM32 (Online)",
    price: 1499,
  },
  "offline-pune": {
    id: "offline-pune",
    name: "Offline Internship — Hinjawadi, Pune",
    price: 2999,
  },
};

const AI_SOURCES = [
  {
    source: "chatgpt",
    patterns: ["chatgpt.com", "chat.openai.com", "openai.com"],
  },
  {
    source: "perplexity",
    patterns: ["perplexity.ai"],
  },
  {
    source: "copilot",
    patterns: ["copilot.microsoft.com"],
  },
  {
    source: "gemini",
    patterns: ["gemini.google.com"],
  },
  {
    source: "claude",
    patterns: ["claude.ai"],
  },
];

function isBrowser() {
  return typeof window !== "undefined";
}

function safeSessionGet(key) {
  if (!isBrowser()) return "";
  try {
    return window.sessionStorage.getItem(key) || "";
  } catch {
    return "";
  }
}

function safeSessionSet(key, value) {
  if (!isBrowser()) return;
  try {
    window.sessionStorage.setItem(key, value);
  } catch {
    // Analytics storage must never affect the application.
  }
}

function safeLocalGet(key) {
  if (!isBrowser()) return "";
  try {
    return window.localStorage.getItem(key) || "";
  } catch {
    return "";
  }
}

function safeLocalSet(key, value) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Analytics storage must never affect the application.
  }
}

function isAdminPath(pathname = "") {
  return pathname === "/admin" || pathname.startsWith("/admin/");
}

function isStudentSpecificPath(pathname = "") {
  return (
    pathname.startsWith("/assessment/") ||
    pathname.startsWith("/verify/")
  );
}

function isProductionHost() {
  if (!isBrowser()) return false;
  return PRODUCTION_HOSTS.has(window.location.hostname);
}

function isAdminAnalyticsSession() {
  return safeSessionGet(ADMIN_SESSION_KEY) === "1";
}

export function updateAnalyticsRouteState(pathname = "") {
  if (!isBrowser()) return;

  if (!isProductionHost()) {
    window[`ga-disable-${GA_MEASUREMENT_ID}`] = true;
    return;
  }

  if (isAdminPath(pathname)) {
    safeSessionSet(ADMIN_SESSION_KEY, "1");
    window[`ga-disable-${GA_MEASUREMENT_ID}`] = true;
    return;
  }

  if (isStudentSpecificPath(pathname)) {
    window[`ga-disable-${GA_MEASUREMENT_ID}`] = true;
    return;
  }

  /*
    Once this browser session has entered the admin area, keep GA4 disabled
    for the rest of that tab/session. This prevents dashboard testing and
    subsequent public-page checks by the admin from polluting sales analytics.
  */
  window[`ga-disable-${GA_MEASUREMENT_ID}`] = isAdminAnalyticsSession();
}

function analyticsEnabled() {
  if (!isBrowser()) return false;
  if (!isProductionHost()) return false;
  if (isAdminPath(window.location.pathname)) return false;
  if (isStudentSpecificPath(window.location.pathname)) return false;
  if (isAdminAnalyticsSession()) return false;
  if (window[`ga-disable-${GA_MEASUREMENT_ID}`]) return false;
  return typeof window.gtag === "function";
}

function normalizeText(value) {
  return String(value || "").trim().toLowerCase();
}

function detectAiSourceFromValue(value) {
  const normalized = normalizeText(value);
  if (!normalized) return "";

  for (const candidate of AI_SOURCES) {
    if (
      candidate.patterns.some((pattern) =>
        normalized.includes(pattern)
      )
    ) {
      return candidate.source;
    }
  }

  return "";
}

function detectAiReferrer() {
  const existing = safeSessionGet(AI_SOURCE_SESSION_KEY);
  if (existing) return existing;

  if (!isBrowser()) return "";

  const params = new URLSearchParams(window.location.search);
  const utmSource = params.get("utm_source") || "";

  const fromUtm = detectAiSourceFromValue(utmSource);
  if (fromUtm) {
    safeSessionSet(AI_SOURCE_SESSION_KEY, fromUtm);
    return fromUtm;
  }

  const referrer = document.referrer || "";
  const fromReferrer = detectAiSourceFromValue(referrer);

  if (fromReferrer) {
    safeSessionSet(AI_SOURCE_SESSION_KEY, fromReferrer);
    return fromReferrer;
  }

  return "";
}

function commonParams() {
  const aiReferrer = detectAiReferrer();

  return {
    page_path: isBrowser()
      ? `${window.location.pathname}${window.location.search}`
      : "",
    ...(aiReferrer ? { ai_referrer: aiReferrer } : {}),
  };
}

export function trackPageView({ pathname, search = "" }) {
  if (!analyticsEnabled()) return;

  try {
    const pagePath = `${pathname || window.location.pathname}${search || ""}`;

    window.gtag("event", "page_view", {
      ...commonParams(),
      page_title: document.title,
      page_location: window.location.href,
      page_path: pagePath,
    });
  } catch {
    // Page-view analytics must never affect navigation.
  }
}

export function trackEvent(name, params = {}) {
  if (!analyticsEnabled()) return;

  try {
    window.gtag("event", name, {
      ...commonParams(),
      ...params,
    });
  } catch {
    // Analytics must never interrupt enrollment/payment functionality.
  }
}

function programMeta(programId, fallback = {}) {
  const configured = PROGRAMS[programId] || {};

  return {
    id: programId || configured.id || "unknown",
    name:
      fallback.program_name ||
      configured.name ||
      programId ||
      "Unknown program",
    price:
      Number(
        fallback.amount_inr ??
          fallback.price ??
          configured.price ??
          0
      ) || 0,
  };
}

function ecommerceItem(enrollmentOrProgram = {}) {
  const programId =
    enrollmentOrProgram.program_id ||
    enrollmentOrProgram.id ||
    "";

  const meta = programMeta(programId, enrollmentOrProgram);

  const discount =
    Number(enrollmentOrProgram.discount_inr || 0) || 0;

  return {
    item_id: meta.id,
    item_name: meta.name,
    price: meta.price,
    quantity: 1,
    ...(discount > 0 ? { discount } : {}),
  };
}

export function trackViewItem(programId) {
  const meta = programMeta(programId);

  trackEvent("view_item", {
    currency: "INR",
    value: meta.price,
    items: [
      {
        item_id: meta.id,
        item_name: meta.name,
        price: meta.price,
        quantity: 1,
      },
    ],
  });
}

export function trackProgramSelect(program) {
  if (!program?.id) return;

  const meta = programMeta(program.id, {
    program_name: program.title || program.name,
    price: program.price,
  });

  trackEvent("select_item", {
    item_list_id: "home_programs",
    item_list_name: "Homepage Programs",
    items: [
      {
        item_id: meta.id,
        item_name: meta.name,
        price: meta.price,
        quantity: 1,
      },
    ],
  });
}

export function trackEnrollmentOpen({
  programId,
  ctaLocation = "unknown",
  referralEntry = false,
}) {
  trackEvent("enrollment_form_open", {
    program_id: programId || "not_selected",
    cta_location: ctaLocation,
    referral_entry: Boolean(referralEntry),
  });
}

export function trackLead(enrollment, ctaLocation = "unknown") {
  if (!enrollment) return;

  trackEvent("generate_lead", {
    currency: "INR",
    value: Number(enrollment.amount_inr || 0),
    program_id: enrollment.program_id,
    cta_location: ctaLocation,
    referral_used: Boolean(enrollment.referral_code_used),
    discount_inr: Number(enrollment.discount_inr || 0),
  });
}

export function trackBeginCheckout(enrollment) {
  if (!enrollment) return;

  const referralUsed = Boolean(enrollment.referral_code_used);

  trackEvent("begin_checkout", {
    currency: "INR",
    value: Number(enrollment.amount_inr || 0),
    program_id: enrollment.program_id,
    referral_used: referralUsed,
    discount_inr: Number(enrollment.discount_inr || 0),
    ...(referralUsed ? { coupon: "student_referral" } : {}),
    items: [ecommerceItem(enrollment)],
  });
}

export function trackPurchase(enrollment, transactionId) {
  if (!enrollment || !transactionId || !analyticsEnabled()) {
    return;
  }

  const purchaseKey = `${PURCHASE_KEY_PREFIX}${transactionId}`;

  if (safeLocalGet(purchaseKey) === "1") {
    return;
  }

  const referralUsed = Boolean(enrollment.referral_code_used);

  try {
    window.gtag("event", "purchase", {
      ...commonParams(),
      transaction_id: transactionId,
      currency: "INR",
      value: Number(enrollment.amount_inr || 0),
      program_id: enrollment.program_id,
      referral_used: referralUsed,
      discount_inr: Number(enrollment.discount_inr || 0),
      ...(referralUsed ? { coupon: "student_referral" } : {}),
      items: [ecommerceItem(enrollment)],
    });

    safeLocalSet(purchaseKey, "1");
  } catch {
    // Never allow analytics to affect a successful payment.
  }
}

export function trackCheckoutDismissed(enrollment) {
  if (!enrollment) return;

  trackEvent("checkout_dismissed", {
    program_id: enrollment.program_id,
    value: Number(enrollment.amount_inr || 0),
    currency: "INR",
    referral_used: Boolean(enrollment.referral_code_used),
  });
}

export function trackPaymentVerificationFailed(enrollment) {
  if (!enrollment) return;

  trackEvent("payment_verification_failed", {
    program_id: enrollment.program_id,
    failure_stage: "verification",
  });
}

export { GA_MEASUREMENT_ID };
