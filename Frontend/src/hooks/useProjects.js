import { useState, useEffect, useCallback } from 'react';
import { PROJECT_URL } from '../config/apiConfig';

export default function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);   
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);      
  const [addError, setAddError] = useState(null); 

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(PROJECT_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        if (response.status === 401) throw new Error("Session expired. Please login again.");
        throw new Error(`Error ${response.status}: Could not load projects.`);
      }

      const data = await response.json();
      // Use the helper function to normalize data
      setProjects(data.map(p => processProjectData(p)));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const addProject = async (projectData) => {
    setIsSaving(true);
    setAddError(null);
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(PROJECT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          Title: projectData.title,
          Description: projectData.description
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.Error || "Failed to save project.");
      }

      const newlyCreatedProject = processProjectData(data);
      setProjects((prev) => [newlyCreatedProject, ...prev]);
      
      return { success: true };
    } catch (err) {
      setAddError(err.message);
      return { success: false, error: err.message };
    } finally {
      setIsSaving(false);
    }
  };

  // Run fetch on mount
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return { 
    projects, 
    loading, 
    error, 
    isSaving, 
    addError, 
    addProject, 
    refresh: fetchProjects 
  };
}

function processProjectData(project) {
  const id = project.id || project.Id;
  const title = project.title;
  
  return {
    ...project,
    id,
    title,
    description: project.description || project.Description,
    progress: project.progress ?? 0,
    isCompleted: project.isCompleted ,
    status: (project.isCompleted) ? "Completed" : "In Progress",
    // Deterministic color assignment based on ID
    color: ["#4f46e5", "#16a34a", "#dc2626", "#ca8a04"][id % 4] || '#6366f1'
  };
}