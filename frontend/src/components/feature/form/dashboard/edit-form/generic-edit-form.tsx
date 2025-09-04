import { useState, ReactNode } from "react";
import EditButton from "@/components/button/edit-button";

interface GenericEditFormProps<T> {
  itemId: string;
  initialData: Partial<T>;
  onUpdate?: (id: string, data: T, ...args: unknown[]) => Promise<void>;
  formComponent: React.ComponentType<{
    mode: "edit";
    initialData: Partial<T>;
    onSubmit: (data: T, ...args: unknown[]) => Promise<void>;
    onCancel: () => void;
    open: boolean;
    onOpenChange: (open: boolean) => void;
  }>;
  itemType: string; // For logging purposes
}

export default function GenericEditForm<T>({
  itemId,
  initialData,
  onUpdate,
  formComponent: FormComponent,
  itemType,
}: GenericEditFormProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (data: T, ...args: unknown[]) => {
    try {
      if (onUpdate) {
        await onUpdate(itemId, data, ...args);
      } else {
        // Default behavior
        console.log(`Form submitted, data:`, data);

        // TODO: Add API call here
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
        console.log(`${itemType} updated successfully`);
      }
      
      // Close dialog after successful update
      setIsOpen(false);
    } catch (error) {
      console.error(`Error updating ${itemType}:`, error);
      throw error; // Re-throw to let the parent form handle the error
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <>
      <EditButton onClick={() => setIsOpen(true)} />

      <FormComponent
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
