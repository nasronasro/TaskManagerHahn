// components/ui/ProgressBar.jsx
import { useMemo } from 'react';

export default function ProgressBar({ tasks = [], color = '#6366f1' }) {
  // Logic extracted from your ProjectStats
  const stats = useMemo(() => {
    if (!tasks?.length) return { percentage: 0, completed: 0, total: 0 };
    
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed || t.Completed).length;
    const percentage = Math.round((completed / total) * 100);
    
    return { percentage, completed, total };
  }, [tasks]);

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-end">
        <span className="text-xs font-bold text-slate-400">PROGRESS</span>
        <span className="text-2xl font-black text-indigo-600">{stats.percentage}%</span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
        <div 
          className="h-full rounded-full transition-all duration-1000 ease-out" 
          style={{ width: `${stats.percentage}%`, backgroundColor: color }}
        />
      </div>
      <p className="text-[10px] text-slate-400 italic">
        {stats.completed} of {stats.total} tasks finished
      </p>
    </div>
  );
}