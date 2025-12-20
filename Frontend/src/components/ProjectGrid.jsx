import ProjectCard from './ProjectCard';
import Pagination from './ui/Pagination';

export default function ProjectGrid({ projects, isEmpty, onOpenModal, pagination }) {
  if (isEmpty) {
    return (
      <div className="text-center py-20 bg-white rounded-[2.5rem] shadow-inner border-2 border-dashed border-gray-200">
        <span className="text-6xl">📂</span>
        <h2 className="text-2xl font-bold mt-4">No projects yet</h2>
        <button onClick={onOpenModal} className="mt-6 text-indigo-600 font-bold underline">
          Create your first project
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <Pagination 
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        onNext={pagination.onNext}
        onPrevious={pagination.onPrevious}
      />
    </div>
  );
}