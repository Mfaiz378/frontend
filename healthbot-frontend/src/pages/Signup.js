import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Form.css';

const Signup = () => {
  const [form, setForm] = useState({ username: '', password: '', email: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await fetch('https://healthbot-backend-service.onrender.com/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => null);

      if (res.ok) {
        setSuccess(data?.message || 'Signup successful! You can now log in.');
        setForm({ username: '', password: '', email: '' });
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(data?.message || 'Signup failed. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('Server connection error. Please try again later.');
    }
  };

  return (
    <div className="form-container">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
      </form>

      {error && <div style={{ color: 'red', marginTop: '1rem' }}>{error}</div>}
      {success && <div style={{ color: 'green', marginTop: '1rem' }}>{success}</div>}

      <p onClick={() => navigate('/login')} style={{ cursor: 'pointer', marginTop: '1rem' }}>
        Already have an account? <span style={{ textDecoration: 'underline' }}>Login</span>
      </p>
    </div>
  );
};

export default Signup;
