"use client";

import {
  FieldErrors,
  FieldValues,
  Path,
  Control,
  Controller,
} from "react-hook-form";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  errors: FieldErrors<T>;
  options: SelectOption[];
  control: Control<T>;
  validation?: Record<string, unknown>;
  isSubmitting?: boolean;
  placeholder?: string;
}

export function SelectField<T extends FieldValues>({
  label,
  name,
  errors,
  options,
  control,
  validation,
  isSubmitting,
  placeholder = "Select an option",
}: SelectFieldProps<T>) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={String(name)} className="text-lg text-primary">
        {label}
      </Label>

      <Controller
        control={control}
        name={name}
        rules={validation}
        render={({ field }) => (
          <Select
            disabled={isSubmitting}
            onValueChange={(val) => field.onChange(val)}
            value={(field.value as string | undefined) ?? undefined}
          >
            <SelectTrigger
              id={String(name)}
              className={`w-full ${errors[name] ? "border-red-500" : ""}`}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value} className="font-bold">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />

      {errors[name] && (
        <p className="text-sm text-red-600">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
}