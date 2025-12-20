import { useState } from 'react';
import useProjects from '../hooks/useProjects';
import ProjectGrid from '../components/ProjectGrid'; 
import AddProjectModal from '../components/ui/AddProjectModal';
import AddButton from '../components/ui/AddButton';

function Projects() {
  const { projects, loading, error, addProject, isSaving, addError } = useProjects();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 3;

  const handleSaveProject = async (projectData) => {
    const result = await addProject(projectData);
    if (result.success) setIsModalOpen(false);
  };

  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const currentProjects = projects.slice(
    (currentPage - 1) * projectsPerPage, 
    currentPage * projectsPerPage
  );

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-[calc(100vh-6rem)]">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">
              My <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600">Projects</span>
            </h1>
            <p className="text-gray-500 mt-1 font-medium">
              {loading ? "Loading..." : `Showing ${currentProjects.length} of ${projects.length} projects`}
            </p>
          </div>
          {!loading && (
            <AddButton onClick={() => setIsModalOpen(true)} className="px-8 py-3 shadow-xl shadow-indigo-200">
              + New Project
            </AddButton>
          )}
        </header>

        {loading ? (
          <LoadingState />
        ) : (
          <ProjectGrid
            projects={currentProjects} 
            isEmpty={projects.length === 0}
            onOpenModal={() => setIsModalOpen(true)}
            pagination={{
              currentPage,
              totalPages,
              onNext: () => setCurrentPage(prev => prev + 1),
              onPrevious: () => setCurrentPage(prev => prev - 1)
            }}
          />
        )}
      </div>

      <AddProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProject}
        isSaving={isSaving}
        addError={addError}
      />
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-indigo-600">
      <div className="w-12 h-12 border-4 border-current border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="font-bold animate-pulse">Syncing Database...</p>
    </div>
  );
}

export default Projects;