import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5005/api';

const api = axios.create({ baseURL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
}, (err) => Promise.reject(err));

export default api;
