import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Form.css';

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('https://healthbot-backend-service.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/');
      } else {
        alert(data.message || 'Login failed.');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong.');
    }
  };

  return (
    <div className="form-container">
      <h2>Login to HealthBot</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Email or Username"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>

        <p 
          onClick={() => navigate('/forgot-password')} 
          style={{ cursor: 'pointer', fontSize: '0.9rem', color: '#007bff', marginTop: '0.8rem' }}
        >
          Forgot Password?
        </p>

        <p 
          onClick={() => navigate('/signup')} 
          style={{ cursor: 'pointer', marginTop: '0.5rem' }}
        >
          Don't have an account? Signup
        </p>
      </form>
    </div>
  );
};

export default Login;
