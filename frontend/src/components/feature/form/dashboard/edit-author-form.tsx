"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import BaseEditForm from "./base-edit-form";
import { validationRules } from "@/lib/form-validation";
import { FormConfig } from "@/hooks/useFormHandler";

export default function EditAuthorForm() {
  const config: FormConfig = {
    defaultValues: {
      name: "Nhat Trung",
    },
    successMessage: "Author name changed successfully",
    onSubmit: async (data) => {
      console.log("Submitting author data:", data);
      // TODO: Add API call here
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      console.log("Author data submitted successfully");
    },
  };

  return (
    <BaseEditForm config={config}>
      {(form, isSubmitting) => (
        <div>
          <Label
            htmlFor="name"
            className="block text-sm font-medium text-blue-500 mb-2"
          >
            Author Name
          </Label>
          <Input
            id="name"
            {...form.register("name", validationRules.authorName)}
            placeholder="Enter author name"
            autoComplete="off"
            className={`w-full ${form.formState.errors.name ? "border-red-500" : ""}`}
            name="name"
            type="text"
            disabled={isSubmitting}
          />
          {form.formState.errors.name && (
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.name.message}
            </p>
          )}
        </div>
      )}
    </BaseEditForm>
  );
}