import TaskItem from './TaskItem';
import Pagination from '../ui/Pagination';

export default function TaskList({ 
  tasks, 
  totalCount,
  currentFilter, 
  setFilter, 
  loading, 
  onToggle, 
  onDeleteClick, 
  pagination 
}) {
  
  const filterOptions = [
    { id: 'all', label: 'All' },
    { id: 'pending', label: 'Pending' },
    { id: 'completed', label: 'Completed' },
  ];

  return (
    <div className="space-y-6">
      {/* Header & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Tasks</h2>
          <span className="bg-slate-200 text-slate-600 px-3 py-0.5 rounded-full text-xs font-bold">
            {totalCount}
          </span>
        </div>

        {/* Filter Pills */}
        <div className="flex bg-slate-100 p-1 rounded-xl w-fit">
          {filterOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setFilter(opt.id)}
              className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
                currentFilter === opt.id 
                  ? 'bg-white text-indigo-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Task Rendering */}
      {loading ? (
        <div className="py-20 text-center text-slate-400 font-medium italic">Updating...</div>
      ) : tasks.length > 0 ? (
        <div className="grid gap-4">
          {tasks.map((task) => (
            <TaskItem 
              key={task.id} 
              task={task} 
              onToggle={onToggle} 
              onDelete={() => onDeleteClick(task.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
          <p className="text-slate-500 font-medium">No {currentFilter} tasks found.</p>
        </div>
      )}

      {pagination && <Pagination {...pagination} />}
    </div>
  );
}