"use client";

import { Textarea } from "@/components/ui/textarea";
import BaseEditForm from "@/components/feature/form/dashboard/edit-form/base-edit-form";
import { validationRules } from "@/lib/form-validation";
import { FormConfig } from "@/hooks/useFormHandler";
import { useAuthorStore } from "@/stores/author-store";
import { useEffect } from "react";

export default function EditIntroductionForm() {
  const { authorName, loadAuthorName } = useAuthorStore();

  useEffect(() => {
    loadAuthorName();
  }, [loadAuthorName]);

  const config: FormConfig = {
    defaultValues: {
      introduction: `👋 Hey, I'm ${authorName}, a Frontend Developer.

I've been working with React and Node for the past one year, building web applications that are fast, scalable and user-friendly.

I like solving problems, learning new things, and experimenting with different technologies. When I'm not coding, I'm probably working on a side project or exploring something new.`,
    },
    successMessage: "Introduction changed successfully",
    onSubmit: async (data) => {
      console.log("Submitting introduction data:", data);
      // TODO: Add API call here
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Introduction data submitted successfully");
    },
  };

  return (
    <BaseEditForm config={config}>
      {(form, isSubmitting) => (
        <div>
          <Textarea
            id="introduction"
            {...form.register("introduction", validationRules.introduction)}
            placeholder="Enter introduction"
            autoComplete="off"
            className={`w-full h-[300px] text-foreground placeholder:text-foreground/60 ${
              form.formState.errors.introduction ? "border-red-500" : ""
            }`}
            disabled={isSubmitting}
          />
          {form.formState.errors.introduction && (
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.introduction.message}
            </p>
          )}
        </div>
      )}
    </BaseEditForm>
  );
}