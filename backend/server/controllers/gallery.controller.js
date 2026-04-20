import { GalleryItem } from '../models/GalleryItem.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { AppError } from '../middleware/errorHandler.js';
import { serialize, serializeMany } from '../utils/serialize.js';

export const listGallery = asyncHandler(async (req, res) => {
  const rows = await GalleryItem.find().sort({ createdAt: -1 });
  res.json(serializeMany(rows));
});

export const createGalleryItem = asyncHandler(async (req, res) => {
  const row = await GalleryItem.create(req.body);
  res.status(201).json(serialize(row));
});

export const deleteGalleryItem = asyncHandler(async (req, res) => {
  const row = await GalleryItem.findByIdAndDelete(req.params.id);
  if (!row) throw new AppError('Not found', 404);
  res.json({ ok: true });
});
