import { Teacher } from '../models/Teacher.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { AppError } from '../middleware/errorHandler.js';
import { serialize, serializeMany } from '../utils/serialize.js';
import { parseSort } from '../utils/sort.js';

export const listTeachers = asyncHandler(async (req, res) => {
  const sort = parseSort(req.query.sort, 'createdAt');
  const rows = await Teacher.find().sort(sort);
  res.json(serializeMany(rows));
});

export const createTeacher = asyncHandler(async (req, res) => {
  const row = await Teacher.create(req.body);
  res.status(201).json(serialize(row));
});

export const updateTeacher = asyncHandler(async (req, res) => {
  const row = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!row) throw new AppError('Not found', 404);
  res.json(serialize(row));
});

export const deleteTeacher = asyncHandler(async (req, res) => {
  const row = await Teacher.findByIdAndDelete(req.params.id);
  if (!row) throw new AppError('Not found', 404);
  res.json({ ok: true });
});
