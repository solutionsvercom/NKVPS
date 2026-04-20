/**
 * REST API surface → Node.js Express backend (Axios only).
 */
import { restDelete, restGet, restPatch, restPost } from './http.js';

export const authService = {
  async register(body) {
    return restPost('/auth/register', body);
  },
  async login(body) {
    return restPost('/auth/login', body);
  },
  async me() {
    return restGet('/auth/me');
  },
};

function qs(sort, limit) {
  const params = {};
  if (sort) params.sort = sort;
  if (limit != null) params.limit = limit;
  return { params };
}

export const studentsApi = {
  list: (sort = '-created_date') => restGet('/students', qs(sort)),
  create: (body) => restPost('/students', body),
  update: (id, body) => restPatch(`/students/${id}`, body),
  remove: (id) => restDelete(`/students/${id}`),
};

export const teachersApi = {
  list: (sort = '-created_date') => restGet('/teachers', qs(sort)),
  create: (body) => restPost('/teachers', body),
  update: (id, body) => restPatch(`/teachers/${id}`, body),
  remove: (id) => restDelete(`/teachers/${id}`),
};

export const eventsApi = {
  list: (sort = '-date', limit) => restGet('/events', qs(sort, limit)),
  create: (body) => restPost('/events', body),
  update: (id, body) => restPatch(`/events/${id}`, body),
  remove: (id) => restDelete(`/events/${id}`),
};

export const announcementsApi = {
  list: (sort = '-created_date', limit) => restGet('/announcements', qs(sort, limit)),
  create: (body) => restPost('/announcements', body),
  update: (id, body) => restPatch(`/announcements/${id}`, body),
  remove: (id) => restDelete(`/announcements/${id}`),
};

export const feesApi = {
  list: (sort = '-created_date') => restGet('/fees', qs(sort)),
  create: (body) => restPost('/fees', body),
  update: (id, body) => restPatch(`/fees/${id}`, body),
};

export const attendanceApi = {
  list: (sort, limit, date) => {
    const params = {};
    if (sort) params.sort = sort;
    if (limit != null) params.limit = limit;
    if (date) params.date = date;
    return restGet('/attendance', { params });
  },
  create: (body) => restPost('/attendance', body),
  update: (id, body) => restPatch(`/attendance/${id}`, body),
};

export const homeworkApi = {
  list: (sort = '-created_date') => restGet('/homework', qs(sort)),
  create: (body) => restPost('/homework', body),
  update: (id, body) => restPatch(`/homework/${id}`, body),
  remove: (id) => restDelete(`/homework/${id}`),
};

export const activitiesApi = {
  list: (sort = '-date') => restGet('/activities', qs(sort)),
  create: (body) => restPost('/activities', body),
  update: (id, body) => restPatch(`/activities/${id}`, body),
  remove: (id) => restDelete(`/activities/${id}`),
};

export const messagesApi = {
  list: (sort = '-created_date', limit = 100) => restGet('/messages', qs(sort, limit)),
  create: (body) => restPost('/messages', body),
};

export const galleryApi = {
  list: () => restGet('/gallery'),
};

export const admissionsApi = {
  create: (body) => restPost('/admissions/inquiries', body),
  list: (sort = '-created_date') => restGet('/admissions/inquiries', qs(sort)),
  update: (id, body) => restPatch(`/admissions/inquiries/${id}`, body),
};

export const contactApi = {
  submit: (body) => restPost('/contact', body),
};

export async function invokeLLM(prompt) {
  const data = await restPost('/ai/invoke', { prompt });
  return data.response;
}
