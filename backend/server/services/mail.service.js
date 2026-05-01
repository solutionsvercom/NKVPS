import nodemailer from 'nodemailer';

/** Public school name in email copy (override with MAIL_SCHOOL_NAME in .env). */
const SCHOOL_NAME = (process.env.MAIL_SCHOOL_NAME || 'Navjyoti Kids Villa School').trim();

/** Tagline under the name in HTML emails */
const SCHOOL_TAGLINE = (process.env.MAIL_SCHOOL_TAGLINE || "a Mother's Lap").trim();

/** Logo shown in owner notification emails — must be an absolute https URL (email clients cannot load /logo.png). */
const DEFAULT_MAIL_LOGO_URL =
  'https://www.navjyotikidsvillaschool.in/logo.png';

const PROGRAM_LABELS = {
  playgroup: 'Playgroup',
  nursery: 'Nursery',
  lkg: 'Lower KG',
  ukg: 'Upper KG',
};

function smtpConfigured() {
  return Boolean(
    process.env.SMTP_HOST?.trim() &&
      process.env.SMTP_USER?.trim() &&
      (process.env.SMTP_PASSWORD?.trim() || process.env.SMTP_PASS?.trim())
  );
}

function getPassword() {
  const raw = (process.env.SMTP_PASSWORD || process.env.SMTP_PASS || '').trim();
  return raw.replace(/\s+/g, '');
}

/** Trim, strip CR/LF ends, and optional wrapping quotes (some host env UIs add them). */
function normalizeRecipientToken(s) {
  let t = String(s).replace(/\r/g, '').trim();
  if (
    (t.startsWith('"') && t.endsWith('"')) ||
    (t.startsWith("'") && t.endsWith("'"))
  ) {
    t = t.slice(1, -1).trim();
  }
  return t;
}

/**
 * Single inbox for staff copies (admission + contact). Defaults to SMTP_USER (school Gmail).
 * Override with MAIL_OWNER_INBOX if the sending account should differ from the inbox you monitor.
 */
function ownerInbox() {
  const raw =
    process.env.MAIL_OWNER_INBOX?.trim() ||
    process.env.MAIL_ADMISSIONS_INBOX?.trim() ||
    process.env.SMTP_USER?.trim();
  const one = raw ? normalizeRecipientToken(raw) : '';
  return one ? [one] : [];
}

function mailLogoUrl() {
  const u = process.env.MAIL_LOGO_URL?.trim();
  return u || DEFAULT_MAIL_LOGO_URL;
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
  if (process.env.MAIL_DEBUG === 'true' || process.env.MAIL_DEBUG === '1') {
    console.log('[mail] sent ok →', to.join(', '), '|', subject);
  }
  return { sent: true };
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatProgramInterestForEmail(raw) {
  if (raw == null || String(raw).trim() === '') return '—';
  const key = String(raw).trim().toLowerCase();
  const label = PROGRAM_LABELS[key] || String(raw).trim();
  return escapeHtml(label);
}

function emailLayout({
  title,
  subtitle,
  innerTableHtml,
  accent = '#4A90E2',
  footerNote = 'your website admission form',
}) {
  const logo = mailLogoUrl();
  const safeTitle = escapeHtml(title);
  const safeSub = subtitle ? escapeHtml(subtitle) : '';
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>${safeTitle}</title>
</head>
<body style="margin:0;padding:0;background-color:#e8eef4;font-family:Georgia,'Times New Roman',serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#e8eef4;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 12px 40px rgba(15,23,42,0.12);">
          <tr>
            <td style="background:linear-gradient(135deg, ${accent} 0%, #2f6fb8 100%);padding:28px 24px;text-align:center;">
              <img src="${escapeHtml(logo)}" alt="${escapeHtml(SCHOOL_NAME)}" width="72" height="72" style="display:block;margin:0 auto 14px;border-radius:50%;background:#fff;padding:4px;object-fit:cover;" />
              <p style="margin:0;font-size:20px;font-weight:700;color:#ffffff;letter-spacing:0.02em;">${escapeHtml(SCHOOL_NAME)}</p>
              <p style="margin:6px 0 0;font-size:12px;color:rgba(255,255,255,0.9);text-transform:uppercase;letter-spacing:0.12em;">${escapeHtml(SCHOOL_TAGLINE)}</p>
              <p style="margin:18px 0 0;font-size:15px;color:#ffffff;font-weight:600;">${safeTitle}</p>
              ${safeSub ? `<p style="margin:8px 0 0;font-size:13px;color:rgba(255,255,255,0.88);">${safeSub}</p>` : ''}
            </td>
          </tr>
          <tr>
            <td style="padding:28px 24px 32px;">
              ${innerTableHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:16px 24px 24px;border-top:1px solid #e2e8f0;text-align:center;">
              <p style="margin:0;font-size:11px;color:#94a3b8;line-height:1.5;">This message was sent from ${escapeHtml(footerNote)}.<br/>${escapeHtml(SCHOOL_NAME)}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function detailRowsHtml(rows) {
  const body = rows
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:14px 12px 14px 0;border-bottom:1px solid #e2e8f0;font-size:13px;color:#64748b;width:36%;vertical-align:top;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">${escapeHtml(label)}</td>
        <td style="padding:14px 0;border-bottom:1px solid #e2e8f0;font-size:15px;color:#0f172a;vertical-align:top;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-weight:600;">${value}</td>
      </tr>`
    )
    .join('');
  return `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
      ${body}
    </table>`;
}

function admissionOwnerCardHtml(inquiry) {
  const child = inquiry.child_name || '—';
  const parent = inquiry.parent_name || '—';
  const phone = inquiry.phone || '—';
  const email = inquiry.email || '—';
  const age = inquiry.child_age != null && inquiry.child_age !== '' ? String(inquiry.child_age) : '—';
  const program = formatProgramInterestForEmail(inquiry.program_interest);
  const message = inquiry.message?.trim() ? escapeHtml(inquiry.message.trim()) : '<span style="color:#94a3b8;font-weight:500;">—</span>';
  const received = new Date().toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const rows = [
    ["Child's name", escapeHtml(child)],
    ['Age (years)', escapeHtml(age)],
    ["Parent / guardian", escapeHtml(parent)],
    ['Phone', escapeHtml(phone)],
    ['Email', escapeHtml(email)],
    ['Program of interest', program],
    ['Message', message],
  ];

  const inner = `
    <p style="margin:0 0 18px;font-size:14px;color:#475569;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;line-height:1.5;">
      You have a <strong style="color:#0f172a;">new admission inquiry</strong> from the website. Details below.
    </p>
    <p style="margin:0 0 16px;font-size:12px;color:#94a3b8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">Received · ${escapeHtml(received)}</p>
    ${detailRowsHtml(rows)}
  `;

  return emailLayout({
    title: 'New admission inquiry',
    subtitle: 'Website form submission',
    innerTableHtml: inner,
    footerNote: 'your website admission form',
  });
}

function admissionParentConfirmationHtml(parentName) {
  const dear = escapeHtml(parentName || 'Parent');
  const logo = mailLogoUrl();
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><title>Thank you</title></head>
<body style="margin:0;padding:0;background-color:#e8eef4;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#e8eef4;padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" style="max-width:560px;background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 10px 32px rgba(15,23,42,0.1);">
        <tr><td style="background:linear-gradient(135deg,#4A90E2 0%,#2f6fb8 100%);padding:24px;text-align:center;">
          <img src="${escapeHtml(logo)}" alt="" width="56" height="56" style="border-radius:50%;background:#fff;padding:3px;" />
          <p style="margin:12px 0 0;color:#fff;font-size:18px;font-weight:700;">${escapeHtml(SCHOOL_NAME)}</p>
        </td></tr>
        <tr><td style="padding:28px 24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:15px;color:#334155;line-height:1.65;">
          <p style="margin:0 0 12px;">Dear ${dear},</p>
          <p style="margin:0 0 12px;">Thank you for your interest in <strong>${escapeHtml(SCHOOL_NAME)}</strong>. We have received your admission inquiry and our team will contact you soon.</p>
          <p style="margin:0;color:#64748b;font-size:14px;">With warm regards,<br/><strong>${escapeHtml(SCHOOL_NAME)}</strong> Admissions</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function contactOwnerCardHtml(query) {
  const name = query.name || '—';
  const email = query.email || '—';
  const phone = query.phone || '—';
  const body = query.message?.trim() ? escapeHtml(query.message.trim()) : '—';
  const received = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
  const rows = [
    ['Name', escapeHtml(name)],
    ['Email', escapeHtml(email)],
    ['Phone', escapeHtml(phone)],
    ['Message', body],
  ];
  const inner = `
    <p style="margin:0 0 18px;font-size:14px;color:#475569;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
      New <strong>contact form</strong> message from the website.
    </p>
    <p style="margin:0 0 16px;font-size:12px;color:#94a3b8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">Received · ${escapeHtml(received)}</p>
    ${detailRowsHtml(rows)}
  `;
  return emailLayout({
    title: 'New contact message',
    subtitle: 'Website contact form',
    innerTableHtml: inner,
    accent: '#3d7fcf',
    footerNote: 'your website contact form',
  });
}

/**
 * Staff notification for a new admission inquiry + optional confirmation to parent.
 * @param {object} inquiry - Mongoose doc or plain object with inquiry fields
 */
export async function sendAdmissionMails(inquiry) {
  const owner = ownerInbox();
  const child = inquiry.child_name || '';
  const parent = inquiry.parent_name || '';
  const phone = inquiry.phone || '—';
  const email = inquiry.email || '';
  const age = inquiry.child_age != null ? String(inquiry.child_age) : '—';
  const program = inquiry.program_interest || '—';
  const message = inquiry.message?.trim() || '—';

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
  ].join('\n');

  const htmlCard = admissionOwnerCardHtml(inquiry);

  const results = [];

  if (owner.length) {
    results.push(
      await sendMessage({
        to: owner,
        subject: `[Admissions] ${child || 'New inquiry'} — ${parent || 'Parent'}`,
        text,
        html: htmlCard,
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
        subject: `We received your inquiry — ${SCHOOL_NAME}`,
        text: confirmText,
        html: admissionParentConfirmationHtml(parent),
      })
    );
  }

  return results;
}

/**
 * Staff notification for contact form + optional auto-reply to sender.
 */
export async function sendContactMails(query) {
  const owner = ownerInbox();
  const name = query.name || '';
  const email = query.email || '';
  const phone = query.phone || '—';
  const body = query.message?.trim() || '—';

  const text = [
    'New contact form message',
    '---',
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Message: ${body}`,
  ].join('\n');

  const htmlCard = contactOwnerCardHtml(query);

  const results = [];

  if (owner.length) {
    results.push(
      await sendMessage({
        to: owner,
        subject: `[Contact] ${name || 'Message'} — ${email || 'no email'}`,
        text,
        html: htmlCard,
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
        subject: `We received your message — ${SCHOOL_NAME}`,
        text: confirmText,
        html: admissionParentConfirmationHtml(name),
      })
    );
  }

  return results;
}

export function isMailConfigured() {
  return smtpConfigured();
}

/** One-line summary for server startup (no secrets). */
export function logMailStartup() {
  if (!smtpConfigured()) {
    console.warn('[mail] SMTP not set — contact/admission notify emails are skipped.');
    return;
  }
  const owner = ownerInbox();
  const line =
    (owner.length ? owner.join(', ') : '(none)') +
    (process.env.MAIL_OWNER_INBOX?.trim() || process.env.MAIL_ADMISSIONS_INBOX?.trim()
      ? ''
      : ' (MAIL_OWNER_INBOX unset; using SMTP_USER)');
  console.log('[mail] Owner inbox (form notifications) →', line);
}
