import { useState, useEffect, useCallback } from 'react';
import { PROJECT_URL } from '../config/apiConfig';

export const useProjectData = (id) => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');
  
  // Define fetchProject first so it can be returned
  const fetchProject = useCallback(async () => {
    if (!id) return;
    
    setLoading(true);
    try {
      const response = await fetch(`${PROJECT_URL}/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch project details');
      }

      const data = await response.json();
      
      // Normalize data to ensure consistent casing
      const normalizedProject = {
        ...data,
        id: data.id || data.Id,
        title: data.title || data.Title,
        description: data.description || data.Description,
        color: data.color || ["#4f46e5", "#16a34a", "#dc2626", "#ca8a04"][data.id % 4] || '#6366f1',
        // We capture backend progress, but UI will prefer local calculation
        progress: data.progress ?? 0 
      };

      setProject(normalizedProject);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id, token]);

  // Initial load
  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  // Return fetchProject so it can be passed to other hooks
  return { project, loading, error, fetchProject };
};