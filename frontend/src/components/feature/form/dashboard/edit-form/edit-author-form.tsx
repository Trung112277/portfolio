"use client";

import { Input } from "@/components/ui/input";
import BaseEditForm from "@/components/feature/form/dashboard/edit-form/base-edit-form";
import { validationRules } from "@/lib/form-validation";
import { FormConfig, UseFormHandlerReturn } from "@/hooks/useFormHandler";
import { useAuthorName } from "@/hooks/useAuthorName";
import React, { useEffect, useRef } from "react";

export default function EditAuthorForm() {
  const { authorName, loading, updateAuthorName } = useAuthorName();
  const formRef = useRef<UseFormHandlerReturn['form'] | null>(null);

  // Reset form when data is loaded
  useEffect(() => {
    if (!loading && formRef.current) {
      formRef.current.reset({ name: authorName });
    }
  }, [authorName, loading]);

  const config: FormConfig = {
    defaultValues: {
      name: authorName,
    },
    successMessage: "Author name updated successfully",
    onSubmit: async (data) => {
      try {
        const name = data.name as string;
        await updateAuthorName({ name });
        console.log("Author name updated successfully");
      } catch (error) {
        console.error("Error updating author name:", error);
        throw new Error("Failed to update author name");
      }
    },
  };

  return (
    <BaseEditForm config={config}>
      {(form, isSubmitting) => {
        // Store form instance for reset using ref
        formRef.current = form;

        return (
          <div>
            <Input
              id="name"
              {...form.register("name", validationRules.authorName)}
              placeholder={loading ? "Loading..." : "Enter author name"}
              autoComplete="off"
              className={`w-full ${form.formState.errors.name ? "border-red-500" : ""}`}
              name="name"
              type="text"
              disabled={isSubmitting || loading}
            />
            {form.formState.errors.name && (
              <p className="mt-1 text-sm text-red-600">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>
        );
      }}
    </BaseEditForm>
  );
}