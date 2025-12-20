// components/ProjectDetails/ProjectStats.jsx
import ProgressBar from '../ui/ProgressBar';

export default function ProjectStats({ project, tasks }) {
  const brandColor = project?.color || '#6366f1';

  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2" style={{ backgroundColor: brandColor }} />
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 bg-indigo-50 px-3 py-1 rounded-md">
            Project Board
          </span>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            {project?.name || project?.title}
          </h1>
          <p className="text-slate-500 max-w-xl text-sm leading-relaxed">
            {project?.description || "Manage your objectives and milestones."}
          </p>
        </div>

        <div className="w-full md:w-64">
          <ProgressBar tasks={tasks} color={brandColor} />
        </div>
      </div>
    </div>
  );
}