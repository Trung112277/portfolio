"use client";

import DeleteButton from "@/components/button/delete-button";
import EditWorkExperienceForm from "@/components/feature/form/dashboard/edit-form/edit-work-experience-form";
import { useWorkExperience } from "@/hooks/useWorkExperience";
import { toast } from "sonner";

export function WorkExperienceEdit() {
  const { 
    workExperiences, 
    loading, 
    error, 
    deleteWorkExperience 
  } = useWorkExperience();



  const handleDelete = async (id: string) => {
    try {
      await deleteWorkExperience(id);
      toast.success("Work experience deleted successfully");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.error("Failed to delete work experience");
      }
    }
  };

  const formatDescription = (description: string) => {
    return description.split("\n").filter((line) => line.trim() !== "");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="flex items-center justify-center gap-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          <div className="text-lg">Loading work experiences...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-lg text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (workExperiences.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-lg text-gray-500">No work experiences found.</div>
      </div>
    );
  }

  return (
    <div className="grid xl:grid-cols-2 grid-cols-1 gap-4">
      {workExperiences.map((experience) => (
        <div
          key={experience.id}
          className="flex flex-col items-center border rounded-lg"
        >
          <div className="flex items-center w-full ">
            <div className="w-[200px] border-r min-h-[50px] items-center flex justify-center px-2">
              <h4 className="font-bold text-primary text-lg text-center">
                Position
              </h4>
            </div>
            <div className=" w-full min-w-[calc(100%-200px)] min-h-[50px] items-center flex px-2 ">
              <span className="truncate">{experience.position}</span>
            </div>
          </div>
          <div className="flex items-center w-full border-t">
            <div className="w-[200px] border-r min-h-[50px] items-center flex justify-center px-2">
              <h4 className="font-bold text-primary text-lg text-center">
                Company Name
              </h4>
            </div>
            <div className=" w-full min-w-[calc(100%-200px)] min-h-[50px] items-center flex px-2 ">
              <span className="truncate">{experience.company_name}</span>
            </div>
          </div>
          <div className="flex items-center border-t w-full">
            <div className=" min-h-[50px] w-[200px] items-center flex justify-center border-r px-2">
              <h4 className="font-bold text-primary text-lg text-center">
                Year
              </h4>
            </div>
            <div className="w-full min-w-[calc(100%-200px)] min-h-[50px] items-center flex px-2">
              <time
                className="truncate"
                dateTime={`${experience.start_year}/${experience.end_year}`}
              >
                {experience.start_year} - {experience.end_year}
              </time>
            </div>
          </div>
          <div className="flex items-center w-full border-t">
            <div className="w-[200px] border-r min-h-[50px] items-center flex justify-center px-2">
              <h4 className="font-bold text-primary text-lg text-center">
                Work Arrangement
              </h4>
            </div>
            <div className=" w-full min-w-[calc(100%-200px)] min-h-[50px] items-center flex px-2 ">
              <span className="truncate capitalize">
                {experience.work_arrangement}
              </span>
            </div>
          </div>
          <div className="flex items-center w-full border-t">
            <div className="w-[200px] border-r min-h-[50px] items-center flex justify-center px-2">
              <h4 className="font-bold text-primary text-lg text-center">
                Tech List
              </h4>
            </div>
            <div className=" w-full min-w-[calc(100%-200px)] min-h-[50px] items-center flex px-2 table-scroll overflow-x-auto gap-1">
              {(() => {
                const techStack = Array.isArray(experience.tech_stack) 
                  ? experience.tech_stack 
                  : (experience.tech_stack as string).split(' ').map((s: string) => s.trim()).filter(s => s.length > 0);
                
                return techStack.map((tech, index) => (
                  <span
                    key={`${tech}-${index}`}
                    className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-md border border-primary/20"
                  >
                    {tech}
                  </span>
                ));
              })()}
            </div>
          </div>
          <div className="flex px-2 flex-col w-full border-t h-full">
            <div className=" min-h-[50px] items-center flex"> 
              <h4 className="font-bold text-primary text-lg text-center">
                Description:
              </h4>
            </div>
            <div className="border rounded-lg p-2 bg-background h-full">
              <ul className="list-disc list-inside">
                {formatDescription(experience.description).map(
                  (line, index) => (
                    <li key={index} className="leading-relaxed">
                      {line}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
          <div className="flex justify-center items-center gap-2 w-full py-4">
            <EditWorkExperienceForm
              workExperienceId={experience.id.toString()}
              initialData={{
                position: experience.position,
                companyName: experience.company_name,
                startYear: experience.start_year.toString(),
                endYear: experience.end_year.toString(),
                workArrangement: experience.work_arrangement,
                techStack: Array.isArray(experience.tech_stack) 
                  ? experience.tech_stack.join(' ') 
                  : experience.tech_stack,
                description: experience.description,
              }}
            />
            <DeleteButton
              title="Work Experience"
              onDelete={() => handleDelete(experience.id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
