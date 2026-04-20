import { Activity } from '../models/Activity.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { AppError } from '../middleware/errorHandler.js';
import { serialize, serializeMany } from '../utils/serialize.js';
import { parseSort } from '../utils/sort.js';

export const listActivities = asyncHandler(async (req, res) => {
  const sort = parseSort(req.query.sort || '-date', 'date');
  const rows = await Activity.find().sort(sort);
  res.json(serializeMany(rows));
});

export const createActivity = asyncHandler(async (req, res) => {
  const row = await Activity.create(req.body);
  res.status(201).json(serialize(row));
});

export const updateActivity = asyncHandler(async (req, res) => {
  const row = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!row) throw new AppError('Not found', 404);
  res.json(serialize(row));
});

export const deleteActivity = asyncHandler(async (req, res) => {
  const row = await Activity.findByIdAndDelete(req.params.id);
  if (!row) throw new AppError('Not found', 404);
  res.json({ ok: true });
});
