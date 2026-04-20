import { Message } from '../models/Message.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { serialize, serializeMany } from '../utils/serialize.js';
import { parseSort } from '../utils/sort.js';

export const listMessages = asyncHandler(async (req, res) => {
  const email = req.user.email;
  const sort = parseSort(req.query.sort, 'createdAt');
  const limit = req.query.limit ? Number(req.query.limit) : 200;
  const rows = await Message.find({
    $or: [{ sender_email: email }, { receiver_email: email }],
  })
    .sort(sort)
    .limit(limit);
  res.json(serializeMany(rows));
});

export const createMessage = asyncHandler(async (req, res) => {
  const row = await Message.create(req.body);
  res.status(201).json(serialize(row));
});
