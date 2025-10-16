// api/axios.js
import axios from 'axios';

const API = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? import.meta.env.VITE_API_URL || 'https://launchpad-deploy.onrender.com'
      : 'http://localhost:3000/api/v1',
  withCredentials: true, // Keep this if you're using cookies/sessions
});

// Attach token if present
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
