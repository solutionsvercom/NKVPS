/**
 * Axios client for the Node.js (Express) REST API.
 * baseURL ends with /api — routes are mounted at /api on the server.
 */
import axios from 'axios';

const baseURL =
  (import.meta.env.VITE_API_URL && String(import.meta.env.VITE_API_URL).trim()) ||
  (import.meta.env.DEV ? '/api' : 'http://localhost:5000/api');

export const apiClient = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/** @param {string} path - path relative to baseURL (e.g. '/students') */
export async function restGet(path, config) {
  const { data } = await apiClient.get(path, config);
  return data;
}

export async function restPost(path, body, config) {
  const { data } = await apiClient.post(path, body, config);
  return data;
}

export async function restPatch(path, body, config) {
  const { data } = await apiClient.patch(path, body, config);
  return data;
}

export async function restDelete(path, config) {
  const { data } = await apiClient.delete(path, config);
  return data;
}

/** @deprecated use `apiClient` */
export const http = apiClient;
export default apiClient;
