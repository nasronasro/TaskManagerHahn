import { useState, useEffect, useCallback, useMemo } from 'react';
import { BASE_URL, TASKS_ENDPOINT } from '../config/apiConfig';

export const useTasks = (projectId, onDataChange, itemsPerPage = 5) => {
  const [tasks, setTasks] = useState([]); // Stores ALL tasks
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);

  const token = localStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  // GET ALL TASKS
  const fetchTasks = useCallback(async () => {
    if (!projectId) return;

    try {
      const res = await fetch(`${BASE_URL}${TASKS_ENDPOINT}/${projectId}`, { headers });
      if (!res.ok) throw new Error("Failed to load tasks");
      const data = await res.json();
      
      const normalizedData = data.map(t => ({
        id: t.id ?? t.Id,
        title: t.title ?? t.Title,
        description: t.description ?? t.Description,
        completed: t.completed ?? t.Completed ?? t.isCompleted ?? t.IsCompleted,
        dueDate: t.dueDate ?? t.DueDate,
        projectId: t.projectId ?? t.ProjectId
      }));

      setTasks(normalizedData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  // Derived Pagination Data
  const totalPages = Math.ceil(tasks.length / itemsPerPage);

  const paginatedTasks = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return tasks.slice(startIndex, startIndex + itemsPerPage);
  }, [tasks, currentPage, itemsPerPage]);

  // Pagination Controls
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const nextPage = () => goToPage(currentPage + 1);
  const prevPage = () => goToPage(currentPage - 1);

  // Reset to page 1 if tasks change significantly (optional, but good UX on filter/sort)
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [tasks.length, totalPages]);

  // REFRESH HELPER
  const refreshWorkspace = async () => {
    await fetchTasks(); 
    if (onDataChange && typeof onDataChange === 'function') {
      onDataChange(); 
    }
  };

  // CREATE TASK
  const addTask = async (taskData) => {
    try {
      const res = await fetch(`${BASE_URL}${TASKS_ENDPOINT}`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ 
            Title: taskData.title,
            Description: taskData.description,
            DueDate: taskData.dueDate,
            ProjectId: parseInt(projectId) 
        })
      });
      if (!res.ok) throw new Error("Could not create task");
      
      await refreshWorkspace(); 
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // TOGGLE STATUS (PATCH)
  const toggleTaskStatus = async (taskId) => {
    const taskToUpdate = tasks.find(t => t.id === taskId);
    if (!taskToUpdate) return;

    const originalStatus = taskToUpdate.completed;

    setTasks(prev => prev.map(t => 
      t.id === taskId ? { ...t, completed: !originalStatus } : t
    ));

    try {
      const res = await fetch(`${BASE_URL}${TASKS_ENDPOINT}/${taskId}`, {
        method: 'PATCH',
        headers

      });

      if (!res.ok) {
        setTasks(prev => prev.map(t => 
            t.id === taskId ? { ...t, completed: originalStatus } : t
        ));
        throw new Error("Could not update task");
      }
      
      await refreshWorkspace();
    } catch (err) {
      console.error("Toggle error:", err.message);
    }
  };

  // DELETE TASK
  const deleteTask = async (taskId) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));

    try {
      const res = await fetch(`${BASE_URL}${TASKS_ENDPOINT}/${taskId}`, {
        method: 'DELETE',
        headers
      });
      if (!res.ok) throw new Error("Could not delete task");
      
      await refreshWorkspace();
    } catch (err) {
      console.error("Delete error:", err.message);
      await fetchTasks();
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return { 
    tasks, 
    paginatedTasks, 
    loading, 
    error, 
    addTask, 
    toggleTaskStatus, 
    deleteTask, 
    fetchTasks,
    pagination: {
      currentPage,
      totalPages,
      goToPage,
      nextPage,
      prevPage,
      hasMore: currentPage < totalPages
    }
  };
};