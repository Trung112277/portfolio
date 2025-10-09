"use client";

import { Input } from "@/components/ui/input";
import BaseEditForm from "@/components/feature/form/dashboard/edit-form/base-edit-form";
import { validationRules } from "@/lib/form-validation";
import { FormConfig, UseFormHandlerReturn } from "@/hooks/useFormHandler";
import { AuthorNameService } from "@/services/author-name.service";
import React, { useEffect, useState, useRef } from "react";

export default function EditAuthorForm() {
  const [currentAuthorName, setCurrentAuthorName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const formRef = useRef<UseFormHandlerReturn['form'] | null>(null);

  // Load current author name on component mount
  useEffect(() => {
    let isMounted = true;
    
    const loadAuthorName = async () => {
      try {
        const authorData = await AuthorNameService.get();
        if (isMounted) {
          if (authorData) {
            setCurrentAuthorName(authorData.name);
          } else {
            // No author name exists yet, set empty string
            setCurrentAuthorName("");
          }
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error loading author name:", error);
        if (isMounted) {
          setCurrentAuthorName("");
          setIsLoading(false);
        }
      }
    };

    loadAuthorName();
    
    return () => {
      isMounted = false;
    };
  }, []);

  // Reset form when data is loaded
  useEffect(() => {
    if (!isLoading && formRef.current) {
      formRef.current.reset({ name: currentAuthorName });
    }
  }, [currentAuthorName, isLoading]);

  const config: FormConfig = {
    defaultValues: {
      name: currentAuthorName,
    },
    successMessage: "Author name updated successfully",
    onSubmit: async (data) => {
      try {
        const name = data.name as string;
        await AuthorNameService.update({ name });
        setCurrentAuthorName(name);
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
              placeholder={isLoading ? "Loading..." : "Enter author name"}
              autoComplete="off"
              className={`w-full ${form.formState.errors.name ? "border-red-500" : ""}`}
              name="name"
              type="text"
              disabled={isSubmitting || isLoading}
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