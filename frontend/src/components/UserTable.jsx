import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

const UserTable = ({ users }) => {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
            <th style={{ padding: '1rem' }}>Name</th>
            <th style={{ padding: '1rem' }}>Email</th>
            <th style={{ padding: '1rem' }}>Role</th>
            <th style={{ padding: '1rem' }}>Status</th>
            <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '1rem' }}>{user.name}</td>
              <td style={{ padding: '1rem' }}>{user.email}</td>
              <td style={{ padding: '1rem' }}>
                <span style={{ 
                  padding: '0.25rem 0.75rem', 
                  borderRadius: '9999px', 
                  fontSize: '0.75rem', 
                  fontWeight: '500',
                  backgroundColor: user.role === 'admin' ? 'rgba(79, 70, 229, 0.2)' : 'rgba(34, 197, 94, 0.2)',
                  color: user.role === 'admin' ? 'var(--primary-color)' : 'var(--success-color)'
                }}>
                  {user.role}
                </span>
              </td>
              <td style={{ padding: '1rem' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: user.isActive ? 'var(--success-color)' : 'var(--danger-color)' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'currentColor' }}></span>
                  {user.isActive ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td style={{ padding: '1rem', textAlign: 'right' }}>
                <button style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', marginRight: '1rem' }} title="Edit">
                  <Edit2 size={18} />
                </button>
                <button style={{ background: 'transparent', border: 'none', color: 'var(--danger-color)', cursor: 'pointer' }} title="Delete">
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
