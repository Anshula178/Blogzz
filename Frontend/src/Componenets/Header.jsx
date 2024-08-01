import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const { currentUser } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-between ">
          {/* Logo Section */}
          <div className="flex  space-x-3">
            <Link to="/" className="flex ">
              <span className="text-2xl font-bold text-slate-800">MyBlog</span>
            </Link>
          </div>

          {/* Menu Icon for Mobile */}
          <div className="lg:hidden flex  items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-800 focus:outline-none flex justify-end"
            >
              <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} size="lg" />
            </button>
          </div>
          

          {/* Navigation Links */}
          <div className={`lg:flex lg:items-center ${isMenuOpen ? 'block' : 'hidden'} w-full lg:w-auto mt-4 lg:mt-0`}>
            <div className="flex  flex-col lg:flex-row lg:items-center lg:space-x-6 space-y-4 lg:space-y-0">
              <Link to="/authors" className="text-slate-600 hover:text-slate-800 px-4 py-2 rounded-md text-sm font-medium">View by Authors</Link>
              
              {currentUser?.userId ? (
                <>
                  <Link to={`/profile/${currentUser.userId}`} className="text-slate-600 hover:text-slate-800 px-4 py-2 rounded-md text-sm font-medium">{currentUser.name}</Link>
                  <Link to="/createblog" className="text-slate-600 hover:text-slate-800 px-4 py-2 rounded-md text-sm font-medium">Create Blog</Link>
                  <Link to="/logout" className="text-slate-100 bg-slate-700 hover:text-slate-800 hover:bg-white border border-slate-300 px-4 py-2 rounded-md text-sm font-medium">Logout</Link>
                </>
              ) : (
                <>
                  <Link to="/register" className="text-slate-700 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-md text-sm font-medium">Register</Link>
                  <Link to="/login" className="text-slate-100 bg-slate-700 border-slate-300 hover:bg-slate-800 hover:text-white px-4 py-2 rounded-md text-sm font-medium">Login</Link>
                </>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
