import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';

const Header = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <header className=" text-slate-800 mb-5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center">
              {/* Text-Based Logo */}
              <div className="flex items-center">
                <span className="text-2xl font-bold text-slate-800">MyBlog</span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <Link to="/authors" className="text-slate-600 hover:text-slate-800 px-4 py-2 rounded-md text-sm font-medium">View by Authors</Link>
            
            {currentUser?.userId ? (
              <>
                <Link to={`/profile/${currentUser.userId}`} className="text-slate-600 hover:text-slate-800 px-4 py-2 rounded-md text-sm font-medium">{currentUser.name}</Link>
                <Link to="/createblog" className="text-slate-600 hover:text-slate-800 px-4 py-2 rounded-md text-sm font-medium">Create Blog</Link>
                <Link to="/logout" className="text-slate-100 bg-slate-700 hover:text-slate-800 hover:bg-white hover:border border-slate-300 px-4 py-2 rounded-md text-sm font-medium">Logout</Link>
              </>
            ) : (
              <>
                <Link to="/register" className="text-slate-700 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-md text-sm font-medium">Register</Link>
                <Link to="/login"className="text-slate-100 bg-slate-700 border-slate-300  px-4 py-2 rounded-md text-sm font-medium" >Login</Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
