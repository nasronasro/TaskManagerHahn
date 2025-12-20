
export default function TaskItem({ task, onToggle, onDelete }) {
  // Handle C# PascalCase or JS camelCase
  const isCompleted = task.completed ?? task.Completed;
  const taskId = task.id ?? task.Id;
  const title = task.title ?? task.Title;
  const dueDate = task.dueDate ?? task.DueDate;

  return (
    <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:shadow-md transition-shadow group">
      <div className="flex items-center gap-4">
        {/* Toggle Checkbox */}
        <input
          type="checkbox"
          checked={!!isCompleted}
          onChange={() => onToggle(taskId)}
          className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
        />
        
        <div>
          <h4 className={`font-medium ${isCompleted ? 'line-through text-slate-400' : 'text-slate-800'}`}>
            {title}
          </h4>
          {dueDate && (
            <p className="text-xs text-slate-500">
              Due: {new Date(dueDate).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>

      {/* Delete Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(taskId);
        }}
        className="text-red-400 hover:text-red-600 p-2 opacity-0 group-hover:opacity-100 transition-opacity"
        title="Delete Task"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
}