import { Student } from '../models/Student.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { AppError } from '../middleware/errorHandler.js';
import { serialize, serializeMany } from '../utils/serialize.js';
import { parseSort } from '../utils/sort.js';

export const listStudents = asyncHandler(async (req, res) => {
  const sort = parseSort(req.query.sort, 'createdAt');
  const q = {};
  if (req.user.role === 'parent') {
    q.parent_email = req.user.email;
  }
  const rows = await Student.find(q).sort(sort);
  res.json(serializeMany(rows));
});

export const createStudent = asyncHandler(async (req, res) => {
  const row = await Student.create(req.body);
  res.status(201).json(serialize(row));
});

export const updateStudent = asyncHandler(async (req, res) => {
  const row = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!row) throw new AppError('Not found', 404);
  res.json(serialize(row));
});

export const deleteStudent = asyncHandler(async (req, res) => {
  const row = await Student.findByIdAndDelete(req.params.id);
  if (!row) throw new AppError('Not found', 404);
  res.json({ ok: true });
});
