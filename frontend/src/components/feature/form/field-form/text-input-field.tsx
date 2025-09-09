"use client";

import {
  UseFormRegister,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TextInputFieldProps<T extends FieldValues> {
  label: string;
  register: UseFormRegister<T>;
  name: Path<T>;
  errors: FieldErrors<T>;
  placeholder?: string;
  secondaryPlaceholder?: string;
  validation?: Record<string, unknown>;
  isSubmitting?: boolean;
  type?: "text" | "email" | "password" | "url" | "tel" | "number";
  variant?: "default" | "year";
}

export function TextInputField<T extends FieldValues>({
  label,
  register,
  name,
  errors,
  placeholder,
  secondaryPlaceholder,
  validation,
  isSubmitting,
  type = "text",
  variant = "default",
}: TextInputFieldProps<T>) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={String(name)} className="text-lg text-primary">
        {label}
      </Label>
      <div className="flex flex-row gap-2">
        <Input
          id={String(name)}
          {...register(name, validation)}
          placeholder={placeholder}
          autoComplete="off"
          className={`w-full ${errors[name] ? "border-red-500" : ""}`}
          name={String(name)}
          type={type}
          disabled={isSubmitting}
        />
        {variant === "year" && (
          <Input
            id={String(name)}
            {...register(name, validation)}
            placeholder={secondaryPlaceholder}
            autoComplete="off"
            className={`w-full ${errors[name] ? "border-red-500" : ""}`}
            name={String(name)}
            type={type}
            disabled={isSubmitting}
          />
        )}
      </div>
      {errors[name] && (
        <p className=" text-sm text-red-600">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
}
