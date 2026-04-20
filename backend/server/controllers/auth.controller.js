import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import { User } from '../models/User.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { AppError } from '../middleware/errorHandler.js';
import { serialize } from '../utils/serialize.js';
import { getJwtSecret } from '../utils/jwtSecret.js';

const signToken = (userId) =>
  jwt.sign({ sub: userId }, getJwtSecret(), { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

export const validateRegister = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('full_name').trim().notEmpty(),
  body('role').optional().isIn(['parent', 'teacher', 'admin']),
];

export const validateLogin = [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty(),
];

export const register = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new AppError(errors.array()[0].msg, 400);

  const { email, password, full_name, role = 'parent', admin_registration_key: adminKey } = req.body;
  if (!['parent', 'teacher', 'admin'].includes(role)) throw new AppError('Invalid role for self-registration', 400);

  if (role === 'admin') {
    const expected = process.env.ADMIN_REGISTRATION_KEY?.trim();
    if (!expected) {
      throw new AppError(
        'Admin self-registration is disabled. Create the first admin with: cd backend && npm run seed (see .env.example), or set ADMIN_REGISTRATION_KEY in backend/.env.',
        403
      );
    }
    if (!adminKey || String(adminKey).trim() !== expected) {
      throw new AppError('Invalid admin registration key', 403);
    }
  }

  const existing = await User.findOne({ email });
  if (existing) throw new AppError('Email already registered', 409);

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({ email, passwordHash, full_name, role });

  const token = signToken(user._id.toString());
  res.status(201).json({ token, user: serialize(user) });
});

export const login = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new AppError(errors.array()[0].msg, 400);

  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new AppError('Invalid email or password', 401);

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) throw new AppError('Invalid email or password', 401);

  const token = signToken(user._id.toString());
  res.json({ token, user: serialize(user) });
});

export const me = asyncHandler(async (req, res) => {
  res.json(serialize(req.user));
});
