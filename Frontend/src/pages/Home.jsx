import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Renders the main Home page content.
 * Features a central hero card styled with Tailwind CSS gradients and shadows.
 */
function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 sm:p-8 font-inter">
      <div 
        className="max-w-md w-full bg-white p-8 sm:p-10 rounded-2xl shadow-2xl transition-all duration-300 hover:shadow-3xl"
      >
        <div className="text-center">
          <h1 
            className="text-4xl sm:text-5xl font-extrabold mb-4 
                       bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600"
          >
            Welcome Aboard!
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Your application is set up with **React** and **Tailwind CSS**. 
            Start building amazing features and replace this placeholder!
          </p>
        </div>
        
        {/* Call to Action Button */}
        <div className="flex justify-center">
          <Link 
            to="/login"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full 
                       text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg 
                       hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl transition duration-150 ease-in-out 
                       transform hover:scale-[1.02] active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Go to Login
          </Link>
        </div>
        
        <p className="mt-8 text-center text-sm text-gray-400">
            Powered by Vite and the React ecosystem.
        </p>
      </div>
    </div>
  );
}

export default Home;