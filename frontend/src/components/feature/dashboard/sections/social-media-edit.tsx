import DeleteButton from "@/components/button/delete-button";
import EditButton from "@/components/button/edit-button";
import { SafeImage } from "@/components/ui/safe-image";

export default function SocialMediaEdit() {
  return (
    <div>
      <table className="w-full text-center">
        <thead>
          <tr className=" text-xl font-bold border-b">
            <th className="p-2 border ">Image</th>
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Link</th>
            <th className="p-2 border">Color</th>
            <th className="p-2 border ">Action</th>
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
            <td className="p-2 border">
              https://www.facebook.com/nhattrung.dev
            </td>
            <td className="p-2 border">#1fc3ff</td>
            <td className="p-2 border">
              <div className="flex justify-center items-center gap-2">
                <EditButton onClick={() => {}} />
                <DeleteButton />
              </div>
            </td>
          </tr>
          <tr>
            <td className="flex justify-center items-center p-2 border ">
              <SafeImage
                src="/frontend-tech/nextjs-logo.png"
                alt="Next.js"
                width={50}
                height={50}
              />
            </td>
            <td className="p-2 border">Next.js</td>
            <td className="p-2 border">
              https://www.facebook.com/nhattrung.dev
            </td>
            <td className="p-2 border">#1fc3ff</td>
            <td className="p-2 border">
              <div className="flex justify-center items-center gap-2">
                <EditButton onClick={() => {}} />
                <DeleteButton />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
