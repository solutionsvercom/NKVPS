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
