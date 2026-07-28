import React, { useState } from 'react';
import UserTable from '../components/UserTable';
import { Plus } from 'lucide-react';

const Users = () => {
  // Mock data for UI scaffolding
  const [users] = useState([
    { id: 1, name: 'Aman Sharma', email: 'aman@example.com', role: 'admin', isActive: true },
    { id: 2, name: 'Shikhar', email: 'shikhar@example.com', role: 'admin', isActive: true },
    { id: 3, name: 'John Doe', email: 'john@example.com', role: 'customer', isActive: false },
  ]);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>User Management</h1>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Manage admins and customers, roles and access.</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={18} style={{ marginRight: '0.5rem' }} /> Add User
        </button>
      </div>

      <div className="glass" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <UserTable users={users} />
      </div>
    </div>
  );
};

export default Users;
