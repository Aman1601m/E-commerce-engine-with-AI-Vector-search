import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AuthLayout from './layouts/AuthLayout';
import AdminLayout from './layouts/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Users from './pages/Users';

import StoreLayout from './layouts/StoreLayout';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Wishlist from './pages/Wishlist';
import Account from './pages/Account';
import Search from './pages/Search';
import ProductDetail from './pages/ProductDetail';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <>
      <ScrollToTop />
      <Toaster position="top-right" toastOptions={{ style: { background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' } }} />
      <Routes>
        {/* Public Storefront Routes */}
        <Route element={<StoreLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/account" element={<Account />} />
          <Route path="/search" element={<Search />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Route>

        {/* Public Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/resetpassword/:token" element={<ResetPassword />} />
        </Route>

        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute requiredRole="admin"><AdminLayout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/users" element={<Users />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
