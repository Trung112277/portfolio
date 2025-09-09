import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { TextInputField } from "@/components/feature/form/field-form/text-input-field";

interface YearFieldProps<T extends FieldValues> {
  label: string;
  register: UseFormRegister<T>;
  name: Path<T>;
  errors: FieldErrors<T>;
  placeholder: string;
  secondaryPlaceholder: string;
  validation: Record<string, unknown>;
  isSubmitting: boolean;
}

export default function YearField<T extends FieldValues>({
  label,
  register,
  name,
  errors,
  placeholder,
  secondaryPlaceholder,
  validation,
  isSubmitting,
}: YearFieldProps<T>) {
  return (
    <TextInputField
      variant="year"
      label={label}
      register={register}
      name={name}
      errors={errors}
      placeholder={placeholder}
      secondaryPlaceholder={secondaryPlaceholder}
      validation={validation}
      isSubmitting={isSubmitting}
    />
  );
}
