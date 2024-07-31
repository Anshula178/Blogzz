import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const registerUser = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/register`, formData);
      const newUser = response.data;
      if (!newUser) {
        setError("Couldn't register user. Please try again");
      } else {
        navigate('/login');
      }
    } catch (error) {
      setError(error.response ? error.response.data.message : 'Something went wrong');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-slate-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-slate-800 mb-6">Register</h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}
        <form onSubmit={registerUser}>
          <div className="mb-4">
            <label className="block text-slate-700 text-sm font-semibold mb-2" htmlFor="name">
              Username
            </label>
            <input
              className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-slate-700 leading-tight focus:outline-none focus:ring-2 focus:ring-slate-500 transition duration-300 ease-in-out"
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Username"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-slate-700 text-sm font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-slate-700 leading-tight focus:outline-none focus:ring-2 focus:ring-slate-500 transition duration-300 ease-in-out"
              id="email"
              type="email"
              name="email"
              value={formData.email}
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
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-slate-700 text-sm font-semibold mb-2" htmlFor="password2">
              Confirm Password
            </label>
            <input
              className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-slate-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-slate-500 transition duration-300 ease-in-out"
              id="password2"
              type="password"
              name="password2"
              value={formData.password2}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-slate-700 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 transition duration-300 ease-in-out"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <p className="text-slate-700">Already have an account?</p>
          <Link
            to="/login"
            className="text-slate-700 font-bold hover:text-slate-900 transition duration-300 ease-in-out"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
