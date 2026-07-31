import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, UserCircle, LogOut } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';

const Sidebar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Users', path: '/users', icon: <Users size={20} /> },
    { name: 'Profile', path: '/profile', icon: <UserCircle size={20} /> },
  ];

  return (
    <aside className="glass" style={{ width: '260px', padding: '1.5rem', display: 'flex', flexDirection: 'column', borderRight: '1px solid var(--border-color)', zIndex: 10 }}>
      <div style={{ marginBottom: '2.5rem', padding: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
          E
        </div>
        <h2 style={{ color: 'var(--text-primary)', fontSize: '1.25rem', fontWeight: '700', letterSpacing: '0.05em' }}>Engine<span style={{ color: 'var(--primary-color)' }}>AI</span></h2>
      </div>

      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '0.875rem 1rem',
              borderRadius: 'var(--radius-md)',
              color: isActive ? 'white' : 'var(--text-secondary)',
              background: isActive ? 'linear-gradient(90deg, rgba(99, 102, 241, 0.15), transparent)' : 'transparent',
              borderLeft: isActive ? '3px solid var(--primary-color)' : '3px solid transparent',
              textShadow: isActive ? '0 0 10px rgba(99, 102, 241, 0.5)' : 'none',
              transition: 'all 0.3s ease',
              fontWeight: isActive ? '600' : '500',
            })}
            className="hover-lift"
          >
            <span style={{ color: 'inherit' }} className={item.isActive ? 'glow-icon-wrapper' : ''}>
              {item.icon}
            </span>
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div style={{ marginTop: 'auto' }}>
        <button
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '0.875rem 1rem',
            width: '100%',
            background: 'transparent',
            border: 'none',
            color: 'var(--danger-color)',
            cursor: 'pointer',
            fontWeight: '500',
            fontSize: '1rem',
            borderRadius: 'var(--radius-md)',
            transition: 'all 0.3s ease',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
            e.currentTarget.style.transform = 'translateX(5px)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.transform = 'translateX(0)';
          }}
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
