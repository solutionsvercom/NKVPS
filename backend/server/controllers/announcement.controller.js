import { Announcement } from '../models/Announcement.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { AppError } from '../middleware/errorHandler.js';
import { serialize, serializeMany } from '../utils/serialize.js';
import { parseSort } from '../utils/sort.js';

export const listAnnouncements = asyncHandler(async (req, res) => {
  const sort = parseSort(req.query.sort, 'createdAt');
  const limit = req.query.limit ? Number(req.query.limit) : undefined;
  let q = Announcement.find().sort(sort);
  if (limit) q = q.limit(limit);
  const rows = await q;
  res.json(serializeMany(rows));
});

export const createAnnouncement = asyncHandler(async (req, res) => {
  const row = await Announcement.create(req.body);
  res.status(201).json(serialize(row));
});

export const updateAnnouncement = asyncHandler(async (req, res) => {
  const row = await Announcement.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!row) throw new AppError('Not found', 404);
  res.json(serialize(row));
});

export const deleteAnnouncement = asyncHandler(async (req, res) => {
  const row = await Announcement.findByIdAndDelete(req.params.id);
  if (!row) throw new AppError('Not found', 404);
  res.json({ ok: true });
});
