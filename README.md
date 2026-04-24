# Navjyoti Kids Villa School (MERN)

Monorepo layout: **React (Vite)** in `frontend/`, **Express + MongoDB** in `backend/`.

## Structure

```
play school/
├── frontend/          # React app
│   ├── src/
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── eslint.config.js
│   ├── components.json
│   ├── jsconfig.json
│   └── package.json
├── backend/           # REST API
│   ├── server.js      # entry point
│   ├── server/        # config, controllers, models, routes, middleware
│   ├── package.json
│   └── .env.example
└── README.md
```

## Backend

```bash
cd backend
copy .env.example .env
# Edit .env: MONGODB_URI, JWT_SECRET, CLIENT_URL=http://localhost:5173
npm install
npm run dev
```

API: `http://localhost:5000` · routes under `/api`.

Optional: `npm run seed` to create an admin user (see script defaults).

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Dev server (usually `http://localhost:5173`) proxies `/api` → `http://localhost:5000`.  
To call the API directly, set `VITE_API_URL=http://localhost:5000/api` in `frontend/.env` (see `frontend/.env.example`).

## Production build (frontend)

```bash
cd frontend
npm run build
npm run preview
```

Set `VITE_API_URL` to your deployed API URL if it is on another origin.

## Hostinger Deployment (No Vercel)

This repo is now prepared for Hostinger deployment:
- Vercel config removed (`frontend/vercel.json` deleted).
- Frontend API fallback uses relative `/api` in production.
- Backend CORS supports one or more origins via `CLIENT_URL` (comma-separated).

### Deploy as two apps (recommended by Hostinger)

1. **Frontend app**
   - Project path: `frontend/`
   - Build command: `npm run build`
   - Output folder: `dist`
   - Domain: `https://www.navjyotikidsvillaschool.in` (or apex)

2. **Backend app**
   - Project path: `backend/`
   - Entry file: `server.js`
   - Domain: `https://api.navjyotikidsvillaschool.in`

If main domain points to backend, React pages will 404. Main domain must point to frontend app.

### 1) Deploy backend (Node.js app)

Use Hostinger Node.js setup for the `backend/` app.

Required environment variables (panel):
- `PORT` (provided by Hostinger or set by app runtime)
- `MONGODB_URI`
- `JWT_SECRET`
- `JWT_EXPIRES_IN=7d`
- `CLIENT_URL=https://www.navjyotikidsvillaschool.in`

If you use both apex + www, set:
- `CLIENT_URL=https://www.navjyotikidsvillaschool.in,https://navjyotikidsvillaschool.in`

Install/start:
```bash
cd backend
npm install
npm run start
```

### 2) Build frontend

```bash
cd frontend
npm install
npm run build
```

Upload/publish `frontend/dist` to Hostinger public web root (`public_html`), or configure Hostinger build pipeline to publish the `dist` folder.
Set frontend env for production API:

`VITE_API_URL=https://api.navjyotikidsvillaschool.in/api`

### 3) SPA refresh fix (.htaccess)

For React Router routes like `/Home`, create `public_html/.htaccess`:

```apacheconf
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

### 4) API routing on Hostinger

Choose one of these:
- **Subdomain API (recommended):** host backend at `api.navjyotikidsvillaschool.in`, set `VITE_API_URL=https://api.navjyotikidsvillaschool.in/api` during frontend build.
- **Same domain `/api`:** reverse-proxy `/api` from main domain to Node backend in Hostinger panel/web server config.

If you use the subdomain approach, add `VITE_API_URL` before running `npm run build`:
```bash
# Linux/macOS
VITE_API_URL=https://api.navjyotikidsvillaschool.in/api npm run build
```

```powershell
# Windows PowerShell
$env:VITE_API_URL="https://api.navjyotikidsvillaschool.in/api"; npm run build
```
