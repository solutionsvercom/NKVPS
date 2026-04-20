/**
 * App data layer: real REST (`api.real.js`) or offline placeholders (`placeholderApi.js`).
 * Base44 / low-code platform SDKs are not used.
 */
import * as real from './api.real.js';
import * as placeholder from './placeholderApi.js';

const usePlaceholder = import.meta.env.VITE_USE_PLACEHOLDER_API === 'true';

const src = usePlaceholder ? placeholder : real;

export const authService = src.authService;
export const studentsApi = src.studentsApi;
export const teachersApi = src.teachersApi;
export const eventsApi = src.eventsApi;
export const announcementsApi = src.announcementsApi;
export const feesApi = src.feesApi;
export const attendanceApi = src.attendanceApi;
export const homeworkApi = src.homeworkApi;
export const activitiesApi = src.activitiesApi;
export const messagesApi = src.messagesApi;
export const galleryApi = src.galleryApi;
export const admissionsApi = src.admissionsApi;
export const contactApi = src.contactApi;
export const invokeLLM = src.invokeLLM;
