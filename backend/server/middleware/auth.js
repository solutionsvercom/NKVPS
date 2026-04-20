import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { AppError } from './errorHandler.js';
import { getJwtSecret } from '../utils/jwtSecret.js';

function getToken(req) {
  const h = req.headers.authorization;
  if (h?.startsWith('Bearer ')) return h.slice(7);
  return null;
}

export const optionalAuth = asyncHandler(async (req, res, next) => {
  const token = getToken(req);
  if (!token) return next();
  try {
    const payload = jwt.verify(token, getJwtSecret());
    const user = await User.findById(payload.sub).select('-passwordHash');
    if (user) req.user = user;
  } catch {
    /* ignore */
  }
  next();
});

export const requireAuth = asyncHandler(async (req, res, next) => {
  const token = getToken(req);
  if (!token) throw new AppError('Authentication required', 401);
  let payload;
  try {
    payload = jwt.verify(token, getJwtSecret());
  } catch {
    throw new AppError('Invalid or expired token', 401);
  }
  const user = await User.findById(payload.sub).select('-passwordHash');
  if (!user) throw new AppError('User not found', 401);
  req.user = user;
  next();
});

export function requireRoles(...roles) {
  return (req, res, next) => {
    if (!req.user) return next(new AppError('Authentication required', 401));
    if (!roles.includes(req.user.role)) {
      return next(new AppError('Forbidden', 403));
    }
    next();
  };
}
