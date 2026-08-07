import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { KeyRound } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { authApi } from '../services/authApi';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      await authApi.resetPassword(token, password);
      toast.success('Password successfully reset! Please login.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '2.5rem 2rem', width: '100%' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--store-text)', margin: '0 0 0.5rem 0', letterSpacing: '-0.5px' }}>
          Set New Password
        </h2>
        <p style={{ color: 'var(--store-text-light)', fontSize: '0.95rem', margin: 0 }}>
          Please enter your new password below.
        </p>
      </div>

      {error && (
        <div style={{ padding: '0.75rem', backgroundColor: '#fee2e2', color: '#ef4444', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem', fontWeight: 600, textAlign: 'center', border: '1px solid #fca5a5' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1.25rem' }}>
          <label htmlFor="password" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--store-text)', marginBottom: '0.5rem' }}>New Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
            style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', fontSize: '0.95rem', transition: 'border-color 0.2s', backgroundColor: '#f9fafb' }}
            onFocus={(e) => e.target.style.borderColor = 'var(--store-primary)'}
            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
          />
        </div>
        
        <div style={{ marginBottom: '2rem' }}>
          <label htmlFor="confirmPassword" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--store-text)', marginBottom: '0.5rem' }}>Confirm New Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="••••••••"
            style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', fontSize: '0.95rem', transition: 'border-color 0.2s', backgroundColor: '#f9fafb' }}
            onFocus={(e) => e.target.style.borderColor = 'var(--store-primary)'}
            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
          />
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          style={{ width: '100%', padding: '1rem', backgroundColor: 'var(--store-primary)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: 800, cursor: isLoading ? 'not-allowed' : 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', transition: 'background-color 0.2s', opacity: isLoading ? 0.8 : 1 }}
          onMouseOver={(e) => { if(!isLoading) e.currentTarget.style.backgroundColor = '#3730a3' }}
          onMouseOut={(e) => { if(!isLoading) e.currentTarget.style.backgroundColor = 'var(--store-primary)' }}
        >
          {isLoading ? 'Processing...' : (
            <>Reset Password <KeyRound size={18} /></>
          )}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
