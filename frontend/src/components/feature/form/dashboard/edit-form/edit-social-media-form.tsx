import { useState } from "react";
import SocialMediaForm from "../add-form/social-media-form";
import { SocialMediaFormInputs } from "@/types/social-media-form";
import EditButton from "@/components/button/edit-button";

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
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (
    data: SocialMediaFormInputs,
    image: File | null
  ) => {
    try {
      if (onUpdate) {
        await onUpdate(socialMediaId, data, image);
      } else {
        // Default behavior
        console.log("Updating social media:", {
          id: socialMediaId,
          data,
          image,
        });

        // TODO: Add API call here
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
        console.log("Social media updated successfully");
      }
    } catch (error) {
      console.error("Error updating social media:", error);
      throw error; // Re-throw to let the parent form handle the error
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <>
      <EditButton onClick={() => setIsOpen(true)} />

      <SocialMediaForm
        mode="edit"
        initialData={initialData}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        open={isOpen}
        onOpenChange={setIsOpen}
      />
    </>
  );
}
