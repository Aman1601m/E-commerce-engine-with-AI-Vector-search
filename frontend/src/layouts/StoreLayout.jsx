import React from 'react';
import { Outlet } from 'react-router-dom';
import StoreNavbar from '../components/storefront/StoreNavbar';
import Footer from '../components/storefront/Footer';

const StoreLayout = () => {
  return (
    <div className="storefront-body" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <StoreNavbar />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default StoreLayout;
