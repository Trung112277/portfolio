"use client";

import DeleteButton from "@/components/button/delete-button";
import { SafeImage } from "@/components/ui/safe-image";
import EditSocialMediaForm from "@/components/feature/form/dashboard/edit-form/edit-social-media-form";
import { useSocialMedia } from "@/hooks/useSocialMedia";
import { useUserRole } from "@/hooks/useUserRole";
import { checkAdminPermission, PermissionActions } from "@/lib/permission-utils";
import { toast } from "sonner";

export default function SocialMediaEdit() {
  const { socialMedia, loading, error, deleteSocialMedia } = useSocialMedia();
  const { isAdmin } = useUserRole();

  const handleDelete = async (id: number) => {
    // Check admin permission before deleting
    const permission = checkAdminPermission(isAdmin, PermissionActions.DELETE);
    if (!permission.hasPermission) {
      return; // Toast is already shown by checkAdminPermission
    }

    try {
      await deleteSocialMedia(id);
      toast.success("Social media deleted successfully");
    } catch (error) {
      console.error("Error deleting social media:", error);
      toast.error("Error deleting social media");
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="flex items-center justify-center gap-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          <div className="text-center p-4">Loading social media...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 text-red-500">
        Error loading social media: {error}
      </div>
    );
  }

  if (socialMedia.length === 0) {
    return (
      <div className="text-center p-8 text-gray-500">
        No social media found. Add some social media links to get started.
      </div>
    );
  }

  return (
    <div className="table-scroll overflow-x-auto">
      <table className="text-center w-full min-w-[800px]">
        <thead>
          <tr className=" text-xl font-bold border-b text-primary text-center">
            <th className="p-2 border w-[100px]">Image</th>
            <th className="p-2 border w-[150px]">Description</th>
            <th className="p-2 border w-[300px]">Link</th>
            <th className="p-2 border w-[100px]">Color</th>
            <th className="p-2 border w-[150px]">Action</th>
          </tr>
        </thead>
        <tbody>
          {socialMedia.map((social) => (
            <tr key={social.id}>
              <td className="flex justify-center items-center p-2 border ">
                <SafeImage
                  src={social.image_url}
                  alt={social.description}
                  width={50}
                  height={50}
                  className="object-contain rounded-md"
                />
              </td>
              <td className="p-2 border">{social.description}</td>
              <td className="p-2 border max-w-[200px] truncate">
                <a
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {social.link}
                </a>
              </td>
              <td className="p-2 border">
                <div className="flex items-center justify-center gap-2">
                  <div
                    className="w-6 h-6 rounded border"
                    style={{ backgroundColor: social.color }}
                    title={social.color}
                  ></div>
                  <span className="text-xs">{social.color}</span>
                </div>
              </td>
              <td className="p-2 border">
                <div className="flex justify-center items-center gap-2">
                  <EditSocialMediaForm
                    socialMediaId={social.id.toString()}
                    initialData={{
                      description: social.description,
                      link: social.link,
                      color: social.color,
                    }}
                    existingImageUrl={social.image_url}
                    disabled={!isAdmin}
                  />
                  <DeleteButton
                    title={social.description}
                    onDelete={() => handleDelete(social.id)}
                    disabled={!isAdmin}
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
