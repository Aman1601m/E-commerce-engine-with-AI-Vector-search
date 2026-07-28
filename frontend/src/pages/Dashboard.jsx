import React from 'react';
import { useSelector } from 'react-redux';
import { Package, Users, DollarSign, Activity } from 'lucide-react';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  const stats = [
    { title: 'Total Revenue', value: '$45,231.89', icon: <DollarSign size={24} />, color: 'var(--success-color)' },
    { title: 'Active Users', value: '2,314', icon: <Users size={24} />, color: 'var(--primary-color)' },
    { title: 'Total Products', value: '5,023', icon: <Package size={24} />, color: '#f59e0b' },
    { title: 'Active Sessions', value: '432', icon: <Activity size={24} />, color: '#8b5cf6' },
  ];

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>Dashboard Overview</h1>
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Welcome back, {user?.name}! Here's what's happening today.</p>
      </div>

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
        <p style={{ color: 'var(--text-secondary)' }}>No recent activity to show.</p>
      </div>
    </div>
  );
};

export default Dashboard;
