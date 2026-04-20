import { asyncHandler } from '../utils/asyncHandler.js';
import { AppError } from '../middleware/errorHandler.js';

function fallbackReply(prompt) {
  const p = (prompt || '').toLowerCase();
  if (p.includes('fee') || p.includes('₹')) {
    return 'Our fee structure: Playgroup ₹3,000/month, Nursery ₹3,500/month, LKG ₹4,000/month, UKG ₹4,500/month. One-time registration ₹5,000. For the latest details, please call +91 98765 43210 or email hello@navjyotikidsvilla.edu.';
  }
  if (p.includes('admission') || p.includes('enrol')) {
    return 'To join Navjyoti Kids Villa School: submit the inquiry form on our website, visit the campus for a tour, meet our educators, then complete enrollment. We\'re happy to help at hello@navjyotikidsvilla.edu.';
  }
  if (p.includes('time') || p.includes('hour')) {
    return 'School hours are 8:30 AM – 1:30 PM (Mon–Sat). Extended care is available until 4:00 PM.';
  }
  if (p.includes('program') || p.includes('playgroup') || p.includes('nursery')) {
    return 'We offer Playgroup, Nursery, Lower KG, and Upper KG with play-based learning. Each program is designed for age-appropriate development.';
  }
  return 'Thanks for your message! Navjyoti Kids Villa School focuses on joyful, safe, and nurturing early learning. For specifics, contact us at +91 98765 43210 or hello@navjyotikidsvilla.edu. (Configure OPENAI_API_KEY on the server for full AI replies.)';
}

async function openAiComplete(prompt) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return null;
  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1024,
    }),
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.choices?.[0]?.message?.content?.trim() || null;
}

export const invokeLLM = asyncHandler(async (req, res) => {
  const prompt = req.body?.prompt;
  if (!prompt || typeof prompt !== 'string') throw new AppError('prompt is required', 400);

  let text = await openAiComplete(prompt);
  if (!text) text = fallbackReply(prompt);

  res.json({ response: text });
});
