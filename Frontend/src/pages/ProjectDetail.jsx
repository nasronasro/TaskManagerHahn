import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProjectData } from '../hooks/useProjectData';
import { useTasks } from '../hooks/useTasks';
import TaskItem from '../components/TaskItem';
import AddTaskModal from '../components/AddTaskModal';
import ConfirmModal from '../components/ui/ConfirmModal';

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  // Data for the Project itself
  const { project, progress, loading: projectLoading } = useProjectData(id);
  // Data and CRUD logic for Tasks
  const { tasks, loading: tasksLoading, addTask, toggleTaskStatus, deleteTask } = useTasks(id);
  

  const openDeleteModal = (taskId) => {
    setTaskToDelete(taskId);
    setIsConfirmOpen(true);
  };

  const confirmDeletion = () => {
    if (taskToDelete) {
      deleteTask(taskToDelete);
      setTaskToDelete(null);
    }
  };

  if (projectLoading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header & Progress */}
      <div className="flex justify-between items-start">
        <button onClick={() => navigate('/projects')} className="text-indigo-600 font-medium">← Back</button>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-indigo-700 transition-all"
        >
          + New Task
        </button>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">{project?.name || project?.title}</h1>
        <div className="mt-4 w-full bg-slate-100 rounded-full h-3">
          <div 
            className="bg-indigo-600 h-3 rounded-full transition-all duration-700" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-slate-500 mt-2 font-medium">Project Progress: {Math.round(progress)}%</p>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Tasks ({tasks.length})</h2>
        
        {tasksLoading ? (
          <p>Loading tasks...</p>
        ) : tasks.length > 0 ? (
          <div className="grid gap-3">
            {tasks.map(task => (
              <TaskItem 
                key={task.id || task.Id} 
                task={task} 
                onToggle={toggleTaskStatus} 
                onDelete={() => openDeleteModal(task.id || task.Id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
            <p className="text-slate-500">No tasks yet. Click "New Task" to begin.</p>
          </div>
        )}
      </div>

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
        message="Are you sure you want to delete this task? This action cannot be undone."
      />
    </div>
  );
}