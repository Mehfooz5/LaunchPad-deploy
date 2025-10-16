// api/axios.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  withCredentials: true, // If using cookies
});

// Add token if stored in localStorage/sessionStorage
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // or from cookies
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
