import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SocialMediaFormInputs } from "@/types/social-media-form";
import { ValidationSchema } from "@/lib/form-validation";

interface ColorPickerFieldProps {
  register: UseFormRegister<SocialMediaFormInputs>;
  errors: FieldErrors<SocialMediaFormInputs>;
  selectedColor: string;
  colorText: string;
  onColorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onColorTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSubmitting: boolean;
  validation: ValidationSchema;
}

export function ColorPickerField({
  register,
  errors,
  selectedColor,
  onColorChange,
  onColorTextChange,
  isSubmitting,
  validation,
}: ColorPickerFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label className="text-lg text-primary">Color</Label>
      <div className="flex items-center gap-2">
        <Input
          type="color"
          value={selectedColor}
          onChange={onColorChange}
          className="w-16 h-9 p-1"
          disabled={isSubmitting}
        />
        <Input
          {...register("color", {
            ...validation,
            onChange: onColorTextChange,
          })}
          placeholder="Enter color code"
          className={`flex-1 ${errors.color ? "border-red-500" : ""}`}
          disabled={isSubmitting}
        />
      </div>
      {errors.color && (
        <p className="mt-1 text-sm text-red-600">
          {errors.color.message}
        </p>
      )}
    </div>
  );
}
