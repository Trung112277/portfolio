"use client";
import { useProjects } from "@/hooks/useProjects";
import { toast } from "sonner";
import DeleteButton from "@/components/button/delete-button";
import EditProjectsForm from "@/components/feature/form/dashboard/edit-form/edit-project-form";

export default function ProjectsEdit() {
  const { projects, loading, error, updateProject, deleteProject } = useProjects();

  const handleDelete = async (id: number, title: string) => {
    try {
      await deleteProject(id);
      console.log(`Project "${title}" deleted successfully`);
      toast.success(`Project "${title}" deleted successfully`);
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Error deleting project");
    }
  };

  // Show simple loading text while loading
  if (loading) {
    return <div className="text-center p-8">Loading projects...</div>;
  }

  // Show error state
  if (error) {
    return (
      <div className="w-full table-scroll overflow-x-auto">
        <div className="flex justify-center items-center p-8 text-red-500">
          <span>Error: {error}</span>
        </div>
      </div>
    );
  }

  // Show empty state
  if (projects.length === 0) {
    return (
      <div className="w-full table-scroll overflow-x-auto">
        <div className="flex justify-center items-center p-8 text-gray-500">
          <span>No projects found. Add your first project!</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full table-scroll overflow-x-auto">
      <table className="w-full text-center min-w-[500px]">
        <thead>
          <tr className=" text-xl font-bold border-b text-primary text-center">
            <th className="p-2 border w-[100px]">Name</th>
            <th className="p-2 border w-[150px]">Description</th>
            <th className="p-2 border w-[300px]">Link</th>
            <th className="p-2 border w-[100px]">Color</th>
            <th className="p-2 border w-[150px]">Action</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td className="p-2 border">{project.name}</td>
              <td className="p-2 border">{project.description}</td>
              <td className="p-2 border text-center max-w-[500px]">
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline truncate block"
                  title={project.link}
                >
                  {project.link}
                </a>
              </td>
              <td className="p-2 border">
                <div className="flex items-center justify-center gap-2">
                  <div 
                    className="w-6 h-6 rounded border"
                    style={{ backgroundColor: project.color }}
                    title={project.color}
                  ></div>
                  <span className="text-xs">{project.color}</span>
                </div>
              </td>
              <td className="p-2 border">
                <div className="flex justify-center items-center gap-2">
                  <EditProjectsForm
                    socialMediaId={project.id.toString()}
                    initialData={{
                      name: project.name,
                      description: project.description,
                      link: project.link,
                      color: project.color,
                    }}
                    onUpdate={async (updatedData) => {
                      try {
                        await updateProject(project.id, updatedData);
                        console.log("Project updated successfully");
                      } catch (error) {
                        console.error("Error updating project:", error);
                      }
                    }}
                  />
                  <DeleteButton 
                    title={project.name}
                    onDelete={() => handleDelete(project.id, project.name)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
