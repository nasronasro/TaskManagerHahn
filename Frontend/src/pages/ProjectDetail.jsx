import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProjectData } from '../hooks/useProjectData';
import { useTasks } from '../hooks/useTasks';

// Sub-components
import ProjectStats from '../components/ProjectDetails/ProjectStats';
import TaskList from '../components/ProjectDetails/TaskList';
import AddTaskModal from '../components/ui/AddTaskModal';
import ConfirmModal from '../components/ui/ConfirmModal';

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Data Fetching
  const { project, loading: projectLoading, fetchProject } = useProjectData(id);
  const { 
    tasks, paginatedTasks, pagination, loading: tasksLoading, 
    addTask, toggleTaskStatus, deleteTask 
  } = useTasks(id, fetchProject);

  // State Management
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [filter, setFilter] = useState('all');

  const filteredTasks = useMemo(() => {
    if (filter === 'completed') return tasks.filter(t => t.completed || t.Completed);
    if (filter === 'pending') return tasks.filter(t => !t.completed && !t.Completed);
    return tasks;
  }, [tasks, filter]);

  // Update completion percentage to always use the full list for accuracy
  const completionPercentage = useMemo(() => {
    if (!tasks?.length) return 0;
    const completedCount = tasks.filter(t => t.completed || t.Completed).length;
    return Math.round((completedCount / tasks.length) * 100);
  }, [tasks]);

  if (projectLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-8 space-y-8 animate-in fade-in duration-500">
      
      {/* 1. Header Actions */}
      <header className="flex justify-between items-center">
        <button onClick={() => navigate('/projects')} className="group flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-semibold transition-colors">
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Back
        </button>
        <button onClick={() => setIsModalOpen(true)} className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-700 shadow-lg active:scale-95 transition-all">
          + Add New Task
        </button>
      </header>

      {/* 2. Project Info Section */}
      <ProjectStats project={project} completionPercentage={completionPercentage} />

      {/* 3. Tasks Section */}
      <TaskList 
        tasks={filteredTasks} // Pass the filtered result
        totalCount={tasks.length}
        currentFilter={filter}
        setFilter={setFilter}
        loading={tasksLoading}
        onToggle={toggleTaskStatus}
        onDeleteClick={(id) => setTaskToDelete(id)}
        pagination={pagination}
      />

      {/* 4. Modals (Conditional Rendering) */}
      <AddTaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={addTask}
        projectId={id}
      />

      <ConfirmModal 
        isOpen={!!taskToDelete}
        onClose={() => setTaskToDelete(null)}
        onConfirm={async () => {
          await deleteTask(taskToDelete);
          setTaskToDelete(null);
        }}
        title="Delete Task?"
        message="Are you sure? This will update your project progress immediately."
      />
    </div>
  );
}

// Simple internal component for clean loading state
function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      <p className="mt-4 text-slate-500 font-medium">Loading workspace...</p>
    </div>
  );
}