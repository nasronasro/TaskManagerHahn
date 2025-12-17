import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProjectData } from '../hooks/useProjectData';
import { useTasks } from '../hooks/useTasks';
import TaskItem from '../components/TaskItem';
import AddTaskModal from '../components/AddTaskModal';
import ConfirmModal from '../components/ui/ConfirmModal';
import Pagination from '../components/ui/Pagination';

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { project, loading: projectLoading, fetchProject } = useProjectData(id);

  const { 
    tasks,            
    paginatedTasks,   
    pagination,       
    loading: tasksLoading, 
    addTask, 
    toggleTaskStatus, 
    deleteTask 
  } = useTasks(id, fetchProject);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const completionPercentage = useMemo(() => {
    if (!tasks || tasks.length === 0) return 0;
    
    const completedCount = tasks.filter(t => t.completed || t.Completed).length;
    return Math.round((completedCount / tasks.length) * 100);
  }, [tasks]);

  const openDeleteModal = (taskId) => {
    setTaskToDelete(taskId);
    setIsConfirmOpen(true);
  };

  const confirmDeletion = async () => {
    if (taskToDelete) {
      await deleteTask(taskToDelete);
      setTaskToDelete(null);
      setIsConfirmOpen(false);
    }
  };

  if (projectLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-slate-500 font-medium">Loading workspace...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-8 space-y-8 animate-in fade-in duration-500">
      
      {/* Navigation & Actions */}
      <div className="flex justify-between items-center">
        <button 
          onClick={() => navigate('/projects')} 
          className="group flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-semibold transition-colors"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Projects
        </button>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all active:scale-95"
        >
          + Add New Task
        </button>
      </div>

      {/* Project Banner & Progress */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
        {/* Accent line using project color */}
        <div 
          className="absolute top-0 left-0 w-full h-2" 
          style={{ backgroundColor: project?.color || '#6366f1' }}
        />
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 bg-indigo-50 px-3 py-1 rounded-md">
              Project Board
            </span>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              {project?.name || project?.title}
            </h1>
            <p className="text-slate-500 max-w-xl text-sm leading-relaxed">
              {project?.description || "Manage your objectives, track progress, and complete milestones."}
            </p>
          </div>

          <div className="w-full md:w-64 space-y-2">
            <div className="flex justify-between items-end">
              <span className="text-xs font-bold text-slate-400">COMPLETION</span>
              {/* USE LOCAL CALCULATION HERE */}
              <span className="text-2xl font-black text-indigo-600">{completionPercentage}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(99,102,241,0.3)]" 
                style={{ 
                  width: `${completionPercentage}%`,
                  backgroundColor: project?.color || '#6366f1'
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tasks Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Tasks</h2>
          <span className="bg-slate-200 text-slate-600 px-3 py-0.5 rounded-full text-xs font-bold">
            {tasks.length}
          </span>
        </div>
        
        {tasksLoading ? (
          <div className="py-20 text-center text-slate-400 font-medium italic">Refreshing task list...</div>
        ) : tasks.length > 0 ? (
          <>
            <div className="grid gap-4">
              {/* RENDER ONLY PAGINATED TASKS */}
              {(paginatedTasks || []).map(task => (
                <TaskItem 
                  key={task.id} 
                  task={task} 
                  onToggle={toggleTaskStatus} 
                  onDelete={() => openDeleteModal(task.id)}
                />
              ))}
            </div>

            {/* PAGINATION CONTROLS */}
            {pagination && (
              <Pagination 
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onNext={pagination.nextPage}
                onPrevious={pagination.prevPage}
              />
            )}
          </>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border-2 border-dashed border-slate-200">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-lg font-bold text-slate-800">No tasks found</h3>
            <p className="text-slate-500 text-sm mt-1">Ready to start? Create your first task above.</p>
          </div>
        )}
      </div>

      {/* Modals */}
      <AddTaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={addTask}
        projectId={id}
      />

      <ConfirmModal 
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDeletion}
        title="Delete Task?"
        message="Are you sure you want to delete this task? This will update your project progress immediately."
      />
    </div>
  );
}