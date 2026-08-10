import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthLayout = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // If already logged in, redirect to home
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backgroundColor: 'var(--store-bg)' }}>
      <div style={{ width: '100%', maxWidth: '440px', backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
