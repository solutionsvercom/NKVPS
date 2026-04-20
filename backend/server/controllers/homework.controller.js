import { Homework } from '../models/Homework.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { AppError } from '../middleware/errorHandler.js';
import { serialize, serializeMany } from '../utils/serialize.js';
import { parseSort } from '../utils/sort.js';

export const listHomework = asyncHandler(async (req, res) => {
  const sort = parseSort(req.query.sort, 'createdAt');
  const rows = await Homework.find().sort(sort);
  res.json(serializeMany(rows));
});

export const createHomework = asyncHandler(async (req, res) => {
  const row = await Homework.create(req.body);
  res.status(201).json(serialize(row));
});

export const updateHomework = asyncHandler(async (req, res) => {
  const row = await Homework.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!row) throw new AppError('Not found', 404);
  res.json(serialize(row));
});

export const deleteHomework = asyncHandler(async (req, res) => {
  const row = await Homework.findByIdAndDelete(req.params.id);
  if (!row) throw new AppError('Not found', 404);
  res.json({ ok: true });
});
