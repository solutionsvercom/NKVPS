import { AdmissionInquiry } from '../models/AdmissionInquiry.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { AppError } from '../middleware/errorHandler.js';
import { serialize, serializeMany } from '../utils/serialize.js';
import { parseSort } from '../utils/sort.js';
import { sendAdmissionMails } from '../services/mail.service.js';

function trimStr(v) {
  if (v == null) return '';
  return String(v).trim();
}

/** Normalize body from JSON / form so Mongoose never receives NaN or junk keys. */
function normalizeInquiryPayload(body) {
  const rawAge = body?.child_age;
  let child_age;
  if (rawAge === '' || rawAge == null) {
    child_age = undefined;
  } else {
    const n = Number(rawAge);
    child_age = Number.isFinite(n) ? n : undefined;
  }
  const email = trimStr(body?.email);
  return {
    child_name: trimStr(body?.child_name),
    child_age,
    parent_name: trimStr(body?.parent_name),
    email: email || undefined,
    phone: trimStr(body?.phone) || undefined,
    program_interest: trimStr(body?.program_interest) || undefined,
    message: trimStr(body?.message) || undefined,
    source: trimStr(body?.source) || 'website',
  };
}

export const createInquiry = asyncHandler(async (req, res) => {
  const payload = normalizeInquiryPayload(req.body);
  const row = await AdmissionInquiry.create(payload);
  sendAdmissionMails(row.toObject ? row.toObject() : row).catch((err) =>
    console.error('[mail] admission notify failed:', err.message)
  );
  res.status(201).json(serialize(row));
});

export const listInquiries = asyncHandler(async (req, res) => {
  const sort = parseSort(req.query.sort, 'createdAt');
  const rows = await AdmissionInquiry.find().sort(sort);
  res.json(serializeMany(rows));
});

export const updateInquiry = asyncHandler(async (req, res) => {
  const row = await AdmissionInquiry.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!row) throw new AppError('Not found', 404);
  res.json(serialize(row));
});
