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
    { title: 'Total Users', value: dbStats?.totalUsers || 0, icon: <Users size={24} />, color: 'var(--primary-color)', delay: '' },
    { title: 'Active Users', value: dbStats?.activeUsers || 0, icon: <UserCheck size={24} />, color: 'var(--success-color)', delay: 'delay-100' },
    { title: 'Blocked Users', value: dbStats?.blockedUsers || 0, icon: <ShieldBan size={24} />, color: 'var(--danger-color)', delay: 'delay-200' },
    { title: 'Verified Users', value: dbStats?.verifiedUsers || 0, icon: <ShieldCheck size={24} />, color: '#10b981', delay: 'delay-300' },
    { title: 'Admin / Customer', value: `${dbStats?.adminCount || 0} / ${dbStats?.customerCount || 0}`, icon: <UserCog size={24} />, color: '#8b5cf6', delay: 'delay-300' },
  ];

  return (
    <div className="animate-fade-in-up">
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', margin: '0 0 0.5rem 0', background: 'linear-gradient(to right, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Dashboard Overview
        </h1>
        <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '1.1rem' }}>
          Welcome back, <strong style={{ color: 'white' }}>{user?.name}</strong>! Here are the real-time system metrics.
        </p>
      </div>

      {error && <div style={{ color: 'var(--danger-color)', marginBottom: '1rem', padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: 'var(--radius-md)' }}>{error}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        {stats.map((stat, index) => (
          <div key={index} className={`glass hover-lift animate-fade-in-up ${stat.delay}`} style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: `2px solid ${stat.color}50` }}>
            <div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.title}</p>
              <h3 style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, textShadow: `0 0 20px ${stat.color}30` }}>{stat.value}</h3>
            </div>
            <div className="glow-icon-wrapper" style={{ width: '56px', height: '56px', borderRadius: '14px', background: `linear-gradient(135deg, ${stat.color}20, ${stat.color}10)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: stat.color, border: `1px solid ${stat.color}30` }}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="glass-panel animate-fade-in-up delay-300" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', minHeight: '300px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '600' }}>Recent Activity</h3>
          <span style={{ fontSize: '0.875rem', color: 'var(--primary-color)', cursor: 'pointer' }}>View All</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '200px', color: 'var(--text-secondary)', background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-md)' }}>
          System metrics are up to date. No anomalies detected.
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
