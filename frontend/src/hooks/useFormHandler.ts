import { useForm, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

export interface FormConfig {
  defaultValues: Record<string, unknown>;
  successMessage: string;
  rememberMe?: boolean;
  errorMessage?: string;
  onSubmit: (data: Record<string, unknown>) => Promise<void>;
}

export interface UseFormHandlerReturn {
  form: UseFormReturn<Record<string, unknown>>;
  isSubmitting: boolean;
  handleFormSubmit: (e: React.FormEvent) => void;
}

export function useFormHandler(
  config: FormConfig
): UseFormHandlerReturn {
  const form = useForm({
    defaultValues: config.defaultValues,
  });

  const { formState: { isSubmitting }, reset } = form;

  const handleFormSubmit = async (data: Record<string, unknown>) => {
    try {
      await config.onSubmit(data);
      toast.success(config.successMessage);
      reset();
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error(config.errorMessage || "An error occurred");
    }
  };

  return {
    form,
    isSubmitting,
    handleFormSubmit: form.handleSubmit(handleFormSubmit),
  };
}