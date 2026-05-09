// src/pages/Register.tsx

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Handle form submission for user registration
  async function handleRegister(event: React.FormEvent) {
    event.preventDefault();
    try {
      await registerUser(email, password);
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
      alert('Failed to register. Please try again.');
    }
  }

  return (
    <main className="container py-5">
      <div className="card p-4 shadow-sm mx-auto" style={{ maxWidth: '450px' }}>
      <h1 className="mb-3">Create An Account</h1>

      <form onSubmit={handleRegister} className="w-100">

    {/* Email Input */}        
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
        <button className="btn btn-success w-100" type="submit">Register</button>
      </form>
      <p className="text-center mt-3">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
      </div>
    </main>
  );
}
