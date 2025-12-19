import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Home() {
  const { token } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 sm:p-8 font-inter">
      <div className="max-w-3xl w-full bg-white p-8 sm:p-12 rounded-3xl shadow-2xl border border-gray-100">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-5xl sm:text-6xl font-black mb-4 bg-clip-text text-transparent bg-linear-to-r from-indigo-600 to-purple-600 tracking-tight">
            TASKFLOW
          </h1>
          <p className="text-gray-500 text-lg max-w-lg mx-auto">
            A professional Project Management tool built with <span className="text-indigo-600 font-semibold">.NET 10 Web API</span> and <span className="text-purple-600 font-semibold">React 19</span>.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
            <h3 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
              Frontend Features
            </h3>
            <ul className="text-sm text-indigo-800 space-y-2 opacity-80">
              <li>• Modern React 19 UI with Tailwind CSS</li>
              <li>• Secure Authentication & Route Guards</li>
              <li>• Dynamic Project & Task CRUD</li>
              <li>• Real-time Progress Tracking</li>
            </ul>
          </div>

          <div className="p-6 bg-purple-50 rounded-2xl border border-purple-100">
            <h3 className="font-bold text-purple-900 mb-2 flex items-center gap-2">
              Backend Features
            </h3>
            <ul className="text-sm text-purple-800 space-y-2 opacity-80">
              <li>• .NET 10 Web API (Clean Architecture)</li>
              <li>• JWT Authentication & DTO Mapping</li>
              <li>• Robust Error Handling & Validation</li>
              <li>• Specialized Logic Endpoints</li>
            </ul>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="flex flex-col items-center gap-4">
          <Link 
            to={token ? "/projects" : "/login"}
            className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 text-lg font-bold rounded-2xl 
                       text-white bg-linear-to-r from-indigo-600 to-purple-600 shadow-xl shadow-indigo-200
                       hover:scale-[1.03] transition-all duration-200 active:scale-95"
          >
            {token ? "Go to My Workspace" : "Get Started Now"}
          </Link>
          
          <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">
            Clean Architecture • DDD Principles • Vite Build
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;