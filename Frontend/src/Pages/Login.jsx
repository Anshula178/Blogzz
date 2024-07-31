import React, { useContext, useState } from 'react';
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(UserContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/login`, formData);
      const user = response.data;
      setCurrentUser(user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-slate-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-semibold text-slate-800 mb-6">Login</h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-slate-700 text-sm font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-slate-700 leading-tight focus:outline-none focus:ring-2 focus:ring-slate-500 transition duration-300 ease-in-out"
              id="email"
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-slate-700 text-sm font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-slate-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-slate-500 transition duration-300 ease-in-out"
              id="password"
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-slate-700 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 transition duration-300 ease-in-out"
              type="submit"
            >
              Sign In
            </button>
            <button
              className="bg-slate-700 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 transition duration-300 ease-in-out"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
