import React, { useState, useEffect } from 'react';
import UserTable from '../components/UserTable';
import { Plus } from 'lucide-react';
import { userApi } from '../services/userApi';
import Loader from '../components/Loader';
import { toast } from 'react-hot-toast';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    try {
      const response = await userApi.getAllUsers();
      if (response.success) {
        setUsers(response.users);
      }
    } catch (err) {
      setError('Failed to load users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleStatus = async (id) => {
    try {
      await userApi.toggleUserStatus(id);
      toast.success('User status updated successfully');
      fetchUsers(); // Refresh list
    } catch (err) {
      console.error('Failed to toggle status', err);
      toast.error('Failed to update user status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await userApi.deleteUser(id);
        toast.success('User deleted successfully');
        fetchUsers(); // Refresh list
      } catch (err) {
        console.error('Failed to delete user', err);
        toast.error('Failed to delete user');
      }
    }
  };

  if (loading) return <Loader />;

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

      {error && <div style={{ color: 'var(--danger-color)', marginBottom: '1rem' }}>{error}</div>}

      <div className="glass" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <UserTable users={users} onToggleStatus={handleToggleStatus} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default Users;
