"use client";

import {
  UseFormRegister,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon } from "lucide-react";
import { useState } from "react";

interface PasswordFieldProps<T extends FieldValues> {
  label: string;
  register: UseFormRegister<T>;
  name: Path<T>;
  errors: FieldErrors<T>;
  placeholder?: string;
  validation?: Record<string, unknown>;
  isSubmitting?: boolean;
  type?: "text" | "email" | "password" | "url" | "tel" | "number";
}

export function PasswordField<T extends FieldValues>({
  label,
  register,
  name,
  errors,
  placeholder,
  validation,
  isSubmitting,
}: PasswordFieldProps<T>) {
  const [type, setType] = useState<"password" | "text">("password");
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={String(name)} className="text-lg text-primary">
        {label}
      </Label>
      <div className="flex flex-row gap-2 items-center justify-between w-full relative ">
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
        <EyeIcon
          className="w-4 h-4 text-primary absolute right-2 top-1/2 -translate-y-1/2"
          onClick={() => setType(type === "password" ? "text" : "password")}
        />
      </div>
      {errors[name] && (
        <p className=" text-sm text-red-600">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
}
