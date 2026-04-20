import { ContactQuery } from '../models/ContactQuery.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendContactMails } from '../services/mail.service.js';

function normalizeContactBody(body) {
  return {
    name: String(body?.name ?? '').trim(),
    email: String(body?.email ?? '').trim(),
    phone: body?.phone != null ? String(body.phone).trim() : undefined,
    message: String(body?.message ?? '').trim(),
  };
}

export const createContact = asyncHandler(async (req, res) => {
  const payload = normalizeContactBody(req.body);
  const row = await ContactQuery.create(payload);
  sendContactMails(row.toObject ? row.toObject() : row).catch((err) =>
    console.error('[mail] contact notify failed:', err.message)
  );
  res.status(201).json({ ok: true, id: row._id.toString() });
});
