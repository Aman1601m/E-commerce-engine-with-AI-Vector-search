import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../services/authApi';
import { updateUser } from '../store/authSlice';
import { User, MapPin, Package, LogOut, Loader, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

const Account = () => {
  const { user, token, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('profile'); // 'profile', 'addresses', 'orders'
  const [isLoading, setIsLoading] = useState(false);
  
  // Profile Form State
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
  });

  // Orders State
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (activeTab === 'orders' && orders.length === 0) {
      fetchOrders();
    }
  }, [activeTab]);

  const fetchOrders = async () => {
    setLoadingOrders(true);
    try {
      const { data } = await axios.get('http://localhost:5000/api/orders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(data.data || []);
    } catch (error) {
      toast.error('Failed to fetch orders');
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await authApi.updateProfile(formData);
      dispatch(updateUser(response.user));
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);
  };

  if (!user) return null;

  return (
    <div style={{ padding: '3rem 5%', backgroundColor: 'var(--store-bg)', minHeight: '80vh', display: 'flex', gap: '2rem' }}>
      
      {/* Sidebar Navigation */}
      <div style={{ width: '250px', backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', alignSelf: 'flex-start' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid #f3f4f6' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--store-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', fontWeight: 'bold' }}>
            {user.firstName?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>{user.firstName} {user.lastName}</h3>
            <p style={{ margin: 0, fontSize: '0.8rem', color: '#6b7280' }}>{user.email}</p>
          </div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button 
            onClick={() => setActiveTab('profile')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: '8px', border: 'none', background: activeTab === 'profile' ? '#f3f4f6' : 'transparent', color: activeTab === 'profile' ? 'var(--store-primary)' : '#4b5563', fontWeight: 600, cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}
          >
            <User size={18} /> Personal Info
          </button>
          
          <button 
            onClick={() => setActiveTab('addresses')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: '8px', border: 'none', background: activeTab === 'addresses' ? '#f3f4f6' : 'transparent', color: activeTab === 'addresses' ? 'var(--store-primary)' : '#4b5563', fontWeight: 600, cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}
          >
            <MapPin size={18} /> Addresses
          </button>

          <button 
            onClick={() => setActiveTab('orders')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: '8px', border: 'none', background: activeTab === 'orders' ? '#f3f4f6' : 'transparent', color: activeTab === 'orders' ? 'var(--store-primary)' : '#4b5563', fontWeight: 600, cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}
          >
            <Package size={18} /> Order History
          </button>
          
          <button 
            onClick={handleLogout}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: '8px', border: 'none', background: 'transparent', color: '#ef4444', fontWeight: 600, cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s', marginTop: '1rem' }}
          >
            <LogOut size={18} /> Sign Out
          </button>
        </nav>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, backgroundColor: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
        
        {/* PROFILE TAB */}
        {activeTab === 'profile' && (
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--store-text)' }}>Personal Information</h2>
            <form onSubmit={handleProfileUpdate} style={{ maxWidth: '500px' }}>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', color: '#4b5563' }}>First Name</label>
                  <input type="text" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', color: '#4b5563' }}>Last Name</label>
                  <input type="text" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none' }} />
                </div>
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', color: '#4b5563' }}>Email Address</label>
                <input type="email" value={user.email} disabled style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', backgroundColor: '#f3f4f6', cursor: 'not-allowed' }} />
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', color: '#4b5563' }}>Phone Number</label>
                <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="e.g. +91 9876543210" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none' }} />
              </div>

              <button type="submit" disabled={isLoading} style={{ padding: '0.75rem 2rem', backgroundColor: 'var(--store-primary)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: isLoading ? 'not-allowed' : 'pointer' }}>
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>
        )}

        {/* ADDRESSES TAB */}
        {activeTab === 'addresses' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--store-text)', margin: 0 }}>My Addresses</h2>
              <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', backgroundColor: 'var(--store-secondary)', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}>
                <Plus size={16} /> Add New
              </button>
            </div>
            
            {(!user.addresses || user.addresses.length === 0) ? (
              <div style={{ padding: '3rem', textAlign: 'center', backgroundColor: '#f9fafb', borderRadius: '8px', border: '1px dashed #d1d5db' }}>
                <p style={{ color: '#6b7280', marginBottom: '1rem' }}>You haven't saved any addresses yet.</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {user.addresses.map((address, index) => (
                  <div key={index} style={{ padding: '1.5rem', border: '1px solid #e5e7eb', borderRadius: '8px', position: 'relative' }}>
                    {address.isDefault && <span style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: '#e0e7ff', color: '#4f46e5', fontSize: '0.7rem', padding: '2px 8px', borderRadius: '12px', fontWeight: 700 }}>Default</span>}
                    <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem' }}>{user.firstName} {user.lastName}</h4>
                    <p style={{ margin: '0 0 0.25rem 0', color: '#4b5563', fontSize: '0.9rem' }}>{address.street}</p>
                    <p style={{ margin: '0 0 0.25rem 0', color: '#4b5563', fontSize: '0.9rem' }}>{address.city}, {address.state} {address.zipCode}</p>
                    <p style={{ margin: '0', color: '#4b5563', fontSize: '0.9rem' }}>{address.country}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ORDERS TAB */}
        {activeTab === 'orders' && (
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--store-text)' }}>Order History</h2>
            
            {loadingOrders ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}><Loader className="animate-spin" size={32} color="var(--store-primary)" /></div>
            ) : orders.length === 0 ? (
              <div style={{ padding: '3rem', textAlign: 'center', backgroundColor: '#f9fafb', borderRadius: '8px', border: '1px dashed #d1d5db' }}>
                <Package size={48} color="#9ca3af" style={{ margin: '0 auto 1rem auto' }} />
                <p style={{ color: '#4b5563', fontSize: '1.1rem', fontWeight: 600 }}>No orders found.</p>
                <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Looks like you haven't made your first purchase yet.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {orders.map((order) => (
                  <div key={order._id} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f3f4f6', paddingBottom: '1rem', marginBottom: '1rem' }}>
                      <div>
                        <p style={{ fontSize: '0.8rem', color: '#6b7280', margin: '0 0 0.25rem 0' }}>Order #{order._id}</p>
                        <p style={{ fontSize: '0.9rem', fontWeight: 600, margin: 0 }}>Placed on {formatDate(order.createdAt)}</p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--store-primary)', margin: '0 0 0.25rem 0' }}>{formatPrice(order.totalPrice)}</p>
                        <span style={{ display: 'inline-block', padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700, 
                          backgroundColor: order.status === 'Delivered' ? '#dcfce7' : order.status === 'Processing' ? '#fef9c3' : '#e0e7ff', 
                          color: order.status === 'Delivered' ? '#166534' : order.status === 'Processing' ? '#854d0e' : '#3730a3' 
                        }}>
                          {order.status || 'Pending'}
                        </span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <p style={{ margin: 0, fontSize: '0.9rem', color: '#4b5563' }}>
                        {order.orderItems?.length || 0} item(s) • Tracking: <span style={{ fontWeight: 600, color: 'var(--store-text)' }}>{order.status === 'Delivered' ? 'Delivered' : 'On the way'}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;
