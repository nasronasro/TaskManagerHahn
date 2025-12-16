import { useState, useEffect } from 'react';
import { BASE_URL,PROJECTS_ENDPOINT } from '../config/apiConfig';

export const useProjectData = (projectId) => {
  const [data, setData] = useState({
    project: null,
    totalTasks: 0,
    completedTasks: 0,
    progress: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const headers = { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' 
        };

        // Fetch everything in parallel
        const [resProj, resTotal, resDone, resProgress] = await Promise.all([
          fetch(`${BASE_URL}${PROJECTS_ENDPOINT}/${projectId}`, { headers }),
          fetch(`${BASE_URL}${PROJECTS_ENDPOINT}/counttasks/${projectId}`, { headers }),
          fetch(`${BASE_URL}${PROJECTS_ENDPOINT}/counttasks/${projectId}/completed`, { headers }),
          fetch(`${BASE_URL}${PROJECTS_ENDPOINT}/counttasks/${projectId}/progress`, { headers })
        ]);

        if (!resProj.ok) throw new Error("Could not load project details");

        setData({
          project: await resProj.json(),
          totalTasks: await resTotal.json(),
          completedTasks: await resDone.json(),
          progress: await resProgress.json(),
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (projectId) fetchAllData();
  }, [projectId]);

  return { ...data, loading, error };
};