"use client";
import { PasswordField } from "@/components/feature/form/field-form/password-field";
import { TextInputField } from "@/components/feature/form/field-form/text-input-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useFormHandler } from "@/hooks/useFormHandler";
import { useRouter } from "next/navigation";
import { getFieldValidation } from "@/lib/form-validation";

export default function LoginForm() {
  const router = useRouter();
  
  const { form, isSubmitting, handleFormSubmit } = useFormHandler({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    successMessage: "Login successfully",
    errorMessage: "An error occurred while login",
    onSubmit: async (data) => {
      console.log("Login, data:", data);
      // TODO: Replace with actual API call
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Login successfully");
      
      // Redirect to dashboard after successful login
      router.push("/dashboard");
    },
  });

  const {
    register,
    formState: { errors },
  } = form;

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
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
        <div className="flex flex-row gap-2 items-center">
          <Input
            type="checkbox"
            {...register("rememberMe")}
            id="rememberMe"
            disabled={isSubmitting}
            className="w-4 h-4"
          />
          <Label htmlFor="rememberMe" className="text-sm text-primary">
            Remember me
          </Label>
        </div>
      <Button type="submit" disabled={isSubmitting}>
        Login {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
      </Button>
    </form>
  );
}
