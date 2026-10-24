# MakeIoT GA4 Conversion Tracking Plan

## Goal

Build a reliable GA4 measurement layer that answers the business questions needed to improve MakeIoT sales:

- Which traffic sources bring qualified visitors?
- Which program attracts more enrollment intent?
- Where do users drop out between interest, form submission, checkout, and payment?
- Which channels generate actual paid enrollments and revenue?
- Does the referral program improve conversion?
- Which on-page CTAs and contact methods generate meaningful leads?

This document is the implementation contract for the GA4 work. Code changes should be made against this plan one step at a time.

---

## Current application flow confirmed from the repository

### Frontend

Primary enrollment component:

`frontend/src/components/EnrollmentModal.jsx`

Current flow:

1. User opens enrollment modal.
2. User fills name, phone, email, program, college, optional referral code.
3. Frontend calls:
   `POST /api/enrollments`
4. Backend creates a pending enrollment and returns authoritative program/payment information.
5. Frontend calls:
   `POST /api/razorpay/create-order`
6. Razorpay checkout opens.
7. On successful Razorpay callback, frontend calls:
   `POST /api/razorpay/verify`
8. Only after verification succeeds does the UI show enrollment success.

Program pages:

- `frontend/src/pages/EmbeddedSTM32.jsx`
- `frontend/src/pages/ArduinoIoT.jsx`

Landing-page enrollment entry points:

- Navbar
- Hero
- Program cards
- Referral URL auto-open
- Program-page CTA buttons

### Backend

Primary payment flow:

`backend/server.py`

Relevant endpoints:

- `POST /api/referrals/validate`
- `POST /api/enrollments`
- `POST /api/razorpay/create-order`
- `POST /api/razorpay/verify`
- `POST /api/razorpay/mock-pay`

Backend already calculates the authoritative:

- base program price
- referral discount
- final amount
- Razorpay order ID
- payment status

`finalise_paid_enrollment()` marks the enrollment paid after payment verification.

Therefore GA4 must never be used as the financial source of truth.

**Financial truth:** Razorpay + MongoDB  
**Marketing/funnel truth:** GA4

---

# Implementation additions requested after planning

The implementation also includes these requirements:

- **Admin/local analytics exclusion:** direct `/admin/*` and localhost loads do not initialize GA4 sales tracking. The same direct-load guard also prevents Clarity and PostHog from initializing on admin/local pages. Once a browser tab enters `/admin/*`, GA4 remains disabled for that tab/session so admin testing does not contaminate sales data.
- **Homepage measurement:** the homepage receives controlled `page_view` tracking, and every homepage enrollment entry point carries a `cta_location` such as `home_navbar`, `home_hero`, or `home_program_card`. This allows homepage-direct purchases to be attributed correctly even when the visitor never opens a program detail page.
- **AI referral context:** normal GA4 source/referrer attribution is preserved. In addition, when a usable referrer or `utm_source` indicates ChatGPT, Perplexity, Copilot, Gemini, or Claude, business events receive an `ai_referrer` parameter for easier AI-channel analysis. This is supplemental because some AI products may intentionally omit referrer information.
- **Controlled SPA page views:** automatic GA4 `page_view` sending is disabled and React Router emits exactly one public `page_view` per route change. This avoids duplicate SPA page views and guarantees admin-route exclusion.

---

# Measurement principles

## 1. Keep the event set small

We do not want dozens of events that create noise.

The core sales funnel should be understandable from a small number of events.

## 2. Prefer GA4 recommended events

Use Google's standard ecommerce/lead events when the MakeIoT action maps cleanly to them.

This improves compatibility with GA4 reports and future integrations.

## 3. Never send personal information to GA4

Do **not** send:

- student name
- email
- phone number
- college text entered by the user
- referral code itself
- Razorpay signature
- card/UPI/payment credentials

Allowed business parameters include:

- program ID
- program name
- price
- discount amount
- referral used: true/false
- CTA location
- payment result category
- transaction ID for the GA4 purchase event

## 4. Track purchase only after backend verification

Never fire `purchase`:

- when enrollment form is submitted
- when Razorpay checkout opens
- when Razorpay returns before verification
- from the displayed success price alone

Fire `purchase` only after:

`POST /api/razorpay/verify`

returns success with paid status.

## 5. Do not allow analytics failure to affect enrollment/payment

Analytics calls must always be non-blocking.

If:

`window.gtag`

is missing, blocked by an ad blocker, or errors, enrollment and payment must continue normally.

---

# Core GA4 funnel

## Event 1 — view_item

### Purpose

Measure a visitor viewing a specific paid program.

### Fire on

- `/program/embedded-stm32`
- `/program/arduino-iot`

### Event

`view_item`

### Example parameters

```js
{
  currency: "INR",
  value: 1499,
  items: [
    {
      item_id: "stm32-embedded",
      item_name: "Embedded System with STM32 (Online)",
      price: 1499,
      quantity: 1
    }
  ]
}
```

Arduino uses:

- item_id: `arduino-iot`
- price: `999`

### Business question answered

Which program receives the most qualified interest?

---

## Event 2 — enrollment_form_open

### Purpose

Measure users who show enrollment intent by opening the enrollment modal.

### Event type

Custom event:

`enrollment_form_open`

### Important parameters

- `program_id`
- `cta_location`
- `referral_entry` — true/false

### Suggested CTA locations

- `home_navbar`
- `home_hero`
- `home_program_card`
- `referral_auto_open`
- `stm32_navbar`
- `stm32_hero`
- `stm32_bottom_cta`
- `arduino_navbar`
- `arduino_hero`
- `arduino_bottom_cta`

### Business questions answered

- Which CTA positions create enrollment intent?
- How many program visitors actually start enrollment?
- Do referral visitors open the form at a higher rate?

---

## Event 3 — generate_lead

### Purpose

Measure a valid enrollment form that successfully created a pending enrollment in the backend.

### Fire after

`POST /api/enrollments`

returns successfully.

### Event

GA4 recommended event:

`generate_lead`

### Parameters

- `program_id`
- `referral_used` — true/false
- `discount_inr`
- `cta_location`

Do not send the enrollment ID as a custom GA4 dimension.

### Why fire after backend success?

A button click is not a real lead if:

- form validation fails
- API fails
- enrollment is not created

The backend response confirms that a real pending enrollment now exists.

### Business question answered

How many people who open the enrollment form become serious leads?

---

## Event 4 — begin_checkout

### Purpose

Measure users who reach a valid Razorpay checkout.

### Fire after

`POST /api/razorpay/create-order`

succeeds and immediately before Razorpay checkout is opened.

### Event

GA4 recommended ecommerce event:

`begin_checkout`

### Parameters

```js
{
  currency: "INR",
  value: enroll.amount_inr,
  coupon: referralUsed ? "student_referral" : undefined,
  items: [
    {
      item_id: enroll.program_id,
      item_name: enroll.program_name,
      price: enroll.amount_inr,
      quantity: 1,
      discount: enroll.discount_inr || 0
    }
  ]
}
```

Use values returned by the backend enrollment/order flow, not a frontend-only price calculation.

### Business question answered

How many qualified leads actually reach payment checkout?

---

## Event 5 — purchase

### Purpose

Measure the final paid conversion and revenue.

This is the most important GA4 event for MakeIoT.

### Fire after

`POST /api/razorpay/verify`

returns successfully.

### Event

GA4 recommended ecommerce event:

`purchase`

### Parameters

```js
{
  transaction_id: razorpayPaymentId,
  currency: "INR",
  value: enroll.amount_inr,
  coupon: referralUsed ? "student_referral" : undefined,
  items: [
    {
      item_id: enroll.program_id,
      item_name: enroll.program_name,
      price: enroll.amount_inr,
      quantity: 1,
      discount: enroll.discount_inr || 0
    }
  ]
}
```

### Duplicate protection

The same Razorpay payment must never generate two GA4 purchases.

Implementation should keep a client-side guard keyed by transaction ID, for example:

`ga4_purchase_<razorpay_payment_id>`

in session/local storage.

GA4 also uses `transaction_id` for transaction deduplication, but application-side protection is still recommended.

### Mock payments

`/razorpay/mock-pay` must **not** generate a production `purchase` event.

### GA4 configuration

Mark `purchase` as the primary Key Event / conversion.

### Business questions answered

- How many paid enrollments came from Google?
- How many came from Instagram?
- Which LinkedIn campaign generated revenue?
- Which program generates more revenue?
- What is visitor → paid conversion rate?
- What is checkout → paid conversion rate?

---

# Diagnostic checkout events

These are not primary conversions. They exist to explain lost sales.

## checkout_dismissed

Fire when Razorpay modal `ondismiss` executes.

Parameters:

- `program_id`
- `value`
- `referral_used`

Business question:

How many users voluntarily leave checkout before paying?

---

## payment_verification_failed

Fire when Razorpay returned payment information but:

`POST /api/razorpay/verify`

fails.

Parameters:

- `program_id`
- `failure_stage: "verification"`

Do not send:

- Razorpay signature
- student data

Business question:

Are users paying but our verification/backend flow is failing?

This event is especially important because a verification failure is different from a user simply abandoning checkout.

---

# Referral measurement

Do not send the actual referral code to GA4.

Use only:

- `referral_used: true/false`
- `discount_inr`
- `coupon: "student_referral"` on ecommerce events

This allows us to compare:

- referral visitors vs non-referral visitors
- checkout rate
- purchase rate
- revenue
- discount effect

without creating high-cardinality or user-specific analytics data.

---

# Marketing attribution and UTM strategy

GA4 already provides source / medium / campaign attribution.

We should use consistent UTM-tagged links for every marketing activity instead of manually adding source information to each GA4 event.

## Instagram example

```
https://makeiot.in/program/embedded-stm32?utm_source=instagram&utm_medium=organic_social&utm_campaign=stm32_internship
```

## LinkedIn example

```
https://makeiot.in/program/embedded-stm32?utm_source=linkedin&utm_medium=organic_social&utm_campaign=stm32_internship
```

## College WhatsApp distribution

```
https://makeiot.in/program/embedded-stm32?utm_source=college_whatsapp&utm_medium=partner&utm_campaign=internship&utm_content=college_name
```

## Student referral link

Current referral URL:

```
https://makeiot.in/?ref=CODE
```

Recommended future format:

```
https://makeiot.in/?ref=CODE&utm_source=student_referral&utm_medium=referral&utm_campaign=referral_program
```

The actual referral code stays in the application URL because the backend needs it, but it should not be sent as an event parameter to GA4.

---

# Supporting events — Phase 2

These are useful but should be added only after the core purchase funnel is verified.

## contact_click

Track high-intent contact actions:

- WhatsApp
- phone
- email

Parameters:

- `contact_method`
- `page_path`

This helps measure users who contact MakeIoT before buying.

## select_item

Track users clicking "View Details" from a homepage program card.

Useful for measuring:

homepage program impression → detailed program interest

## syllabus_click

Track syllabus PDF CTA clicks if GA4 automatic file-download tracking does not give enough clarity.

Before adding this custom event, check whether GA4 Enhanced Measurement already records the PDF as `file_download`.

---

# Page-view tracking for React Router

MakeIoT is a React SPA.

Current GA is initialized in:

`frontend/public/index.html`

Before adding manual SPA page views we must first test current GA4 behavior in DebugView/Realtime.

### Decision rule

If GA4 already generates one correct `page_view` for every React Router navigation:

**do not add manual page-view code.**

If route transitions are missing:

1. disable automatic initial page view where necessary
2. add a React Router route analytics component
3. emit exactly one `page_view` per pathname/search change

The priority is avoiding duplicate page views.

---

# Development/internal traffic protection

Development activity should not pollute production analytics.

Analytics helper should safely no-op for custom business events when hostname is not:

- `makeiot.in`
- `www.makeiot.in`

Mock payment must never produce production purchase revenue.

Admin pages should not generate custom sales-funnel events.

Later, if needed, GA4 internal-traffic filtering can also be configured for known office/admin IPs.

---

# Proposed analytics helper

Create:

`frontend/src/lib/analytics.js`

Responsibilities:

- check whether GA4 is available
- check production hostname
- safely emit events without throwing
- define program → GA4 item mapping
- standardize ecommerce payloads
- provide duplicate protection for purchase
- contain no UI/payment business logic

Example API shape:

```js
trackEvent(name, params)
trackViewItem(program)
trackEnrollmentOpen(programId, ctaLocation, referralEntry)
trackLead(enrollment, ctaLocation)
trackBeginCheckout(enrollment)
trackPurchase(enrollment, razorpayPaymentId)
trackCheckoutDismissed(enrollment)
trackPaymentVerificationFailed(enrollment)
```

If analytics fails, these functions should silently return and never block the user flow.

---

# Expected implementation files

## Core implementation

### New

`frontend/src/lib/analytics.js`

### Modify

`frontend/src/components/EnrollmentModal.jsx`

For:

- enrollment form open
- generate_lead
- begin_checkout
- checkout_dismissed
- payment_verification_failed
- purchase

### Modify

`frontend/src/pages/EmbeddedSTM32.jsx`

For:

- view_item
- CTA location

### Modify

`frontend/src/pages/ArduinoIoT.jsx`

For:

- view_item
- CTA location

### Modify

`frontend/src/pages/Landing.jsx`

For:

- CTA location
- referral auto-open source

### Potentially modify

`frontend/src/components/Navbar.jsx`  
`frontend/src/components/Hero.jsx`  
`frontend/src/components/Programs.jsx`

Only to pass a stable CTA-location value.

### Validate before changing

`frontend/src/App.js`

Only modify for SPA page views if testing proves route page views are currently missing.

## Backend

No backend payment logic change is required for Phase 1.

The current backend verification flow is already the gate that determines whether a purchase should be tracked.

A future server-side GA4 Measurement Protocol/webhook implementation can be considered only if client-side purchase loss becomes a measurable problem.

---

# GA4 custom dimensions

Do not register every parameter as a custom dimension.

Recommended event-scoped custom dimensions only if reporting requires them:

1. `program_id`
2. `cta_location`
3. `referral_used`
4. `failure_stage`
5. `ai_referrer`
6. `contact_method`

Do not create custom dimensions for:

- transaction ID
- referral code
- enrollment ID
- email
- phone
- student name

Program revenue can also be analyzed from ecommerce item fields without unnecessary custom dimensions.

---

# Funnel report to build after implementation

Create a GA4 Funnel Exploration:

1. `view_item`
2. `enrollment_form_open`
3. `generate_lead`
4. `begin_checkout`
5. `purchase`

Breakdowns:

- session source / medium
- session campaign
- program/item
- device category
- country
- referral_used

This produces the core MakeIoT sales funnel.

---

# Business metrics we will calculate

## Program-page → enrollment intent

```
enrollment_form_open / view_item
```

## Enrollment form → qualified lead

```
generate_lead / enrollment_form_open
```

## Lead → checkout

```
begin_checkout / generate_lead
```

## Checkout → paid

```
purchase / begin_checkout
```

## Program-page → paid conversion

```
purchase / view_item
```

## Revenue by acquisition channel

Use:

- purchase revenue
- session source / medium
- campaign

## Referral conversion

Compare purchase rate where:

`referral_used = true`

vs:

`referral_used = false`

---

# Example diagnosis

If data shows:

```
500 view_item
90 enrollment_form_open
70 generate_lead
60 begin_checkout
12 purchase
```

then:

- program page → enrollment intent = 18%
- form completion = 77.8%
- lead → checkout = 85.7%
- checkout → purchase = 20%
- overall program-page → purchase = 2.4%

The major problem would be checkout/payment conversion, not SEO or the enrollment form.

If instead:

```
500 view_item
15 enrollment_form_open
12 generate_lead
10 begin_checkout
7 purchase
```

checkout works well, but the program page/offer/CTA needs improvement.

This is why funnel tracking must be implemented before increasing marketing spend.

---

# Implementation sequence

## Step 0 — Baseline verification

- Verify current GA4 Realtime/DebugView.
- Check whether React Router route changes already generate correct page views.
- Confirm current GA measurement ID.
- Confirm mock/local development traffic behavior.

Status: **Implemented in code; live GA4 validation pending**

## Step 1 — Analytics utility

Create:

`frontend/src/lib/analytics.js`

No business-flow behavior changes.

Status: **Implemented**

## Step 2 — Program interest

Add:

- `view_item`
- CTA source propagation

Status: **Implemented**

## Step 3 — Enrollment funnel

Add:

- `enrollment_form_open`
- `generate_lead`
- `begin_checkout`

Status: **Implemented**

## Step 4 — Payment result

Add:

- `purchase`
- duplicate protection
- `checkout_dismissed`
- `payment_verification_failed`

Status: **Implemented; real-payment validation still required**

## Step 5 — GA4 configuration

- Confirm events appear in Realtime.
- Mark `purchase` as Key Event.
- Register only necessary custom dimensions.
- Build funnel exploration.

Status: **Pending after deployment**

## Step 6 — Marketing attribution

Create controlled UTM links for:

- Instagram
- LinkedIn
- college outreach
- WhatsApp
- student referrals

Status: **Pending after deployment**

## Step 7 — Supporting sales signals

Only after core funnel is stable:

- contact_click
- select_item
- syllabus tracking if required

Status: **contact_click and select_item implemented; syllabus tracking deferred unless Enhanced Measurement is insufficient**

---

# Acceptance criteria

The GA4 implementation is complete only when all of the following are true:

- Program views can be measured by program.
- Enrollment modal opens can be measured.
- Successful enrollment-record creation can be measured.
- Razorpay checkout starts can be measured.
- Verified real payments create exactly one `purchase`.
- Mock payments do not create production revenue.
- Purchase includes correct final amount after referral discount.
- Source/medium/campaign can be tied to purchases.
- No student PII is sent to GA4.
- Analytics blocking/failure cannot break enrollment or payment.
- GA4 funnel can identify the largest conversion drop-off.
- Razorpay/MongoDB remain the source of truth for financial totals.

---

# Phase 1 event summary

| Event | Type | Fires when | Primary use |
|---|---|---|---|
| `view_item` | GA4 recommended | Program detail page viewed | Program interest |
| `enrollment_form_open` | Custom | Enrollment modal opens | CTA/enrollment intent |
| `generate_lead` | GA4 recommended | Backend enrollment created | Qualified lead |
| `begin_checkout` | GA4 recommended | Razorpay order created / checkout starts | Checkout entry |
| `purchase` | GA4 recommended | Backend payment verification succeeds | Paid conversion & revenue |
| `checkout_dismissed` | Custom | Razorpay modal dismissed | Checkout abandonment |
| `payment_verification_failed` | Custom | Verify API fails after payment callback | Payment-flow diagnosis |

This is intentionally the complete core funnel. Additional events should only be added when they answer a clear business question.


---

# Code implementation status

Implemented on branch:

`ga4-conversion-tracking`

Files changed/added:

- `frontend/src/lib/analytics.js` — safe GA4 helper, ecommerce payloads, AI-referrer context, admin/local exclusion, purchase deduplication.
- `frontend/public/index.html` — disables automatic GA4 page views, prevents direct admin/local analytics initialization, and keeps Clarity/PostHog out of direct admin/local loads.
- `frontend/src/App.js` — one controlled public React Router page view per route.
- `frontend/src/pages/Landing.jsx` — homepage CTA source tracking including referral auto-open.
- `frontend/src/pages/EmbeddedSTM32.jsx` — `view_item` plus STM32 CTA source tracking.
- `frontend/src/pages/ArduinoIoT.jsx` — `view_item` plus Arduino CTA source tracking.
- `frontend/src/components/EnrollmentModal.jsx` — form-open, lead, checkout, verified purchase, checkout dismissal, and verification-failure tracking.
- `frontend/src/components/Programs.jsx` — homepage program-detail selection tracking.
- `frontend/src/components/Contact.jsx` — WhatsApp/phone/email contact-intent tracking.

No backend payment code was changed.


## Privacy implementation note

Referral links may contain `?ref=CODE` because the application needs the code to apply the discount. The analytics helper removes the `ref` query parameter from GA4 `page_path` and `page_location` values while preserving marketing parameters such as `utm_source`, `utm_medium`, and `utm_campaign`.

Student-specific routes such as `/assessment/<id>` and `/verify/<id>` are excluded from GA4 page-view tracking because their unique URL identifiers are not useful for sales analysis.
