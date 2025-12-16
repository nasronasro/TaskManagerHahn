import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  // 1. Logic for dynamic styling kept separate for readability
  const statusClasses = {
    "In Progress": "text-indigo-800 bg-indigo-100",
    "Completed": "text-green-800 bg-green-100",
    "Not Started": "text-blue-800 bg-blue-100",
    "Pending": "text-gray-800 bg-gray-100",
  };
  
  const statusBadge = statusClasses[project.status] || "text-gray-800 bg-gray-100";
  
  return (
    <div 
      className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 p-6 flex flex-col justify-between border-t-4" 
      style={{ borderColor: project.color }}
    >
      <div>
        <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium ${statusBadge} mb-4`}>
          {project.status}
        </span>
        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-1">
          {project.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {project.description}
        </p>
      </div>
      
      <div className="mt-auto pt-4">
        {/* Progress Section */}
        <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
          <span>Progress ({project.completedTasks}/{project.totalTasks || 0} tasks)</span>
          <span>{Math.round(project.progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${project.progress}%`, backgroundColor: project.color }}
          ></div>
        </div>

        {/* Action Section */}
        <div className="text-xs text-gray-500 mt-4 flex justify-between items-center">
            <span>ID: {project.id}</span>
            {/* 2. Changed <a> to <Link> for React Router navigation */}
            <Link 
                to={`/projects/${project.id}`} 
                className="text-indigo-600 hover:text-indigo-800 font-bold text-sm transition-colors"
            >
              View Details &rarr;
            </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;