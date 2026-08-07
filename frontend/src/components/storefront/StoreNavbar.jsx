import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, User, Heart, Menu } from 'lucide-react';
import { useSelector } from 'react-redux';

const StoreNavbar = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { totalQuantity } = useSelector((state) => state.cart);

  return (
    <header style={{ 
      backgroundColor: 'white',
      borderBottom: '1px solid #eaeaea',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
    }}>
      {/* Top utility bar */}
      <div style={{ backgroundColor: 'var(--store-text)', color: 'white', padding: '0.4rem 5%', fontSize: '0.8rem', display: 'flex', justifyContent: 'space-between' }}>
        <span>Free shipping on orders over ₹5000!</span>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <span>Track Order</span>
          <span>Help</span>
          <span>English</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 5%', gap: '2rem' }}>
        
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Menu size={24} style={{ cursor: 'pointer', color: 'var(--store-text)' }} />
          <Link to="/" style={{ textDecoration: 'none', color: 'var(--store-primary)', fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.5px' }}>
            NEXUS<span style={{ color: 'var(--store-secondary)' }}>.</span>
          </Link>
        </div>

        {/* Mega Search Bar */}
        <div style={{ flex: 1, maxWidth: '600px', display: 'flex' }}>
          <select style={{ padding: '0.75rem', border: '2px solid var(--store-primary)', borderRight: 'none', borderRadius: '8px 0 0 8px', outline: 'none', backgroundColor: '#f8f9fa', fontWeight: 600, color: 'var(--store-text)' }}>
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Fashion</option>
          </select>
          <input 
            type="text" 
            placeholder="Search for products, brands and more..." 
            style={{ flex: 1, padding: '0.75rem 1rem', border: '2px solid var(--store-primary)', borderLeft: '1px solid #ccc', outline: 'none', fontSize: '0.95rem' }} 
          />
          <button style={{ backgroundColor: 'var(--store-primary)', color: 'white', border: 'none', padding: '0 1.5rem', borderRadius: '0 8px 8px 0', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <Search size={20} />
          </button>
        </div>

        {/* Icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', color: 'var(--store-text)' }}>
            <Heart size={22} />
            <span style={{ fontSize: '0.7rem', fontWeight: 600, marginTop: '2px' }}>Wishlist</span>
          </div>
          
          {isAuthenticated ? (
            <div onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('user'); window.location.href='/'; }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', color: 'var(--store-text)' }}>
              <User size={22} />
              <span style={{ fontSize: '0.7rem', fontWeight: 600, marginTop: '2px' }}>Logout</span>
            </div>
          ) : (
            <Link to="/login" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', color: 'var(--store-text)', textDecoration: 'none' }}>
              <User size={22} />
              <span style={{ fontSize: '0.7rem', fontWeight: 600, marginTop: '2px' }}>Account</span>
            </Link>
          )}
          
          <Link to="/cart" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', color: 'var(--store-text)', position: 'relative', textDecoration: 'none' }}>
            <div style={{ position: 'relative' }}>
              <ShoppingCart size={22} />
              {totalQuantity > 0 && (
                <span style={{ position: 'absolute', top: '-6px', right: '-8px', background: 'var(--store-secondary)', color: 'white', fontSize: '0.65rem', padding: '2px 6px', borderRadius: '50%', fontWeight: 'bold' }}>
                  {totalQuantity}
                </span>
              )}
            </div>
            <span style={{ fontSize: '0.7rem', fontWeight: 600, marginTop: '2px' }}>Cart</span>
          </Link>
        </div>

      </div>

      {/* Categories Nav */}
      <nav style={{ padding: '0 5%', borderTop: '1px solid #eaeaea', display: 'flex', gap: '2rem', backgroundColor: 'white' }}>
        {['Deals', 'Tech & Gadgets', 'Sneakers', 'Apparel', 'Home', 'Beauty', 'Sports'].map(cat => (
          <a key={cat} href="#" style={{ color: cat === 'Deals' ? 'var(--store-secondary)' : 'var(--store-text-light)', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem', padding: '1rem 0', borderBottom: '2px solid transparent' }} className="hover-lift">
            {cat}
          </a>
        ))}
      </nav>
    </header>
  );
};

export default StoreNavbar;
