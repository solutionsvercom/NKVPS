import { AppError } from '../middleware/errorHandler.js';

/**
 * Same secret must be used for sign + verify. In development, falls back if JWT_SECRET is unset
 * (avoids 500 on register when .env is incomplete).
 */
export function getJwtSecret() {
  const s = process.env.JWT_SECRET?.trim();
  if (s) return s;
  if (process.env.NODE_ENV === 'production') {
    throw new AppError('Server misconfiguration: set JWT_SECRET in backend/.env', 500);
  }
  return 'dev-only-jwt-secret-change-me';
}
