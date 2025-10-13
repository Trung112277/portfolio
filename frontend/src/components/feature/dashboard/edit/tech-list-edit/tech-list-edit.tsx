"use client";
import { useTechStack } from "@/hooks/useTechStack";
import { toast } from "sonner";
import DeleteButton from "@/components/button/delete-button";
import { SafeImage } from "@/components/ui/safe-image";
import EditTechListForm from "@/components/feature/form/dashboard/edit-form/edit-tech-list-form";
import SubTitle from "@/components/heading/sub-title";
import { TechListFormInputs } from "@/types/tech-list-form";

export default function TechListEdit({ category }: { category: string }) {
  const { techStack, loading, error, updateTech, deleteTech } = useTechStack(
    category.toLowerCase()
  );

  const handleDelete = async (id: number, name: string) => {
    try {
      await deleteTech(id);
      console.log(`Tech stack "${name}" deleted successfully`);
      toast.success(`Tech stack "${name}" deleted successfully`);
    } catch (error) {
      console.error("Error deleting tech stack:", error);
      toast.error("Error deleting tech stack");
      throw error;
    }
  };

  // Tech stack is already filtered by category from the hook
  const filteredTechStack = techStack;

  // Show loading state
  if (loading) {
    return (
      <div>
        <div className="mb-4">
          <SubTitle>{category} Tech List</SubTitle>
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          <div className="text-center p-4">
            Loading {category.toLowerCase()}
            tech...
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div>
        <div className="mb-4">
          <SubTitle>{category} Tech List</SubTitle>
        </div>
        <div className="text-center p-4 text-red-500">Error: {error}</div>
      </div>
    );
  }

  // Show empty state
  if (filteredTechStack.length === 0) {
    return (
      <div>
        <div className="mb-4">
          <SubTitle>{category} Tech List</SubTitle>
        </div>
        <div className="text-center p-4 text-gray-500">
          No {category.toLowerCase()} tech found.
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4">
        <SubTitle>{category} Tech List</SubTitle>
      </div>
      <div className="table-scroll overflow-x-auto">
        <table className="w-full text-center min-w-[500px]">
          <thead>
            <tr className=" text-xl font-bold border-b text-primary text-center">
              <th className="p-2 border w-[100px]">Image</th>
              <th className="p-2 border w-[150px]">Name</th>
              <th className="p-2 border w-[100px]">Color</th>
              <th className="p-2 border w-[150px]">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTechStack.map((tech) => (
              <tr key={tech.id}>
                <td className="flex justify-center items-center p-2 border ">
                  <SafeImage
                    src={tech.image_url}
                    alt={tech.name}
                    width={50}
                    height={50}
                    className="h-[50px] w-[50px] object-contain rounded-md"
                  />
                </td>
                <td className="p-2 border">{tech.name}</td>
                <td className="p-2 border">
                  <div className="flex items-center justify-center gap-2">
                    <div
                      className="w-6 h-6 rounded border"
                      style={{ backgroundColor: tech.color }}
                      title={tech.color}
                    ></div>
                    <span className="text-xs">{tech.color}</span>
                  </div>
                </td>
                <td className="p-2 border">
                  <div className="flex justify-center items-center gap-2">
                    <EditTechListForm
                      techListId={tech.id.toString()}
                      initialData={{
                        name: tech.name,
                        category: category.toLowerCase(),
                        color: tech.color,
                        image_url: tech.image_url,
                      }}
                      onUpdate={async (updatedData: TechListFormInputs) => {
                        try {
                          await updateTech(tech.id, {
                            name: updatedData.name,
                            color: updatedData.color,
                            category: updatedData.category,
                            image_url: updatedData.image_url || tech.image_url,
                          });
                          console.log("Tech stack updated successfully");
                        } catch (error) {
                          console.error("Error updating tech stack:", error);
                        }
                      }}
                    />
                    <DeleteButton
                      title={tech.name}
                      onDelete={() => handleDelete(tech.id, tech.name)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
