import { useState, useEffect, useCallback } from 'react';
import { PROJECT_URL } from '../config/apiConfig';

export default function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);   // For the initial list fetch
  const [isSaving, setIsSaving] = useState(false); // For the "Add Project" button state
  const [error, setError] = useState(null);       // General errors
  const [addError, setAddError] = useState(null); // Specific errors for the modal

  // --- 1. FETCH ALL PROJECTS (GET) ---
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
      // Map and process the data so the UI has everything it needs (progress, colors, etc.)
      setProjects(data.map(p => processProjectData(p)));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // --- 2. ADD NEW PROJECT (POST) ---
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
        // Match your .NET UserDto/ProjectDto names
        body: JSON.stringify({
          Title: projectData.title,
          Description: projectData.description
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // This catches your catch(Exception) or BadRequest(ModelState) in .NET
        throw new Error(data.error || data.Error || "Failed to save project.");
      }

      // Process the new project returned from the DB and add it to the top of the list
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

// Helper to ensure data matches UI needs
function processProjectData(project) {
  // Check both lowercase and uppercase because .NET JSON naming can vary
  const title = project.title || project.Title;
  const id = project.id || project.Id;

  return {
    ...project,
    id,
    title,
    description: project.description || project.Description,
    progress: project.progress ?? 0,
    status: project.isCompleted ? "Completed" : "In Progress",
    // Dynamic color based on ID for a nice UI look
    color: ["#4f46e5", "#16a34a", "#dc2626", "#ca8a04"][id % 4] 
  };
}