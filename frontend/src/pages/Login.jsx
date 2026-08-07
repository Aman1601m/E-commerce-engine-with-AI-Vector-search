import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../store/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, UserPlus, ArrowLeft, KeyRound } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { authApi } from '../services/authApi';

const Login = () => {
  const [formMode, setFormMode] = useState('login'); // 'login', 'register', 'forgot'
  
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      if (formMode === 'login') {
        const response = await authApi.login({ email, password });
        // authApi returns { success, message, data: { user, token } }
        dispatch(setCredentials({ user: response.data.user, token: response.data.token }));
        toast.success('Welcome back to Nexus!');
        navigate('/');
      } else if (formMode === 'register') {
        const nameParts = name.trim().split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ');
        await authApi.register({ firstName, lastName, email, password });
        toast.success('Account created successfully! Please sign in.');
        setFormMode('login'); // Switch to login after register
      } else if (formMode === 'forgot') {
        const response = await authApi.forgotPassword(email);
        toast.success('Reset link sent! Check your terminal console.', { duration: 5000 });
        setFormMode('login'); // Switch back to login
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Action failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '1rem', width: '100%' }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--store-text-light)', textDecoration: 'none', marginBottom: '2rem', fontWeight: 600, fontSize: '0.95rem' }}>
        <ArrowLeft size={18} /> Back to Store
      </Link>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--store-text)', margin: '0 0 0.5rem 0', letterSpacing: '-0.5px' }}>
          {formMode === 'login' ? 'Welcome Back' : formMode === 'register' ? 'Create Account' : 'Reset Password'}
        </h2>
        <p style={{ color: 'var(--store-text-light)', fontSize: '0.95rem', margin: 0 }}>
          {formMode === 'login' ? 'Enter your details to access your account.' : formMode === 'register' ? 'Join Nexus for exclusive deals and fast checkout.' : 'Enter your email to receive a password reset link.'}
        </p>
      </div>

      {error && (
        <div style={{ padding: '0.75rem', backgroundColor: '#fee2e2', color: '#ef4444', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem', fontWeight: 600, textAlign: 'center', border: '1px solid #fca5a5' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {formMode === 'register' && (
          <div style={{ marginBottom: '1.25rem' }}>
            <label htmlFor="name" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--store-text)', marginBottom: '0.5rem' }}>Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required={formMode === 'register'}
              placeholder="John Doe"
              style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', fontSize: '0.95rem', transition: 'border-color 0.2s', backgroundColor: '#f9fafb' }}
              onFocus={(e) => e.target.style.borderColor = 'var(--store-primary)'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            />
          </div>
        )}

        <div style={{ marginBottom: formMode === 'forgot' ? '2rem' : '1.25rem' }}>
          <label htmlFor="email" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--store-text)', marginBottom: '0.5rem' }}>Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="hello@example.com"
            style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', fontSize: '0.95rem', transition: 'border-color 0.2s', backgroundColor: '#f9fafb' }}
            onFocus={(e) => e.target.style.borderColor = 'var(--store-primary)'}
            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
          />
        </div>
        
        {formMode !== 'forgot' && (
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <label htmlFor="password" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--store-text)' }}>Password</label>
              {formMode === 'login' && <span onClick={() => { setFormMode('forgot'); setError(null); }} style={{ fontSize: '0.8rem', color: 'var(--store-primary)', fontWeight: 600, cursor: 'pointer' }}>Forgot?</span>}
            </div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required={formMode !== 'forgot'}
              placeholder="••••••••"
              style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', fontSize: '0.95rem', transition: 'border-color 0.2s', backgroundColor: '#f9fafb' }}
              onFocus={(e) => e.target.style.borderColor = 'var(--store-primary)'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            />
          </div>
        )}

        <button 
          type="submit" 
          disabled={isLoading}
          style={{ width: '100%', padding: '1rem', backgroundColor: 'var(--store-primary)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: 800, cursor: isLoading ? 'not-allowed' : 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', transition: 'background-color 0.2s', opacity: isLoading ? 0.8 : 1 }}
          onMouseOver={(e) => { if(!isLoading) e.currentTarget.style.backgroundColor = '#3730a3' }}
          onMouseOut={(e) => { if(!isLoading) e.currentTarget.style.backgroundColor = 'var(--store-primary)' }}
        >
          {isLoading ? 'Processing...' : (
            <>{formMode === 'login' ? 'Sign In' : formMode === 'register' ? 'Create Account' : 'Send Reset Link'} {formMode === 'login' ? <LogIn size={18} /> : formMode === 'register' ? <UserPlus size={18} /> : <KeyRound size={18} />}</>
          )}
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #eaeaea' }}>
        {formMode === 'forgot' ? (
          <p style={{ color: 'var(--store-text-light)', fontSize: '0.9rem', margin: 0 }}>
            Remembered your password? 
            <span 
              onClick={() => { setFormMode('login'); setError(null); }} 
              style={{ color: 'var(--store-primary)', fontWeight: 700, cursor: 'pointer', marginLeft: '0.5rem' }}
            >
              Sign in
            </span>
          </p>
        ) : (
          <p style={{ color: 'var(--store-text-light)', fontSize: '0.9rem', margin: 0 }}>
            {formMode === 'login' ? "Don't have an account?" : "Already have an account?"} 
            <span 
              onClick={() => { setFormMode(formMode === 'login' ? 'register' : 'login'); setError(null); }} 
              style={{ color: 'var(--store-primary)', fontWeight: 700, cursor: 'pointer', marginLeft: '0.5rem' }}
            >
              {formMode === 'login' ? 'Sign up' : 'Sign in'}
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
