import SocialMediaForm from "../add-form/social-media-form";
import { SocialMediaFormInputs } from "@/types/social-media-form";
import GenericEditForm from "./generic-edit-form";

interface EditSocialMediaFormProps {
  socialMediaId: string;
  initialData: Partial<SocialMediaFormInputs>;
  onUpdate?: (
    id: string,
    data: SocialMediaFormInputs,
    image: File | null
  ) => Promise<void>;
}

export default function EditSocialMediaForm({
  socialMediaId,
  initialData,
  onUpdate,
}: EditSocialMediaFormProps) {
  // Create a wrapper function to handle the image parameter
  const handleUpdate = async (id: string, data: SocialMediaFormInputs, image?: File | null) => {
    if (onUpdate) {
      await onUpdate(id, data, image || null);
    }
  };

  return (
    <GenericEditForm
      itemId={socialMediaId}
      initialData={initialData}
      onUpdate={handleUpdate}
      formComponent={SocialMediaForm}
      itemType="social media"
    />
  );
}
