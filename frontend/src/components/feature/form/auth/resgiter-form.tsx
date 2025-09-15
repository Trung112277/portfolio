"use client";
import { PasswordField } from "@/components/feature/form/field-form/password-field";
import { TextInputField } from "@/components/feature/form/field-form/text-input-field";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormHandler } from "@/hooks/useFormHandler";
import type { RegisterForm } from "@/types/resgiter-form";
import { getFieldValidation } from "@/lib/form-validation";

interface RegisterFormProps {
  onSuccess?: () => void;
}

export default function RegisterForm({ onSuccess }: RegisterFormProps) {
  
  const { form, isSubmitting, handleFormSubmit } = useFormHandler({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    successMessage: "Registration successful! Please login.",
    errorMessage: "An error occurred while registering",
    onSubmit: async (data) => {
      console.log("Register, data:", data);
      
      // TODO: Replace with actual API call
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Registration successful");
      
      // Switch to login tab after successful registration
      onSuccess?.();
    },
  });

  const {
    register,
    formState: { errors },
  } = form;

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
      <TextInputField
        label="Full Name"
        name="name"
        errors={errors}
        register={register}
        placeholder="Enter your full name"
        validation={getFieldValidation("name")}
      />
      <TextInputField
        label="Email"
        name="email"
        errors={errors}
        register={register}
        placeholder="Enter your email"
        validation={getFieldValidation("email")}
      />
      <PasswordField
        label="Password"
        name="password"
        errors={errors}
        register={register}
        placeholder="Enter your password"
        validation={getFieldValidation("password")}
      />
      <PasswordField
        label="Confirm Password"
        name="confirmPassword"
        errors={errors}
        register={register}
        placeholder="Confirm your password"
        validation={{
          required: "Confirm password is required",
          validate: (value: string) => {
            const password = form.getValues("password");
            return value === password || "Passwords do not match";
          }
        }}
      />
      <Button type="submit" disabled={isSubmitting}>
        Register {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
      </Button>
    </form>
  );
}
