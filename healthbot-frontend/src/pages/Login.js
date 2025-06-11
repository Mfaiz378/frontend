import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Form.css';

const Login = () => {
  const [identifier, setIdentifier] = useState(''); // email or username
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password }), // send identifier (email or username)
      });

      const data = await res.json();

      if (res.ok) {
        if (data.verified) {
          // User is verified
          localStorage.setItem('isAuthenticated', 'true'); // <-- ADD THIS LINE
          navigate('/');
        } else {
          alert('Please verify your email before logging in.');
        }
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
          onChange={(e) => setIdentifier(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <p onClick={() => navigate('/signup')}>Don't have an account? Signup</p>
      </form>
    </div>
  );
};

export default Login;