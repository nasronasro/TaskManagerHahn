import { useState } from 'react';
import useProjects from '../hooks/useProjects';
import ProjectCard from '../components/ProjectCard';
import AddProjectModal from '../components/AddProjectModal';
import AddButton from '../components/ui/AddButton';

function Projects() {
  // We extract isSaving and addError directly from the hook now
  const { projects, loading, error, addProject, isSaving, addError } = useProjects();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveProject = async (projectData) => {
    // The hook handles the fetch, the token, and the internal state
    const result = await addProject(projectData);
    
    // Only close the modal if the backend returned success
    if (result.success) {
      handleCloseModal(); 
    }
  };

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-[calc(100vh-6rem)]">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              My Projects
            </h1>
            <p className="text-gray-500 mt-1">
              You have <span className="font-semibold text-indigo-600">{projects.length}</span> active projects.
            </p>
          </div>
          <AddButton
            onClick={handleOpenModal}
            className="!w-auto px-6 py-2.5 shadow-lg shadow-indigo-100"
          >
            + Create New Project
          </AddButton>
        </header>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 text-indigo-600">
            <svg className="animate-spin h-8 w-8 mb-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="font-medium">Fetching your workspace...</span>
          </div>
        )}
        
        {/* Error State */}
        {error && (
          <div className="max-w-2xl mx-auto text-center py-6 px-4 mb-8 text-red-700 bg-red-50 border border-red-200 rounded-xl">
            <p className="font-bold">Failed to load projects</p>
            <p className="text-sm opacity-90">{error}</p>
          </div>
        )}

        {/* Project Grid */}
        {!loading && projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : !loading && !error && (
          <div className="text-center py-20 bg-white border-2 border-dashed border-gray-200 rounded-3xl">
            <div className="text-5xl mb-4">📁</div>
            <h3 className="text-xl font-bold text-gray-900">No projects found</h3>
            <p className="text-gray-500 mt-2 max-w-xs mx-auto">
              Your workspace is empty. Create your first project to start tracking tasks.
            </p>
            <button 
              onClick={handleOpenModal}
              className="mt-6 text-indigo-600 font-semibold hover:text-indigo-700"
            >
              Get started now &rarr;
            </button>
          </div>
        )}
      </div>

      {/* Modal is kept at the bottom for clean DOM structure */}
      <AddProjectModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveProject}
        isSaving={isSaving}
        addError={addError}
      />
    </div>
  );
}

export default Projects;