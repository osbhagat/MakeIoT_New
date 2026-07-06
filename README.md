# Make IoT — Embedded Systems & IoT Internship Platform

Full-stack web platform that lets students enroll in Make IoT's 4-week Embedded / IoT internships,
pay via Razorpay, and receive an auto-generated offer letter + course-access email. Includes an
admin dashboard with referral tracking and course-content management.

**Production stack**

| Layer      | Tech                                   | Hosting              |
|------------|----------------------------------------|----------------------|
| Frontend   | React 19 (CRACO)                       | **Cloudflare Pages** |
| Backend    | FastAPI + Motor (async MongoDB driver) | **Railway**          |
| Database   | MongoDB (Atlas)                        | **MongoDB Atlas**    |
| Payments   | Razorpay Standard Checkout             | —                    |
| Email      | Resend (transactional API)             | —                    |
| Source     | GitHub                                 | —                    |

---

## Repository structure

```
.
├── backend/                       # FastAPI application
│   ├── server.py                  # Main app (routes, models, auth, integrations)
│   ├── offer_letter.py            # PDF generation (ReportLab)
│   ├── requirements.txt
│   ├── Procfile                   # Railway startup
│   ├── railway.json               # Railway build/deploy config
│   ├── .env.example
│   └── pytest.ini
├── frontend/                      # React SPA
│   ├── src/                       # Components, pages, lib
│   ├── public/
│   │   └── _redirects             # Cloudflare Pages SPA fallback
│   ├── craco.config.js            # Build overrides
│   ├── package.json
│   ├── .env.example
│   └── tailwind.config.js
├── .gitignore
└── README.md
```

---

## Local development

### Prerequisites
- Python 3.11+
- Node 20+ and Yarn
- A MongoDB Atlas cluster (or local `mongod`)
- Razorpay test keys, Resend API key

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate            # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env                 # fill in real values
uvicorn server:app --reload --port 8001
```

Verify: `curl http://localhost:8001/api/` should return
`{"message":"MakeIoT API is live",...}`.

### Frontend

```bash
cd frontend
yarn install
cp .env.example .env                 # set REACT_APP_BACKEND_URL=http://localhost:8001
yarn start
```

Opens `http://localhost:3000`.

---

## Environment variables

### Backend (`backend/.env`)

| Variable                | Purpose                                              | Example                                    |
|-------------------------|------------------------------------------------------|--------------------------------------------|
| `MONGO_URL`             | MongoDB Atlas connection string                      | `mongodb+srv://user:pass@cluster.net/...`  |
| `DB_NAME`               | Database name                                        | `makeiot_database`                         |
| `CORS_ORIGINS`          | Comma-separated allowed origins (no `*` with cookies)| `https://makeiot.in,https://www.makeiot.in`|
| `FRONTEND_URL`          | Public site URL (used in emails/referral links)     | `https://makeiot.in`                       |
| `RAZORPAY_KEY_ID`       | Razorpay API key id                                  | `rzp_live_xxxxxxxx`                        |
| `RAZORPAY_KEY_SECRET`   | Razorpay API key secret                              | (kept server-side only)                    |
| `RESEND_API_KEY`        | Resend API key                                       | `re_xxxxxxxxxxxxxxxx`                      |
| `SENDER_EMAIL`          | Must be at a Resend-verified domain                  | `hello@onbording.makeiot.in`               |
| `REPLY_TO_EMAIL`        | Where student replies go                             | `hello@makeiot.in`                         |
| `SENDER_NAME`           | Display name                                         | `Make IoT Team`                            |
| `REFERRAL_DISCOUNT_INR` | Referral discount amount                             | `200`                                      |
| `ADMIN_EMAIL`           | Admin dashboard login                                | `admin@makeiot.in`                         |
| `ADMIN_PASSWORD`        | Admin dashboard password                             | (long random)                              |
| `JWT_SECRET`            | Signs the admin session cookie                       | (48+ random chars)                         |

Generate a strong `JWT_SECRET`:
```bash
python -c "import secrets; print(secrets.token_urlsafe(48))"
```

### Frontend (`frontend/.env`)

| Variable                 | Purpose                    | Example                              |
|--------------------------|----------------------------|--------------------------------------|
| `REACT_APP_BACKEND_URL`  | Base URL of the API (no /) | `https://api.makeiot.in`             |

---

## Build & run commands

### Backend

```bash
# install
pip install -r backend/requirements.txt
# run (production)
cd backend && uvicorn server:app --host 0.0.0.0 --port ${PORT:-8001}
```

### Frontend

```bash
cd frontend
yarn install
yarn build            # emits ./build (static site)
```

---

## Deployment

### 1) Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin git@github.com:<your-org>/makeiot.git
git push -u origin main
```

Confirm none of your real `.env` files are pushed:
```bash
git ls-files | grep -E '(^|/)\.env$' && echo "SECRETS COMMITTED - ABORT" || echo "OK — no .env committed"
```

### 2) Backend on Railway

1. Go to https://railway.app → **New Project → Deploy from GitHub repo**.
2. Pick the repo and set **Root Directory** to `backend`.
3. Railway auto-detects `railway.json` / `Procfile` and uses:
   ```
   uvicorn server:app --host 0.0.0.0 --port ${PORT:-8001}
   ```
4. **Variables** tab → add every variable from `backend/.env.example` (with real values).
5. Deploy. Railway provisions an HTTPS URL like `https://makeiot-api.up.railway.app`.
6. Health check: `GET /api/` should return `200 OK`.

**Custom domain** (recommended): Railway → Settings → **Networking → Custom Domain** →
`api.makeiot.in`. Add the CNAME shown to Hostinger DNS. Wait for SSL to provision (~5 min).

### 3) MongoDB Atlas

1. Create a free-tier cluster at https://cloud.mongodb.com.
2. **Database Access** → create a user with `readWrite` on `makeiot_database`.
3. **Network Access** → allow `0.0.0.0/0` (or Railway's egress IPs if known).
4. Copy the connection string into `MONGO_URL` in Railway variables.

### 4) Frontend on Cloudflare Pages

1. Cloudflare Dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
2. Pick the GitHub repo.
3. **Build settings**:
   - Framework preset: **Create React App**
   - Build command: `yarn install && yarn build`
   - Build output directory: `build`
   - Root directory: `frontend`
   - Node version (env var): `NODE_VERSION=20`
4. **Environment variables** → add `REACT_APP_BACKEND_URL=https://api.makeiot.in`
   (both **Production** and **Preview** environments).
5. Deploy.

**Custom domain**: Cloudflare Pages → Custom domains → add `makeiot.in` and `www.makeiot.in`.
Cloudflare handles DNS if the domain is on Cloudflare; otherwise add a CNAME at Hostinger.

The `public/_redirects` file ensures React Router SPA routes (`/admin/login`,
`/admin/dashboard`, etc.) don't 404 on hard refresh.

### 5) Post-deploy checklist

- [ ] `GET https://api.makeiot.in/api/` returns `razorpay_enabled: true, email_enabled: true`
- [ ] Site loads at `https://makeiot.in`
- [ ] Admin login works at `/admin/login`
- [ ] Enroll → payment flow shows Razorpay modal (test card `4111 1111 1111 1111`, OTP `1111`
      in test mode; live cards in live mode)
- [ ] Post-payment email arrives with the offer-letter PDF attachment
- [ ] Backend `CORS_ORIGINS` includes both `https://makeiot.in` and
      `https://www.makeiot.in`

---

## GitHub workflow (recommended)

- `main` — production. Auto-deploys via Cloudflare Pages + Railway on push.
- Feature branches → PR → merge to `main`.
- Cloudflare Pages builds preview deploys on every non-`main` PR at
  `<pr-hash>.<project>.pages.dev`.
- To promote a change: merge PR → Railway rebuilds backend, Cloudflare rebuilds frontend.

Never commit:
- `.env` (any variant)
- `credentials.json`, `*.pem`, `*.key`
- `memory/`, `test_reports/`, `.emergent/` — these are ignored by `.gitignore`.

---

## Rotating secrets

If a secret leaks (chat, screenshot, wrong repo), rotate it immediately:

- **Razorpay** — Dashboard → Account Settings → API Keys → **Regenerate**.
- **Resend** — Dashboard → API Keys → revoke + create new.
- **MongoDB** — Atlas → Database Access → edit user, set new password.
- **Admin / JWT** — change `ADMIN_PASSWORD` and rotate `JWT_SECRET` in Railway; redeploy.
  All active admin sessions will be invalidated.

After rotating, redeploy the backend (Railway will pick up new env vars automatically).

---

## API reference (public)

| Method | Path                       | Purpose                                    |
|--------|----------------------------|--------------------------------------------|
| GET    | `/api/`                    | Health check                               |
| GET    | `/api/programs`            | List internship programs                   |
| POST   | `/api/enrollments`         | Create enrollment (optional referral code) |
| POST   | `/api/callbacks`           | Request a callback                         |
| POST   | `/api/referrals/validate`  | Validate a referral code                   |
| POST   | `/api/razorpay/create-order` | Create Razorpay order                    |
| POST   | `/api/razorpay/verify`     | Verify payment signature                   |

Admin-only routes (require login cookie): under `/api/admin/*`.

---

## License

Proprietary — © Make IoT. All rights reserved.
