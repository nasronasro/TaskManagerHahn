import { useState } from 'react';
import useProjects from '../hooks/useProjects';
import ProjectCard from '../components/ProjectCard';
import AddProjectModal from '../components/AddProjectModal';
import AddButton from '../components/ui/AddButton';
import Pagination from '../components/ui/Pagination';

function Projects() {
  const { projects, loading, error, addProject, isSaving, addError } = useProjects();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // --- Pagination State ---
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 3;

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSaveProject = async (projectData) => {
    const result = await addProject(projectData);
    if (result.success) handleCloseModal();
  };

  // --- Pagination Logic ---
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isEmpty = !loading && !error && projects.length === 0;

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-[calc(100vh-6rem)]">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Projects</span>
            </h1>
            <p className="text-gray-500 mt-1 font-medium">
              {loading ? "Loading your workspace..." : `Showing ${currentProjects.length} of ${projects.length} projects`}
            </p>
          </div>
          {!loading && (
            <AddButton onClick={handleOpenModal} className="!w-auto px-8 py-3 shadow-xl shadow-indigo-200">
              + New Project
            </AddButton>
          )}
        </header>

        {loading && (
          <div className="flex flex-col items-center justify-center py-24 text-indigo-600">
            <div className="w-12 h-12 border-4 border-current border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="font-bold animate-pulse">Syncing Database...</p>
          </div>
        )}

        {/* Project Grid */}
        {!loading && projects.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
              {currentProjects.map((project) => (
                <ProjectCard key={project.id || project.Id} project={project} />
              ))}
            </div>

            {/* Pagination UI */}
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onNext={() => paginate(currentPage + 1)}
              onPrevious={() => paginate(currentPage - 1)}
            />
          </>
        )}

        {isEmpty && (
           <div className="text-center py-20 bg-white rounded-[2.5rem] shadow-inner border-2 border-dashed border-gray-200">
             <span className="text-6xl">📂</span>
             <h2 className="text-2xl font-bold mt-4">No projects yet</h2>
             <button onClick={handleOpenModal} className="mt-6 text-indigo-600 font-bold underline">Create your first project</button>
           </div>
        )}
      </div>

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