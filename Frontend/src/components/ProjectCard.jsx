
import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  const statusClasses = {
    "In Progress": "text-yellow-800 bg-yellow-100",
    "Completed": "text-green-800 bg-green-100",
    "Blocked": "text-red-800 bg-red-100",
    "Pending": "text-blue-800 bg-blue-100",
  };
  
  const statusBadge = statusClasses[project.status] || "text-gray-800 bg-gray-100";
  
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 p-6 flex flex-col justify-between border-t-4" style={{ borderColor: project.color.replace('bg-', '#').replace('-500', '500') }}>
      <div>
        <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium ${statusBadge} mb-4`}>
          {project.status}
        </span>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {project.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {project.description}
        </p>
      </div>
      
      {/* Progress Bar */}
      <div className="mt-auto pt-4">
        <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
          <span>Progress</span>
          <span>{project.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className={`h-2.5 rounded-full`}
            style={{ width: `${project.progress}%`, backgroundColor: project.color.replace('bg-', '#').replace('-500', '500') }}
          ></div>
        </div>
        <div className="text-xs text-gray-500 mt-3 flex justify-between">
            <span>Last Updated: {project.lastUpdated}</span>
            <Link 
                to={`/projects/${project.id}`} 
                className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
                View Details &rarr;
            </Link>
        </div>
      </div>
    </div>
  );
};
export default ProjectCard