import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Users, UserCheck, ShieldBan, ShieldCheck, UserCog } from 'lucide-react';
import { userApi } from '../services/userApi';
import Loader from '../components/Loader';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [dbStats, setDbStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await userApi.getStats();
        if (response.success) {
          setDbStats(response.stats);
        }
      } catch (err) {
        setError('Failed to load dashboard statistics.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <Loader />;

  const stats = [
    { title: 'Total Users', value: dbStats?.totalUsers || 0, icon: <Users size={24} />, color: 'var(--primary-color)' },
    { title: 'Active Users', value: dbStats?.activeUsers || 0, icon: <UserCheck size={24} />, color: 'var(--success-color)' },
    { title: 'Blocked Users', value: dbStats?.blockedUsers || 0, icon: <ShieldBan size={24} />, color: 'var(--danger-color)' },
    { title: 'Verified Users', value: dbStats?.verifiedUsers || 0, icon: <ShieldCheck size={24} />, color: '#10b981' },
    { title: 'Admin / Customer', value: `${dbStats?.adminCount || 0} / ${dbStats?.customerCount || 0}`, icon: <UserCog size={24} />, color: '#8b5cf6' },
  ];

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>Dashboard Overview</h1>
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Welcome back, {user?.name}! Here are the real-time user statistics.</p>
      </div>

      {error && <div style={{ color: 'var(--danger-color)', marginBottom: '1rem' }}>{error}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {stats.map((stat, index) => (
          <div key={index} className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>{stat.title}</p>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>{stat.value}</h3>
            </div>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: `${stat.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: stat.color }}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', minHeight: '300px' }}>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.25rem' }}>Recent Activity</h3>
        <p style={{ color: 'var(--text-secondary)' }}>System metrics are up to date.</p>
      </div>
    </div>
  );
};

export default Dashboard;
