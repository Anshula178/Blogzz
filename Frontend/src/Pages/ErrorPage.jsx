import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
        <p className="mt-2 text-gray-600">Sorry, the page you are looking for does not exist.</p>
        <Link to="/" className="mt-6 inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;
