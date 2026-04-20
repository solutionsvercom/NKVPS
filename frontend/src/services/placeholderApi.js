/**
 * In-memory placeholder API (no network). Use when VITE_USE_PLACEHOLDER_API=true.
 * Keeps the same shapes as the Express backend so the UI does not break.
 */

const nowIso = () => new Date().toISOString();

const demoUser = {
  id: 'placeholder-user-1',
  email: 'demo@navjyotikidsvilla.local',
  full_name: 'Demo Admin',
  role: 'admin',
};

let nextId = 1;
const pid = (prefix = 'ph') => `${prefix}-${nextId++}`;

export const authService = {
  async register(body) {
    const user = {
      id: pid('user'),
      email: body.email,
      full_name: body.full_name,
      role: body.role || 'parent',
    };
    return { token: 'placeholder-token', user };
  },
  async login() {
    return { token: 'placeholder-token', user: { ...demoUser } };
  },
  async me() {
    return { ...demoUser };
  },
};

export const studentsApi = {
  list: async () => [],
  create: async (body) => ({ id: pid('stu'), ...body, created_date: nowIso() }),
  update: async (id, body) => ({ id, ...body }),
  remove: async () => ({ ok: true }),
};

export const teachersApi = {
  list: async () => [],
  create: async (body) => ({ id: pid('tch'), ...body, created_date: nowIso() }),
  update: async (id, body) => ({ id, ...body }),
  remove: async () => ({ ok: true }),
};

export const eventsApi = {
  list: async () => [],
  create: async (body) => ({ id: pid('evt'), ...body, created_date: nowIso() }),
  update: async (id, body) => ({ id, ...body }),
  remove: async () => ({ ok: true }),
};

export const announcementsApi = {
  list: async () => [],
  create: async (body) => ({ id: pid('ann'), ...body, created_date: nowIso() }),
  update: async (id, body) => ({ id, ...body }),
  remove: async () => ({ ok: true }),
};

export const feesApi = {
  list: async () => [],
  create: async (body) => ({ id: pid('fee'), ...body, created_date: nowIso() }),
  update: async (id, body) => ({ id, ...body }),
};

export const attendanceApi = {
  list: async () => [],
  create: async (body) => ({ id: pid('att'), ...body, created_date: nowIso() }),
  update: async (id, body) => ({ id, ...body }),
};

export const homeworkApi = {
  list: async () => [],
  create: async (body) => ({ id: pid('hw'), ...body, created_date: nowIso() }),
  update: async (id, body) => ({ id, ...body }),
  remove: async () => ({ ok: true }),
};

export const activitiesApi = {
  list: async () => [],
  create: async (body) => ({ id: pid('act'), ...body, created_date: nowIso() }),
  update: async (id, body) => ({ id, ...body }),
  remove: async () => ({ ok: true }),
};

export const messagesApi = {
  list: async () => [],
  create: async (body) => ({ id: pid('msg'), ...body, created_date: nowIso() }),
};

export const galleryApi = {
  list: async () => [],
};

export const admissionsApi = {
  create: async (body) => ({ id: pid('inq'), ...body, status: 'new', created_date: nowIso() }),
  list: async () => [],
  update: async (id, body) => ({ id, ...body }),
};

export const contactApi = {
  submit: async () => ({ ok: true, id: pid('contact') }),
};

export async function invokeLLM() {
  return (
    'This is a **placeholder** assistant reply. No server is called.\n\n' +
    'To use your Express API and optional OpenAI integration, set `VITE_USE_PLACEHOLDER_API=false` (or remove it) in `.env` and run the backend.'
  );
}
