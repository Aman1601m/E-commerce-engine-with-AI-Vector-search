import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>Profile Settings</h1>
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Manage your account details and preferences.</p>
      </div>

      <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', maxWidth: '600px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2rem' }}>
          <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', fontWeight: 'bold' }}>
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div>
            <h2 style={{ margin: '0 0 0.5rem 0' }}>{user?.name || 'User'}</h2>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>{user?.role || 'admin'}</p>
          </div>
        </div>

        <form>
          <div className="input-group">
            <label className="input-label" htmlFor="name">Full Name</label>
            <input type="text" id="name" className="input-field" defaultValue={user?.name || ''} />
          </div>
          <div className="input-group">
            <label className="input-label" htmlFor="email">Email Address</label>
            <input type="email" id="email" className="input-field" defaultValue={user?.email || ''} />
          </div>
          <button type="button" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
