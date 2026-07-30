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
  getAllUsers: async () => {
    const response = await API.get('/users');
    return response.data;
  },
  toggleUserStatus: async (id) => {
    const response = await API.put(`/users/${id}/status`);
    return response.data;
  },
  deleteUser: async (id) => {
    const response = await API.delete(`/users/${id}`);
    return response.data;
  }
};
