import axios from 'axios';

// Base URL points to the backend
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Interceptor to attach token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token && token !== 'undefined') {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Interceptor to handle 401 Unauthorized globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login'; // Force redirect to login
    }
    return Promise.reject(error);
  }
);

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
