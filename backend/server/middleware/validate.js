import { validationResult } from 'express-validator';

export function handleValidationErrors(req, res, next) {
  const e = validationResult(req);
  if (!e.isEmpty()) return res.status(400).json({ error: e.array()[0].msg });
  next();
}
