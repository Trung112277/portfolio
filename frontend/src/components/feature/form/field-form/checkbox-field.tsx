import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

export function CheckboxField<T extends FieldValues>({
  label,
  register,
  name,
  errors,
  validation,
}: CheckboxFieldProps<T>) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={String(name)} className="text-lg text-primary flex items-center gap-2">
        <Checkbox id={String(name)} {...register(name, validation)} />
        {label}
      </Label>
      {errors[name] && (
        <p className=" text-sm text-red-600">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
}

interface CheckboxFieldProps<T extends FieldValues> {
  label: string;
  register: UseFormRegister<T>;
  name: Path<T>;
  errors: FieldErrors<T>;
  validation: Record<string, unknown>;
}
