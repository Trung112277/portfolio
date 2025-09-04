"use client";

import { UseFormRegister, FieldErrors, FieldValues, Path } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface TextareaFieldProps<T extends FieldValues> {
  label: string;
  register: UseFormRegister<T>;
  name: Path<T>;
  errors: FieldErrors<T>;
  placeholder?: string;
  validation?: Record<string, unknown>;
  isSubmitting?: boolean;
  rows?: number;
  className?: string;
}

export function TextareaField<T extends FieldValues>({
  label,
  register,
  name,
  errors,
  placeholder,
  validation,
  isSubmitting,
  rows = 4,
  className = "",
}: TextareaFieldProps<T>) {
  return (
    <div className="flex flex-col gap-2">
      <Label
        htmlFor={String(name)}
        className="text-lg text-primary"
      >
        {label}
      </Label>
      <Textarea
        id={String(name)}
        {...register(name, validation)}
        placeholder={placeholder}
        autoComplete="off"
        className={`w-full text-foreground placeholder:text-foreground/60 ${className} ${
          errors[name] ? "border-red-500" : ""
        }`}
        disabled={isSubmitting}
        rows={rows}
      />
      {errors[name] && (
        <p className="text-sm text-red-600">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
}
