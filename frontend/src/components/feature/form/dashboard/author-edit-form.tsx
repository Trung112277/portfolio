"use client";

import PrimaryButton from "@/components/button/primary-button";
import { Input } from "@/components/ui/input";
import { useForm, SubmitHandler } from "react-hook-form";

type AuthorFormInputs = {
  name: string;
};

export default function AuthorEditForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AuthorFormInputs>();

  const onSubmit: SubmitHandler<AuthorFormInputs> = async (
    data: AuthorFormInputs
  ) => {
    try {
      console.log("Submitting author data:", data);
      // TODO: Add API call here
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      console.log("Author data submitted successfully");
      reset(); // Reset form after successful submission
    } catch (error) {
      console.error("Error submitting author data:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-blue-500 mb-2"
        >
          Author Name
        </label>
        <Input
          id="name"
          {...register("name", {
            required: "Author name is required",
            minLength: {
              value: 2,
              message: "Name must be at least 2 characters",
            },
          })}
          placeholder="Enter author name"
          autoComplete="off"
          defaultValue="Nhat Trung"
          className={`w-full ${errors.name ? "border-red-500" : ""}`}
          name="name"
          type="text"
          disabled={isSubmitting}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>
      <PrimaryButton type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Changing..." : "Change"}
      </PrimaryButton>
      <p className="text-sm text-green-500 hidden">
        Author name changed successfully
      </p>
    </form>
  );
}
