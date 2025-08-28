import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SocialMediaFormInputs } from "@/types/social-media-form";
import { ValidationSchema } from "@/lib/form-validation";

interface TextInputFieldProps {
  label: string;
  register: UseFormRegister<SocialMediaFormInputs>;
  name: keyof SocialMediaFormInputs;
  errors: FieldErrors<SocialMediaFormInputs>;
  placeholder: string;
  validation: ValidationSchema;
  isSubmitting: boolean;
}

export function TextInputField({
  label,
  register,
  name,
  errors,
  placeholder,
  validation,
  isSubmitting,
}: TextInputFieldProps) {
  const fieldError = errors[name];

  return (
    <div className="flex flex-col gap-2">
      <Label className="text-lg text-primary">{label}</Label>
      <Input
        {...register(name, validation)}
        placeholder={placeholder}
        className={`w-full ${fieldError ? "border-red-500" : ""}`}
        disabled={isSubmitting}
      />
      {fieldError && (
        <p className="mt-1 text-sm text-red-600">
          {fieldError.message}
        </p>
      )}
    </div>
  );
}
