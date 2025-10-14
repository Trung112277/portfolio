import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface YearFieldProps<T extends FieldValues> {
  label: string;
  register: UseFormRegister<T>;
  startYearName: Path<T>;
  endYearName: Path<T>;
  errors: FieldErrors<T>;
  placeholder: string;
  secondaryPlaceholder: string;
  startYearValidation: Record<string, unknown>;
  endYearValidation: Record<string, unknown>;
  isSubmitting: boolean;
  type?: "text" | "email" | "password" | "url" | "tel" | "number";
}

export default function YearField<T extends FieldValues>({
  label,
  register,
  startYearName,
  endYearName,
  errors,
  placeholder,
  secondaryPlaceholder,
  startYearValidation,
  endYearValidation,
  isSubmitting,
  type = "text",
}: YearFieldProps<T>) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={String(startYearName)} className="text-lg text-primary">
        {label}
      </Label>
      <div className="flex flex-row gap-2">
        <div className="flex flex-col gap-1 w-full">
          <Input
            id={String(startYearName)}
            {...register(startYearName, startYearValidation)}
            placeholder={placeholder}
            autoComplete="off"
            className={`w-full ${errors[startYearName] ? "border-red-500" : ""}`}
            name={String(startYearName)}
            type={type}
            disabled={isSubmitting}
          />
          {errors[startYearName] && (
            <p className="text-xs text-red-600">
              {errors[startYearName]?.message as string}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1 w-full">
          <Input
            id={String(endYearName)}
            {...register(endYearName, endYearValidation)}
            placeholder={secondaryPlaceholder}
            autoComplete="off"
            className={`w-full ${errors[endYearName] ? "border-red-500" : ""}`}
            name={String(endYearName)}
            type={type}
            disabled={isSubmitting}
          />
          {errors[endYearName] && (
            <p className="text-xs text-red-600">
              {errors[endYearName]?.message as string}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
