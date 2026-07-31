import React from 'react';
import { useSelector } from 'react-redux';
import { Bell, Search, User } from 'lucide-react';

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <header className="glass" style={{ height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2rem', borderBottom: '1px solid var(--border-color)', position: 'sticky', top: 0, zIndex: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.2)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-color)', width: '300px', transition: 'all 0.3s ease' }} className="hover-lift">
        <Search size={18} style={{ color: 'var(--text-secondary)', marginRight: '0.75rem' }} />
        <input 
          type="text" 
          placeholder="Search anywhere..." 
          style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', outline: 'none', width: '100%', fontSize: '0.9rem' }}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <button style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', position: 'relative' }} className="hover-lift">
          <Bell size={22} />
          <span style={{ position: 'absolute', top: '-2px', right: '-2px', width: '10px', height: '10px', backgroundColor: 'var(--danger-color)', borderRadius: '50%', border: '2px solid var(--bg-secondary)' }}></span>
        </button>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingLeft: '1.5rem', borderLeft: '1px solid var(--border-color)' }}>
          <div style={{ textAlign: 'right' }}>
            <p style={{ margin: 0, fontWeight: '600', fontSize: '0.9rem' }}>{user?.name}</p>
            <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'capitalize' }}>{user?.role}</p>
          </div>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer', boxShadow: 'var(--shadow-glow)' }} className="hover-lift">
            <User size={20} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
