import DeleteButton from "@/components/button/delete-button";
import { SafeImage } from "@/components/ui/safe-image";
import EditTechListForm from "@/components/feature/form/dashboard/edit-form/edit-tech-list-form";
import SubTitle from "@/components/heading/sub-title";

export default function TechListEdit({ category }: { category: string }) {
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
            <tr>
              <td className="flex justify-center items-center p-2 border ">
                <SafeImage
                  src="/frontend-tech/react-logo.png"
                  alt="React"
                  width={50}
                  height={50}
                />
              </td>
              <td className="p-2 border">React</td>
              <td className="p-2 border">#1fc3ff</td>

              <td className="p-2 border">
                <div className="flex justify-center items-center gap-2">
                  <EditTechListForm
                    techListId="1"
                    initialData={{}}
                
                  />
                  <DeleteButton title="Tech List" onDelete={() => {}} />
                </div>
              </td>
            </tr>
            <tr>
              <td className="flex justify-center items-center p-2 border object-cover ">
                <SafeImage
                  src="/frontend-tech/nextjs-logo.png"
                  alt="Next.js"
                  width={50}
                  height={50}
                />
              </td>
              <td className="p-2 border">Next.js</td>
              <td className="p-2 border">#1fc3ff</td>
              <td className="p-2 border">
                <div className="flex justify-center items-center gap-2">
                  <EditTechListForm
                    techListId="2"
                    initialData={{}}
                  />
                  <DeleteButton title="Tech List" onDelete={() => {}} />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
