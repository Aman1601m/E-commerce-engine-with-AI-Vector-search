import axios from 'axios';

// Base URL points to the backend
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Interceptor to attach token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const userApi = {
  getStats: async () => {
    const response = await API.get('/users/stats');
    return response.data;
  },
};
