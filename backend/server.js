import './load-env.js';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB, disconnectDB } from './server/config/db.js';
import routes from './server/routes/index.js';
import { errorHandler } from './server/middleware/errorHandler.js';
import { logMailStartup } from './server/services/mail.service.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, 'public');
const envOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

/** Vite dev / preview — always allowed when NODE_ENV is not production so local dev works alongside production CLIENT_URL. */
const localDevOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:4173',
  'http://127.0.0.1:4173',
];

const allowedOrigins =
  process.env.NODE_ENV === 'production'
    ? envOrigins
    : [...new Set([...localDevOrigins, ...envOrigins])];

app.use(
  cors({
    origin(origin, callback) {
      // Allow browser-less requests and same-origin server calls.
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  }),
);
app.use(express.json({ limit: '1mb' }));

app.use('/api', routes);

app.use(errorHandler);
app.use(express.static(publicDir));
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  return res.sendFile(path.join(publicDir, 'index.html'));
});

const PORT = process.env.PORT || 5000;

const shutdown = async () => {
  await disconnectDB();
  process.exit(0);
};
process.once('SIGINT', shutdown);
process.once('SIGTERM', shutdown);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`API listening on http://localhost:${PORT}`);
      logMailStartup();
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
