import ProjectCard from "../components/ProjectCard";

const MOCK_PROJECTS = [
  {
    id: 1,
    title: "E-Commerce Rebuild",
    description: "Modernizing the existing online store with new payment gateways and a component-based architecture.",
    status: "In Progress",
    progress: 75,
    lastUpdated: "2 days ago",
    color: "bg-indigo-500",
  },
  {
    id: 2,
    title: "AI Chatbot Integration",
    description: "Integrating a Gemini-powered conversational agent for customer support and quick Q&A.",
    status: "Completed",
    progress: 100,
    lastUpdated: "5 hours ago",
    color: "bg-green-500",
  },
  {
    id: 3,
    title: "Database Migration",
    description: "Moving from a legacy SQL database to a scalable Firestore/NoSQL structure.",
    status: "Blocked",
    progress: 30,
    lastUpdated: "1 week ago",
    color: "bg-red-500",
  },
  {
    id: 4,
    title: "Mobile App Wireframing",
    description: "Initial design and wireframe creation for the new iOS and Android companion application.",
    status: "Pending",
    progress: 10,
    lastUpdated: "1 month ago",
    color: "bg-yellow-500",
  },
];

function Projects() {
  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-[calc(100vh-6rem)]">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900">
            My Projects
          </h1>
          <button
            className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-150 transform hover:scale-105"
          >
            + Create New Project
          </button>
        </div>
        
        {/* Responsive Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {MOCK_PROJECTS.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            <p className="text-lg">You don't have any projects yet.</p>
            <p className="text-sm mt-2">Click "Create New Project" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Projects;