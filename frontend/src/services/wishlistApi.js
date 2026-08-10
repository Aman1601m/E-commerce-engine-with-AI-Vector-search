import axios from 'axios';
import { store } from '../store';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', 
});

API.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const wishlistApi = {
  getWishlist: async () => {
    const response = await API.get('/users/wishlist');
    return response.data;
  },
  
  addToWishlist: async (productId) => {
    const response = await API.post('/users/wishlist', { productId });
    return response.data;
  },
  
  removeFromWishlist: async (productId) => {
    const response = await API.delete(`/users/wishlist/${productId}`);
    return response.data;
  }
};
