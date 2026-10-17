import React, { useState } from 'react';
import './Form.css';

const Signup = () => {
  const [form, setForm] = useState({ username: '', password: '', email: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
   try {
      const res = await fetch('https://healthbot-backend-service.onrender.com/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
```[cite: 8]

---

### Next Steps:
1. Commit and push the changes in `Signup.js` to GitHub.
2. Netlify will auto-deploy the update.
3. Refresh your site (`[https://healthbotplus.netlify.app/signup](https://healthbotplus.netlify.app/signup)`)[cite: 7] and try signing up again.

*(Note: Also check your `Login.js` or other authentication pages to ensure any other Railway URLs are replaced with `[https://healthbot-backend-service.onrender.com](https://healthbot-backend-service.onrender.com)` as well)[cite: 3, 5].*

      let data;
      try {
        data = await res.json();
      } catch {
        data = { message: await res.text() };
      }

      if (res.ok) {
        setSuccess('Signup successful! Please check your email to verify your account, then login.');
        setForm({ username: '', password: '', email: '' });
      } else {
        setError(data.message || 'Signup failed. Please try again.');
      }
    } catch (err) {
      setError('Server error. Please try again later.');
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
      <p onClick={() => window.location.href = '/login'}>
        Already have an account? <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Login</span>
      </p>
    </div>
  );
};

export default Signup;
