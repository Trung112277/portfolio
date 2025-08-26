"use client";

import PrimaryButton from "@/components/button/primary-button";
import { Textarea } from "@/components/ui/textarea";
import { useForm, SubmitHandler } from "react-hook-form";

type IntroductionFormInputs = {
  introduction: string;
};

export default function IntroductionEditForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IntroductionFormInputs>();

  const onSubmit: SubmitHandler<IntroductionFormInputs> = async (
    data: IntroductionFormInputs
  ) => {
    try {
      console.log("Submitting introduction data:", data);
      // TODO: Add API call here
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      console.log("Introduction data submitted successfully");
      reset(); // Reset form after successful submission
    } catch (error) {
      console.error("Error submitting introduction data:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Textarea
          id="introduction"
          {...register("introduction", {
            required: "Introduction is required",
            minLength: {
              value: 20,
              message: "Introduction must be at least 20 characters",
            },
            maxLength: {
              value: 500,
              message: "Introduction must be less than 500 characters",
            },
          })}
          placeholder="Enter introduction"
          autoComplete="off"
          defaultValue="👋 Hey, I'm Nhat Trung, a Frontend Developer.

            I've been working with React and Node for the past one year, building web applications that are fast, scalable and user-friendly.

            I like solving problems, learning new things, and experimenting with different technologies. When I'm not coding, I'm probably working on a side project or exploring something new."
          className={`w-full h-[300px] text-foreground placeholder:text-foreground/60 ${
            errors.introduction ? "border-red-500" : ""
          }`}
          disabled={isSubmitting}
        />
        {errors.introduction && (
          <p className="mt-1 text-sm text-red-600">
            {errors.introduction.message}
          </p>
        )}
      </div>
      <PrimaryButton type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Editing..." : "Edit"}
      </PrimaryButton>
    </form>
  );
}
