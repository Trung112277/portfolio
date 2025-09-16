import DeleteButton from "@/components/button/delete-button";
import { SafeImage } from "@/components/ui/safe-image";
import EditSocialMediaForm from "@/components/feature/form/dashboard/edit-form/edit-social-media-form";

export default function SocialMediaEdit() {
  return (
    <div className="table-scroll overflow-x-auto">
      <table className="text-center w-full min-w-[800px]">
        <thead>
          <tr className=" text-xl font-bold border-b text-primary text-center">
            <th className="p-2 border w-[100px]" >Image</th>
            <th className="p-2 border w-[150px]" >Description</th>
            <th className="p-2 border w-[300px]" >Link</th>
            <th className="p-2 border w-[100px]" >Color</th>
            <th className="p-2 border w-[150px]" >Action</th>
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
            <td className="p-2 border max-w-[200px] truncate">
              https://www.facebook.com/nhattrung.dev
            </td>
            <td className="p-2 border">#1fc3ff</td>
            <td className="p-2 border">
              <div className="flex justify-center items-center gap-2">
                <EditSocialMediaForm
                  socialMediaId="1"
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
            <td className="p-2 border max-w-[200px] truncate">
              https://www.facebook.com/nhattrung.dev
            </td>
            <td className="p-2 border">#1fc3ff</td>
            <td className="p-2 border">
              <div className="flex justify-center items-center gap-2">
                <EditSocialMediaForm
                  socialMediaId="2"
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
