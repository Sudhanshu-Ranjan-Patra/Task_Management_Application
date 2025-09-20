import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/authSlice';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector(s => s.auth);
  const nav = useNavigate();

  useEffect(() => { if (user) nav('/dashboard'); }, [user, nav]);

  const submit = (e) => {
    e.preventDefault();
    dispatch(loginUser(form));
  };

  return (
    <div className="container mt-8">
      <div className="card max-w-md mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form onSubmit={submit} className="space-y-3">
          <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
            placeholder="Email" className="w-full p-2 border rounded" />
          <input required type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})}
            placeholder="Password" className="w-full p-2 border rounded" />
          <button type="submit" className="w-full p-2 rounded bg-green-600 text-white">
            {loading ? 'Logging in...' : 'Login'}
          </button>
          {error && <div className="text-red-600">{error}</div>}
        </form>
        <p className="mt-3 text-sm">New here? <Link to="/register" className="text-indigo-600">Register</Link></p>
      </div>
    </div>
  );
};

export default Login;
