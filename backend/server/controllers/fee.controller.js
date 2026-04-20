import { Fee } from '../models/Fee.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { AppError } from '../middleware/errorHandler.js';
import { serialize, serializeMany } from '../utils/serialize.js';
import { parseSort } from '../utils/sort.js';

export const listFees = asyncHandler(async (req, res) => {
  const sort = parseSort(req.query.sort, 'createdAt');
  const q = {};
  if (req.user.role === 'parent') q.parent_email = req.user.email;
  const rows = await Fee.find(q).sort(sort);
  res.json(serializeMany(rows));
});

export const createFee = asyncHandler(async (req, res) => {
  const row = await Fee.create(req.body);
  res.status(201).json(serialize(row));
});

export const updateFee = asyncHandler(async (req, res) => {
  const row = await Fee.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!row) throw new AppError('Not found', 404);
  res.json(serialize(row));
});
