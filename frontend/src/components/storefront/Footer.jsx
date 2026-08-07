import React from 'react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#111827', color: 'white', padding: '4rem 5% 2rem 5%' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
        
        <div style={{ gridColumn: 'span 2' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, letterSpacing: '-1px', marginBottom: '1rem' }}>
            NEXUS<span style={{ color: 'var(--store-secondary)' }}>.</span>
          </h2>
          <p style={{ color: '#9ca3af', lineHeight: 1.6, maxWidth: '400px', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            The ultimate e-commerce destination for modern electronics, premium sneakers, and trendy fashion. Fast shipping, secure payments.
          </p>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input type="email" placeholder="Email for newsletter" style={{ padding: '0.75rem 1rem', borderRadius: '4px', border: 'none', outline: 'none', flex: 1 }} />
            <button style={{ backgroundColor: 'var(--store-secondary)', color: 'white', border: 'none', padding: '0 1.5rem', borderRadius: '4px', fontWeight: 600, cursor: 'pointer' }}>Subscribe</button>
          </div>
        </div>
        
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem' }}>Make Money</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <li><a href="#" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '0.9rem' }}>Sell on Nexus</a></li>
            <li><a href="#" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '0.9rem' }}>Become an Affiliate</a></li>
            <li><a href="#" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '0.9rem' }}>Advertise Products</a></li>
          </ul>
        </div>

        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem' }}>Let Us Help</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <li><a href="#" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '0.9rem' }}>Your Account</a></li>
            <li><a href="#" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '0.9rem' }}>Orders & Returns</a></li>
            <li><a href="#" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '0.9rem' }}>Help Center</a></li>
          </ul>
        </div>
      </div>
      
      <div style={{ borderTop: '1px solid #374151', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', color: '#6b7280', fontSize: '0.85rem' }}>
        <p>&copy; 2026 Nexus E-Commerce. All rights reserved.</p>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Conditions of Use</a>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Notice</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
