import SocialMediaForm from "@/components/feature/form/dashboard/add-form/social-media-form";
import { SocialMediaFormInputs } from "@/types/social-media-form";
import GenericEditForm from "@/components/feature/form/dashboard/edit-form/generic-edit-form";

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
  const handleUpdate = async (id: string, data: SocialMediaFormInputs, ...args: unknown[]) => {
    // Extract image from args (first argument after data)
    const image = args[0] as File | null | undefined;
    
    if (onUpdate) {
      await onUpdate(id, data, image || null);
    } else {
      // Default behavior for testing
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
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
