import React from 'react';
import { Link } from 'react-router-dom';
import ProgressBar from './ui/ProgressBar'; // Import the new component

const ProjectCard = ({ project }) => {
  const statusClasses = {
    "In Progress": "text-indigo-700 bg-indigo-50 border-indigo-100",
    "Completed": "text-emerald-700 bg-emerald-50 border-emerald-100",
    "Not Started": "text-amber-700 bg-amber-50 border-amber-100",
    "Pending": "text-slate-600 bg-slate-50 border-slate-100",
  };
  
  const statusBadge = statusClasses[project.status] || "text-gray-600 bg-gray-50 border-gray-100";
  const projectId = project.id || project.Id;
  const projectTitle = project.title || project.name;
  const projectColor = project.color || '#6366f1';

  return (
    <div className="group relative bg-white rounded-3xl p-7 flex flex-col justify-between border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1.5" style={{ backgroundColor: projectColor }} />

      <div>
        <div className="flex justify-between items-start mb-5">
          <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border ${statusBadge}`}>
            {project.status || "Unknown"}
          </span>
          <span className="text-[10px] font-mono text-gray-400 bg-gray-50 px-2 py-1 rounded">
            #{projectId}
          </span>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors line-clamp-1">
          {projectTitle}
        </h3>
        
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-6 h-10">
          {project.description || "No description provided."}
        </p>
      </div>
      
      <div className="space-y-4">
        <Link 
          to={`/projects/${projectId}`} 
          className="w-full flex items-center justify-center gap-2 py-3 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-indigo-600 transition-all group/btn"
        >
          Manage Tasks
          <span className="group-hover/btn:translate-x-1 transition-transform duration-300">→</span>
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;