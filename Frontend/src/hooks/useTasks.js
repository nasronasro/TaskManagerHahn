import { useState, useEffect } from 'react';
import { BASE_URL,TASKS_ENDPOINT } from '../config/apiConfig';

export const useTasks = (projectId) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  // 1. GET ALL TASKS
  const fetchTasks = async () => {
    try {
      const res = await fetch(`${BASE_URL}${TASKS_ENDPOINT}/${projectId}`, { headers });
      if (!res.ok) throw new Error("Failed to load tasks");
      const data = await res.json();
        console.log("RAW API DATA:", data); 
        console.log("FIRST TASK KEYS:", data.length > 0 ? Object.keys(data[0]) : "No tasks found");
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 2. CREATE TASK
  const addTask = async (taskData) => {
    try {
      const res = await fetch(`${BASE_URL}${TASKS_ENDPOINT}`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ ...taskData, projectId: parseInt(projectId) })
      });
      if (!res.ok) throw new Error("Could not create task");
      fetchTasks(); // Refresh list after adding
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // 3. TOGGLE STATUS (PATCH)
  const toggleTaskStatus = async (taskId) => {
    try {
      const res = await fetch(`${BASE_URL}${TASKS_ENDPOINT}/${taskId}`, {
        method: 'PATCH',
        headers
      });
      if (!res.ok) throw new Error("Could not update task");
      
      // Optimistic Update: Update UI instantly for a better feel
      setTasks(prev => prev.map(t => 
        (t.id === taskId) ? { ...t, completed: !t.completed } : t
      ));
    } catch (err) {
      console.error(err.message);
    }
  };

  // 4. DELETE TASK
  const deleteTask = async (taskId) => {
    try {
      const res = await fetch(`${BASE_URL}${TASKS_ENDPOINT}/${taskId}`, {
        method: 'DELETE',
        headers
      });
      if (!res.ok) throw new Error("Could not delete task");
      setTasks(prev => prev.filter(t => (t.id !== taskId && t.Id !== taskId)));
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    if (projectId) fetchTasks();
  }, [projectId]);

  return { tasks, loading, error, addTask, toggleTaskStatus, deleteTask };
};