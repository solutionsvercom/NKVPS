import { Event } from '../models/Event.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { AppError } from '../middleware/errorHandler.js';
import { serialize, serializeMany } from '../utils/serialize.js';
import { parseSort } from '../utils/sort.js';

export const listEvents = asyncHandler(async (req, res) => {
  const sort = parseSort(req.query.sort || '-date', 'date');
  const limit = req.query.limit ? Number(req.query.limit) : undefined;
  let q = Event.find().sort(sort);
  if (limit) q = q.limit(limit);
  const rows = await q;
  res.json(serializeMany(rows));
});

export const createEvent = asyncHandler(async (req, res) => {
  const row = await Event.create(req.body);
  res.status(201).json(serialize(row));
});

export const updateEvent = asyncHandler(async (req, res) => {
  const row = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!row) throw new AppError('Not found', 404);
  res.json(serialize(row));
});

export const deleteEvent = asyncHandler(async (req, res) => {
  const row = await Event.findByIdAndDelete(req.params.id);
  if (!row) throw new AppError('Not found', 404);
  res.json({ ok: true });
});
