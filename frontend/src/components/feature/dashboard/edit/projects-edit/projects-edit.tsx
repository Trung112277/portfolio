"use client";
import { lazy, useEffect, useState } from "react";
import { useProjects } from "@/hooks/useProjects";
import { DashboardSkeleton } from "@/components/feature/loading/dashboard-skeleton";

// Lazy load components
const DeleteButton = lazy(() => import("@/components/button/delete-button"));
const EditProjectsForm = lazy(() => import("@/components/feature/form/dashboard/edit-form/edit-project-form"));

export default function ProjectsEdit() {
  const { projects, loading, error } = useProjects();
  const [componentsLoaded, setComponentsLoaded] = useState(false);

  // Preload components when section is accessed
  useEffect(() => {
    const preloadComponents = async () => {
      try {
        // Preload both components
        await Promise.all([
          import("@/components/button/delete-button"),
          import("@/components/feature/form/dashboard/edit-form/edit-project-form")
        ]);
        setComponentsLoaded(true);
      } catch (error) {
        console.error("Error preloading components:", error);
        setComponentsLoaded(true); // Still show content even if preload fails
      }
    };

    preloadComponents();
  }, []);

  // Show skeleton while loading or components not ready
  if (loading || !componentsLoaded) {
    return <DashboardSkeleton />;
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
                  />
                  <DeleteButton 
                    title={project.name}
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
