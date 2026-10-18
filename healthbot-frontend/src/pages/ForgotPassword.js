import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Form.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const res = await fetch('https://healthbot-backend-service.onrender.com/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(data.message || 'Check your email for the reset link.');
      } else {
        setError(data.message || 'Failed to process request.');
      }
    } catch (err) {
      setError('Server error. Please try again later.');
    }
  };

  return (
    <div className="form-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleForgotPassword}>
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
      {message && <div style={{ color: 'green', marginTop: '1rem' }}>{message}</div>}
      {error && <div style={{ color: 'red', marginTop: '1rem' }}>{error}</div>}
      <p onClick={() => navigate('/login')} style={{ cursor: 'pointer', marginTop: '1rem' }}>
        Back to Login
      </p>
    </div>
  );
};

export default ForgotPassword;
