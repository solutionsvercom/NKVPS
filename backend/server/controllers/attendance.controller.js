import { Attendance } from '../models/Attendance.js';
import { Student } from '../models/Student.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { AppError } from '../middleware/errorHandler.js';
import { serialize, serializeMany } from '../utils/serialize.js';
import { parseSort } from '../utils/sort.js';

export const listAttendance = asyncHandler(async (req, res) => {
  const q = {};
  if (req.query.date) q.date = req.query.date;
  if (req.user.role === 'parent') {
    const studs = await Student.find({ parent_email: req.user.email }).lean();
    const ids = studs.map((s) => s._id.toString());
    q.student_id = { $in: ids };
  }
  const sort = parseSort(req.query.sort, 'createdAt');
  const limit = req.query.limit ? Number(req.query.limit) : undefined;
  let query = Attendance.find(q).sort(sort);
  if (limit) query = query.limit(limit);
  const rows = await query;
  res.json(serializeMany(rows));
});

export const upsertAttendance = asyncHandler(async (req, res) => {
  const { student_id, student_name, program, date, status } = req.body;
  const existing = await Attendance.findOne({ student_id, date });
  if (existing) {
    existing.status = status;
    if (student_name) existing.student_name = student_name;
    if (program) existing.program = program;
    await existing.save();
    return res.json(serialize(existing));
  }
  const row = await Attendance.create({ student_id, student_name, program, date, status });
  res.status(201).json(serialize(row));
});

export const updateAttendance = asyncHandler(async (req, res) => {
  const row = await Attendance.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!row) throw new AppError('Not found', 404);
  res.json(serialize(row));
});
