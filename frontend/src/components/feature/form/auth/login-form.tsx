"use client";
import { useEffect } from "react";
import { TextInputField } from "@/components/feature/form/field-form/text-input-field";
import { PasswordField } from "@/components/feature/form/field-form/password-field";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormHandler } from "@/hooks/useFormHandler";
import { getFieldValidation } from "@/lib/form-validation";
import { AuthService } from "@/services/auth.service";
import { CheckboxField } from "@/components/feature/form/field-form/checkbox-field";
import { useRouter } from "next/navigation";

interface LoginFormProps {
  onSuccess?: () => void;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const router = useRouter();
  const { form, isSubmitting, handleFormSubmit } = useFormHandler({
    defaultValues: { 
      email: "", 
      password: "", 
      rememberMe: false 
    },
    successMessage: "Logged in successfully",
    errorMessage: "Login failed",
      onSubmit: async (data) => {
        await AuthService.signIn({
          email: data.email as string,
          password: data.password as string,
          rememberMe: data.rememberMe as boolean,
        });
        
        // Dispatch custom event to notify other components
        window.dispatchEvent(new CustomEvent('auth-changed'));
        
        onSuccess?.();
        router.push("/dashboard");
      },
  });

  const {
    register,
    formState: { errors },
    setValue,
  } = form;

  // Tự động điền email và rememberMe nếu user đã chọn remember me trước đó
  useEffect(() => {
    const savedEmail = localStorage.getItem('userEmail');
    const rememberMe = localStorage.getItem('rememberMe') === 'true';
    
    if (savedEmail) {
      setValue('email', savedEmail);
    }
    if (rememberMe) {
      setValue('rememberMe', true);
    }
  }, [setValue]);

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
      <CheckboxField
        label="Remember me"
        name="rememberMe"
        errors={errors}
        register={register}
        validation={getFieldValidation("rememberMe")}
      />
      <Button type="submit" disabled={isSubmitting}>
        Login {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
      </Button>
    </form>
  );
}
