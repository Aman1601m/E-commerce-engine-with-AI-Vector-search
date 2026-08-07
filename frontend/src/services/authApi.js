import axios from 'axios';

// Base URL points to the backend
const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjust as per your backend
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

export const authApi = {
  login: async (credentials) => {
    const response = await API.post('/auth/login', credentials);
    return response.data;
  },
  register: async (userData) => {
    const response = await API.post('/auth/register', userData);
    return response.data;
  },
  getProfile: async () => {
    const response = await API.get('/users/profile');
    return response.data;
  },
  updateProfile: async (userData) => {
    const response = await API.put('/users/profile', userData);
    return response.data;
  },
  changePassword: async (passwords) => {
    const response = await API.put('/users/change-password', passwords);
    return response.data;
  },
  forgotPassword: async (email) => {
    const response = await API.post('/auth/forgotpassword', { email });
    return response.data;
  },
  resetPassword: async (token, password) => {
    const response = await API.post(`/auth/resetpassword/${token}`, { password });
    return response.data;
  },
};
