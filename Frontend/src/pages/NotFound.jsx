import { Link } from 'react-router-dom';


function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4 sm:p-8 font-inter">
      <div className="text-center p-8 bg-gray-800 rounded-xl shadow-2xl max-w-lg w-full">
        {/* Large, striking 404 text */}
        <p className="text-8xl sm:text-9xl font-extrabold text-red-500 mb-4 tracking-widest">
          404
        </p>
        
        <h1 className="text-4xl sm:text-5xl font-bold mb-3 text-gray-100">
          Page Not Found
        </h1>

        <p className="text-gray-400 text-lg mb-8">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        
        <Link
          to="/"
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full 
                     text-white bg-indigo-600 shadow-lg 
                     hover:bg-indigo-700 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          Go to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;