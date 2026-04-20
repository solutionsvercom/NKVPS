import nodemailer from 'nodemailer';

/** Public school name in email copy (override with MAIL_SCHOOL_NAME in .env). */
const SCHOOL_NAME = (process.env.MAIL_SCHOOL_NAME || 'Navjyoti Kids Villa School').trim();

function smtpConfigured() {
  return Boolean(
    process.env.SMTP_HOST?.trim() &&
      process.env.SMTP_USER?.trim() &&
      (process.env.SMTP_PASSWORD?.trim() || process.env.SMTP_PASS?.trim())
  );
}

function getPassword() {
  const raw = (process.env.SMTP_PASSWORD || process.env.SMTP_PASS || '').trim();
  // Gmail app passwords are 16 chars, often pasted with spaces — SMTP expects no spaces.
  return raw.replace(/\s+/g, '');
}

function notifyAddresses() {
  const raw = process.env.MAIL_NOTIFY_TO?.trim();
  if (raw) {
    return raw
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
  }
  const fallback = process.env.SMTP_USER?.trim();
  return fallback ? [fallback] : [];
}

function fromAddress() {
  const configured = process.env.MAIL_FROM?.trim();
  if (configured) return configured;
  const user = process.env.SMTP_USER?.trim();
  return user ? `${SCHOOL_NAME} <${user}>` : undefined;
}

let transporterCache;

function getTransporter() {
  if (!smtpConfigured()) return null;
  if (!transporterCache) {
    const port = Number(process.env.SMTP_PORT) || 587;
    // Port 465: SSL (secure: true). Port 587: STARTTLS (secure: false — nodemailer upgrades the connection).
    const secure =
      process.env.SMTP_SECURE === 'true' || process.env.SMTP_SECURE === '1' || port === 465;
    transporterCache = nodemailer.createTransport({
      host: process.env.SMTP_HOST.trim(),
      port,
      secure,
      auth: {
        user: process.env.SMTP_USER.trim(),
        pass: getPassword(),
      },
      ...(port === 587 && !secure ? { requireTLS: true } : {}),
    });
  }
  return transporterCache;
}

async function sendMessage({ to, subject, text, html, replyTo }) {
  const transport = getTransporter();
  const from = fromAddress();
  if (!transport || !from || !to?.length) {
    if (!smtpConfigured()) {
      console.warn('[mail] SMTP not configured (set SMTP_HOST, SMTP_USER, SMTP_PASSWORD). Skipping send.');
    }
    return { skipped: true };
  }

  await transport.sendMail({
    from,
    to: to.join(', '),
    subject,
    text,
    html: html || `<pre style="font-family:sans-serif;white-space:pre-wrap">${escapeHtml(text)}</pre>`,
    ...(replyTo ? { replyTo } : {}),
  });
  return { sent: true };
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Staff notification for a new admission inquiry + optional confirmation to parent.
 * @param {object} inquiry - Mongoose doc or plain object with inquiry fields
 */
export async function sendAdmissionMails(inquiry) {
  const staff = notifyAddresses();
  const child = inquiry.child_name || '';
  const parent = inquiry.parent_name || '';
  const phone = inquiry.phone || '—';
  const email = inquiry.email || '';
  const age = inquiry.child_age != null ? String(inquiry.child_age) : '—';
  const program = inquiry.program_interest || '—';
  const message = inquiry.message?.trim() || '—';
  const id = inquiry._id ? inquiry._id.toString() : inquiry.id || '';

  const text = [
    'New admission inquiry (website)',
    '---',
    `Child: ${child}`,
    `Age: ${age}`,
    `Parent: ${parent}`,
    `Phone: ${phone}`,
    `Email: ${email || '—'}`,
    `Program interest: ${program}`,
    `Message: ${message}`,
    id ? `Record ID: ${id}` : '',
  ]
    .filter(Boolean)
    .join('\n');

  const html = `
    <h2 style="font-family:sans-serif;color:#333">New admission inquiry</h2>
    <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
      <tr><td style="padding:4px 12px 4px 0;color:#666">Child</td><td><strong>${escapeHtml(child)}</strong></td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#666">Age</td><td>${escapeHtml(age)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#666">Parent</td><td>${escapeHtml(parent)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#666">Phone</td><td>${escapeHtml(phone)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#666">Email</td><td>${escapeHtml(email || '—')}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#666">Program</td><td>${escapeHtml(program)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;vertical-align:top;color:#666">Message</td><td>${escapeHtml(message)}</td></tr>
    </table>
  `;

  const results = [];

  if (staff.length) {
    results.push(
      await sendMessage({
        to: staff,
        subject: `[Admissions] Inquiry: ${child || 'New'} — ${parent || 'Parent'}`,
        text,
        html,
        replyTo: email || undefined,
      })
    );
  }

  const auto =
    process.env.MAIL_SEND_AUTO_REPLY === 'true' ||
    process.env.MAIL_SEND_AUTO_REPLY === '1' ||
    process.env.MAIL_SEND_AUTO_REPLY === undefined;
  if (auto && email) {
    const confirmText = [
      `Dear ${parent || 'Parent'},`,
      '',
      `Thank you for your interest in ${SCHOOL_NAME}. We have received your admission inquiry and will contact you soon.`,
      '',
      `— ${SCHOOL_NAME} Admissions`,
    ].join('\n');
    results.push(
      await sendMessage({
        to: [email],
        subject: 'We received your admission inquiry',
        text: confirmText,
        html: `<p style="font-family:sans-serif">${confirmText.replace(/\n/g, '<br/>')}</p>`,
      })
    );
  }

  return results;
}

/**
 * Staff notification for contact form + optional auto-reply to sender.
 */
export async function sendContactMails(query) {
  const staff = notifyAddresses();
  const name = query.name || '';
  const email = query.email || '';
  const phone = query.phone || '—';
  const body = query.message?.trim() || '—';
  const id = query._id ? query._id.toString() : query.id || '';

  const text = [
    'New contact form message',
    '---',
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Message: ${body}`,
    id ? `Record ID: ${id}` : '',
  ]
    .filter(Boolean)
    .join('\n');

  const html = `
    <h2 style="font-family:sans-serif;color:#333">Contact form</h2>
    <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
      <tr><td style="padding:4px 12px 4px 0;color:#666">Name</td><td><strong>${escapeHtml(name)}</strong></td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#666">Email</td><td>${escapeHtml(email)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#666">Phone</td><td>${escapeHtml(phone)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;vertical-align:top;color:#666">Message</td><td>${escapeHtml(body)}</td></tr>
    </table>
  `;

  const results = [];

  if (staff.length) {
    results.push(
      await sendMessage({
        to: staff,
        subject: `[Contact] ${name || 'Message'} — ${email || 'no email'}`,
        text,
        html,
        replyTo: email || undefined,
      })
    );
  }

  const auto =
    process.env.MAIL_SEND_AUTO_REPLY === 'true' ||
    process.env.MAIL_SEND_AUTO_REPLY === '1' ||
    process.env.MAIL_SEND_AUTO_REPLY === undefined;
  if (auto && email) {
    const confirmText = [
      `Dear ${name || 'there'},`,
      '',
      `Thank you for contacting ${SCHOOL_NAME}. We have received your message and will get back to you shortly.`,
      '',
      `— ${SCHOOL_NAME}`,
    ].join('\n');
    results.push(
      await sendMessage({
        to: [email],
        subject: 'We received your message',
        text: confirmText,
        html: `<p style="font-family:sans-serif">${confirmText.replace(/\n/g, '<br/>')}</p>`,
      })
    );
  }

  return results;
}

export function isMailConfigured() {
  return smtpConfigured();
}
