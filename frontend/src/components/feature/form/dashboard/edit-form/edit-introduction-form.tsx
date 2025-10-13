"use client";

import { Textarea } from "@/components/ui/textarea";
import BaseEditForm from "@/components/feature/form/dashboard/edit-form/base-edit-form";
import { validationRules } from "@/lib/form-validation";
import { FormConfig } from "@/hooks/useFormHandler";
import { useIntroductionStore } from "@/stores/introduction-store";
import { useEffect, useRef, useState, useCallback } from "react";
import { UseFormReturn } from "react-hook-form";

export default function EditIntroductionForm() {
  const { introduction, loadIntroduction, updateIntroduction, isLoading, isInitialized, isCurrentlyLoading } =
    useIntroductionStore();
  const formRef = useRef<UseFormReturn<Record<string, unknown>> | null>(null);
  const [isComponentLoading, setIsComponentLoading] = useState(true);

  // Memoize loadIntroduction to prevent unnecessary re-renders
  const loadIntroductionMemo = useCallback(() => {
    loadIntroduction();
  }, [loadIntroduction]);

  useEffect(() => {
    // Only load introduction data on component mount
    loadIntroductionMemo();
    
    // Set component loading to false after a brief delay to show loading state
    const timer = setTimeout(() => {
      setIsComponentLoading(false);
    }, 1000); // Show loading for 1 second minimum
    
    return () => clearTimeout(timer);
  }, [loadIntroductionMemo]); // Only depend on memoized function

  // Reset form only when introduction data is first loaded (not on every change)
  useEffect(() => {
    if (formRef.current && introduction && !isComponentLoading) {
      formRef.current.reset({
        introduction: introduction,
      });
    }
  }, [introduction, isComponentLoading]);

  const config: FormConfig = {
    defaultValues: {},
    successMessage: "Introduction changed successfully",
    onSubmit: async (data) => {
      try {
        await updateIntroduction(data.introduction as string);
      } catch (error) {
        console.error("Error updating introduction:", error);
        throw error; // Re-throw to let BaseEditForm handle the error
      }
    },
  };

  // Show loading state while data is being fetched
  if (isComponentLoading || isLoading || isCurrentlyLoading || (!isInitialized && !introduction)) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="flex items-center justify-center gap-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          <div className="text-lg">Loading introduction...</div>
        </div>
      </div>
    );
  }

  return (
    <BaseEditForm config={config}>
      {(form, isSubmitting) => {
        // Store form reference for reset functionality
        formRef.current = form;

        return (
          <div>
            <Textarea
              id="introduction"
              {...form.register("introduction", validationRules.introduction)}
              placeholder="Enter introduction"
              autoComplete="off"
              defaultValue={introduction}
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
        );
      }}
    </BaseEditForm>
  );
}
