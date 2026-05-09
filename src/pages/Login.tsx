// src/pages/Login.tsx

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';

export default function Login() {
  const [email, setEmail] = useState('');
  const isAdmin = email === "email@emailme.com";
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Handle form submission for login
  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();

    try {
      await loginUser(email, password);

      if (isAdmin) {
      navigate("/admin");
    } else {
      navigate("/shop");
    }

    } catch (error) {
      console.error('Login error:', error);
      alert('Failed to login. Please try again.');
    }
  }

  return (
    <main className="container py-5">
      <div className="card p-4 shadow-sm mx-auto" style={{ maxWidth: '450px' }}>
      <h1 className="mb-3">Login to Your Account</h1>

    {/* Email Input */}
      <form onSubmit={handleLogin} className="w-100">
        <input 
          className="form-control mb-3"
          type="email" 
          placeholder="Email Address" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />

    {/* Password Input */}        
        <input 
          className="form-control mb-3"
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />

    {/* Buttons */}        
        <button className="btn btn-success w-100" type="submit">Login</button>
      </form>
      <p className="text-center mt-3">
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
      </div>
    </main>
  );
}
