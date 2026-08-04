import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearError } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearError());
    if (isAuthenticated) {
      toast.success('Successfully logged in!');
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '1rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Orbs */}
      <div style={{ position: 'absolute', top: '10%', left: '20%', width: '300px', height: '300px', background: 'var(--primary-color)', filter: 'blur(100px)', borderRadius: '50%', opacity: 0.15, animation: 'float 10s infinite ease-in-out' }}></div>
      <div style={{ position: 'absolute', bottom: '10%', right: '20%', width: '400px', height: '400px', background: 'var(--secondary-color)', filter: 'blur(120px)', borderRadius: '50%', opacity: 0.15, animation: 'float 12s infinite ease-in-out reverse' }}></div>

      <div className="glass-panel animate-fade-in-up" style={{ 
        width: '100%', 
        maxWidth: '420px', 
        padding: '3rem 2.5rem', 
        borderRadius: '24px',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '1.5rem', margin: '0 auto 1.5rem auto', boxShadow: 'var(--shadow-glow)' }}>
            E
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem', background: 'linear-gradient(to right, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Welcome Back
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>Sign in to access the EngineAI admin panel.</p>
        </div>

        {error && (
          <div className="animate-fade-in-up" style={{ padding: '1rem', backgroundColor: 'rgba(239, 68, 68, 0.15)', color: 'var(--danger-color)', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontSize: '0.875rem', textAlign: 'center', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@example.com"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2rem' }}>
            <span style={{ fontSize: '0.875rem', color: 'var(--primary-color)', cursor: 'pointer' }}>Forgot password?</span>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Sign In <LogIn size={20} />
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
