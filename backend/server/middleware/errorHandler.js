import mongoose from 'mongoose';

export class AppError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.status = status;
  }
}

export function errorHandler(err, req, res, next) {
  if (err?.code === 11000) {
    const field = err.keyPattern ? Object.keys(err.keyPattern)[0] : 'field';
    return res.status(409).json({ error: field === 'email' ? 'Email already registered' : 'Duplicate entry' });
  }
  if (err instanceof mongoose.Error.ValidationError) {
    const first = Object.values(err.errors)[0];
    return res.status(400).json({ error: first?.message || 'Validation failed' });
  }
  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({ error: 'Invalid data format' });
  }

  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  if (process.env.NODE_ENV !== 'production' && status === 500) {
    console.error(err);
  }
  res.status(status).json({ error: message });
}
