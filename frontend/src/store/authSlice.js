import { createSlice } from '@reduxjs/toolkit';

const safeParseJSON = (data) => {
  try {
    return data && data !== 'undefined' ? JSON.parse(data) : null;
  } catch (e) {
    return null;
  }
};

const initialState = {
  user: safeParseJSON(localStorage.getItem('user')),
  token: localStorage.getItem('token') && localStorage.getItem('token') !== 'undefined' ? localStorage.getItem('token') : null,
  isAuthenticated: !!(localStorage.getItem('token') && localStorage.getItem('token') !== 'undefined'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
