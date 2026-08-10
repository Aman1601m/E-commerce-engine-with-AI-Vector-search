import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWishlist } from '../store/wishlistSlice';
import StoreNavbar from '../components/storefront/StoreNavbar';
import Footer from '../components/storefront/Footer';

const StoreLayout = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchWishlist());
    }
  }, [dispatch, isAuthenticated]);

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
