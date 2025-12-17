import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Header() {
  const { token, logout } = useAuth(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-gray-900 p-4 border-b-4 border-indigo-600 shadow-xl font-inter">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Branding/Logo */}
        <Link to="/" className="text-2xl font-black tracking-tighter text-white hover:text-indigo-400 transition duration-150">
          TASK<span className="text-indigo-500">FLOW</span>
        </Link>
        
        {/* Navigation Links */}
        <nav className="flex items-center space-x-2 sm:space-x-4">
          <Link 
            to="/" 
            className="text-gray-300 hover:text-white hover:bg-gray-800 transition duration-150 text-sm font-medium px-3 py-2 rounded-lg"
          >
            Home
          </Link>

          {/* Show Login only if NOT logged in */}
          {!token ? (
            <Link 
              to="/login" 
              className="bg-indigo-600 text-white hover:bg-indigo-700 transition duration-150 text-sm font-bold px-5 py-2 rounded-full shadow-lg shadow-indigo-500/20"
            >
              Sign In
            </Link>
          ) : (
            /* Show Projects and Logout only if logged in */
            <>
              <Link 
                to="/projects" 
                className="text-gray-300 hover:text-white hover:bg-gray-800 transition duration-150 text-sm font-medium px-3 py-2 rounded-lg"
              >
                My Projects
              </Link>
              
              <div className="h-6 w-[1px] bg-gray-700 mx-2"></div>

              <button 
                onClick={handleLogout}
                className="text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition duration-150 text-sm font-bold px-3 py-2 rounded-lg"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;