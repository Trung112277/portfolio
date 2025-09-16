import DeleteButton from "@/components/button/delete-button";
import EditProjectsForm from "@/components/feature/form/dashboard/edit-form/edit-project-form";

export default function ProjectsEdit() {
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
          <tr>
            <td className="p-2 border ">React</td>
            <td className="p-2 border">React</td>
            <td className="p-2 border">
              https://www.facebook.com/nhattrung.dev
            </td>
            <td className="p-2 border">#1fc3ff</td>
            <td className="p-2 border">
              <div className="flex justify-center items-center gap-2">
                <EditProjectsForm projectsId="1" initialData={{}} />
                <DeleteButton title="Social Media" />
              </div>
            </td>
          </tr>
          <tr>
            <td className="p-2 border ">Next.js</td>
            <td className="p-2 border">Next.js</td>
            <td className="p-2 border">
              https://www.facebook.com/nhattrung.dev
            </td>
            <td className="p-2 border">#1fc3ff</td>
            <td className="p-2 border">
              <div className="flex justify-center items-center gap-2">
                <EditProjectsForm
                  projectsId="2"
                  initialData={{}}
                  onUpdate={async () => {
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    console.log("Social media updated successfully");
                  }}
                />
                <DeleteButton title="Social Media" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
