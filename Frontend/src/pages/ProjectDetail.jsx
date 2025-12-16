import { useParams } from 'react-router-dom';
import { useProjectData } from '../hooks/useProjectData';

export default function ProjectDetail() {
  const { id } = useParams();
  const { project, totalTasks, completedTasks, progress, loading, error } = useProjectData(id);

  if (loading) return <div className="p-10 text-center animate-pulse">Loading project details...</div>;
  if (error) return <div className="p-10 text-red-500 text-center font-bold">{error}</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Header Section */}
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900">{project?.name}</h1>
          <p className="text-slate-500 mt-2">{project?.description}</p>
        </div>
        <div className="text-right">
          <span className="text-sm font-medium text-slate-400">Project ID: #{id}</span>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Total Tasks" value={totalTasks} color="bg-slate-50" />
        <StatCard title="Completed" value={completedTasks} color="bg-green-50" textColor="text-green-700" />
        <StatCard title="Progress" value={`${Math.round(progress)}%`} color="bg-blue-50" textColor="text-blue-700" />
      </div>

      {/* Progress Bar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex justify-between mb-2">
          <span className="font-semibold text-slate-700">Project Completion</span>
          <span className="text-slate-500">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-4">
          <div 
            className="bg-blue-600 h-4 rounded-full transition-all duration-500" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

// Small reusable UI component for the stats
function StatCard({ title, value, color, textColor = "text-slate-900" }) {
  return (
    <div className={`${color} p-6 rounded-2xl border border-transparent hover:border-slate-200 transition-all`}>
      <p className="text-sm font-medium text-slate-500 uppercase">{title}</p>
      <p className={`text-3xl font-bold mt-1 ${textColor}`}>{value}</p>
    </div>
  );
}