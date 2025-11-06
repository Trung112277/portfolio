"use client";

import { ReactNode } from "react";
import { UseFormReturn } from "react-hook-form";
import PrimaryButton from "@/components/button/primary-button";
import { useFormHandler } from "@/hooks/useFormHandler";
import { FormConfig } from "@/hooks/useFormHandler";
import { LoadingOverlay } from "@/components/feature/loading/loading-overlay";

interface BaseEditFormProps {
  config: FormConfig;
  children: (form: UseFormReturn<Record<string, unknown>>, isSubmitting: boolean, disabled: boolean) => ReactNode;
  submitButtonText?: string;
  loadingButtonText?: string;
  disabled?: boolean;
}

export default function BaseEditForm({
  config,
  children,
  submitButtonText = "Change",
  loadingButtonText = "Changing...",
  disabled = false,
}: BaseEditFormProps) {
  const { form, isSubmitting, handleFormSubmit } = useFormHandler(config);

  return (
    <div className="relative">
      <LoadingOverlay isLoading={isSubmitting} />
      <form onSubmit={handleFormSubmit} className="space-y-4">
        {children(form, isSubmitting, disabled)}
        <PrimaryButton
          type="submit"
          disabled={isSubmitting || disabled}
        >
          {isSubmitting ? loadingButtonText : submitButtonText}
        </PrimaryButton>
      </form>
    </div>
  );
}