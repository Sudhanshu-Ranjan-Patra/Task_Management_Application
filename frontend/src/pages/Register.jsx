import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../store/authSlice';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector(s => s.auth);
  const nav = useNavigate();

  useEffect(() => { if (user) nav('/dashboard'); }, [user, nav]);

  const submit = (e) => {
    e.preventDefault();
    dispatch(registerUser(form));
  };

 return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-4 sm:px-6 lg:px-8">
    <div className="w-full max-w-md bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-8">
      {/* Title */}
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Create an Account
      </h2>

      {/* Form */}
      <form onSubmit={submit} className="space-y-4">
        <input
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Full Name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
        />

        <input
          required
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Email"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
        />

        <input
          required
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder="Password"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
        />

        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-medium shadow-md transition-colors duration-200"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        {error && <div className="text-red-600 text-sm">{error}</div>}
      </form>

      {/* Footer */}
      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors duration-200"
        >
          Login
        </Link>
      </p>
    </div>
  </div>
);
};

export default Register;
