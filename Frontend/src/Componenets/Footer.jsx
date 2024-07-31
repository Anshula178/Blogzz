import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-slate-300 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Brand Section */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-xl font-bold text-slate-100">Blog Application</h2>
            <p className="text-sm text-slate-400 mt-1">Sharing insights and stories.</p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            <Link to="/authors" className="text-slate-300 hover:text-slate-100 text-sm font-medium transition-colors duration-300">
              View by Authors
            </Link>
            <Link to="/createblog" className="text-slate-300 hover:text-slate-100 text-sm font-medium transition-colors duration-300">
              Create Blog
            </Link>
            {/* Conditionally render profile link if user is logged in */}
            {/* 
            {currentUser?.userId && (
              <Link to={`/profile/${currentUser.userId}`} className="text-slate-300 hover:text-slate-100 text-sm font-medium transition-colors duration-300">
                Profile
              </Link>
            )} 
            */}
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-6 border-t border-slate-700 pt-4 text-center">
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} Blog Application. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
