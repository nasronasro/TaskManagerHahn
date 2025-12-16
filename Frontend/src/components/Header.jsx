
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-gray-800 p-4 border-b-4 border-indigo-600 shadow-xl font-inter">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Branding/Logo Link */}
        <Link to="/" className="text-2xl font-bold tracking-tight text-white hover:text-indigo-400 transition duration-150">
          React Router App
        </Link>
        
        {/* Navigation Links */}
        <nav className="flex space-x-4">
          <Link 
            to="/" 
            className="text-gray-300 hover:text-indigo-400 transition duration-150 text-base font-medium p-2 rounded-lg"
          >
            Home
          </Link>
          <Link 
            to="/login" 
            className="text-gray-300 hover:text-indigo-400 transition duration-150 text-base font-medium p-2 rounded-lg"
          >
            Login
          </Link>
          <Link 
            to="/404-test" // Link to a non-existent page to test 404
            className="text-red-300 hover:text-red-400 transition duration-150 text-base font-medium p-2 rounded-lg"
          >
            Test 404
          </Link>
        </nav>
      </div>
    </header>
  );
}
export default Header