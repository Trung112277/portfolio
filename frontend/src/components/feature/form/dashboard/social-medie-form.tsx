"use client";

import AddSocialMediaButton from "@/components/button/add-social-media-button";
import PrimaryButton from "@/components/button/primary-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SafeImage } from "@/components/ui/safe-image";
import IconButton from "@/components/button/icon-button";
import { XIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

type SocialMediaFormInputs = {
  image: FileList;
  description: string;
  link: string;
  color: string;
};

export default function SocialMediaForm() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState("--primary");
  const [colorText, setColorText] = useState("--primary");
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
    resetField,
    trigger,
  } = useForm<SocialMediaFormInputs>({
    mode: "onSubmit",
  });

  const watchedColor = watch("color");



  // Sync colorText with form value
  useEffect(() => {
    if (watchedColor && watchedColor !== colorText) {
      setColorText(watchedColor);
      setSelectedColor(watchedColor);
    }
  }, [watchedColor, colorText]);

  useEffect(() => {
    const getPrimaryColor = () => {
      const primaryColor = getComputedStyle(document.documentElement)
        .getPropertyValue("--primary")
        .trim();

      if (primaryColor) {
        setSelectedColor(primaryColor);
        setColorText(primaryColor);
        setValue("color", primaryColor);
      }
    };

    getPrimaryColor();

    const observer = new MutationObserver(getPrimaryColor);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style", "class"],
    });

    return () => observer.disconnect();
  }, [setValue]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      
      // Trigger validation for image field after state update
      setTimeout(() => {
        trigger("image");
      }, 100);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    resetField("image");
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
    
    // Trigger validation for image field after removing image
    setTimeout(() => {
      trigger("image");
    }, 100);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setSelectedColor(color);
    setColorText(color);
    setValue("color", color);
  };

  const handleColorTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColorText = e.target.value;
    setColorText(newColorText);

    if (/^#[0-9A-F]{6}$/i.test(newColorText)) {
      setSelectedColor(newColorText);
      setValue("color", newColorText);
    }

    return newColorText; // Return value for register
  };

  const onSubmit: SubmitHandler<SocialMediaFormInputs> = async (data) => {
    try {
      // Trigger validation for all fields including image
      const isValid = await trigger();
      
      if (!isValid) {
        return;
      }

      console.log("Form submitted, data:", data);
      console.log("Selected image:", selectedImage);

      console.log("Submitting social media data:", data);
      console.log("Selected image:", selectedImage);

      // TODO: Add API call here
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      console.log("Social media data submitted successfully");

      // Reset form and states
      reset();
      setSelectedImage(null);
      setImagePreview(null);

      // Reset color to primary from CSS variable
      const primaryColor = getComputedStyle(document.documentElement)
        .getPropertyValue("--primary")
        .trim();

      if (primaryColor) {
        setSelectedColor(primaryColor);
        setColorText(primaryColor);
        setValue("color", primaryColor);
      } else {
        setSelectedColor("--primary");
        setColorText("--primary");
        setValue("color", "--primary");
      }

      // Close dialog
      setIsOpen(false);

      toast.success("Social media added successfully");
    } catch (error) {
      console.error("Error submitting social media data:", error);
      toast.error("Failed to add social media");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <AddSocialMediaButton />
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>Add Social Media</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-2">
            <Label className="text-lg text-primary">Image</Label>

            {selectedImage && imagePreview && (
              <div className="flex justify-center items-center relative w-fit mx-auto">
                <IconButton
                  onClick={handleRemoveImage}
                  className="absolute top-0 right-0 rounded-full border-none bg-transparent hover:bg-transparent w-fit h-fit hover:text-primary z-10"
                >
                  <XIcon className="w-4 h-4" />
                </IconButton>
                <SafeImage
                  className="border-2 rounded-md p-2 w-[300px] h-[300px] object-cover"
                  src={imagePreview}
                  alt="Selected image"
                  width={100}
                  height={100}
                />
              </div>
            )}

            <div className="relative">
              <Input
                type="file"
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0"
                {...register("image", {
                  onChange: handleImageChange,
                  validate: (value) => {
                    if (!selectedImage) {
                      return "Please select an image";
                    }
                    return true;
                  },
                })}
              />
              <div className="flex items-center justify-start w-full h-9 px-3 py-1 text-base border border-input rounded-md bg-transparent text-muted-foreground">
                <span>
                  {selectedImage ? selectedImage.name : "Select image"}
                </span>
              </div>
            </div>
              {errors.image && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.image.message}
                </p>
              )}
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-lg text-primary">Description</Label>
            <Input
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 3,
                  message: "Description must be at least 3 characters",
                },
              })}
              placeholder="Enter description"
              className={`w-full ${errors.description ? "border-red-500" : ""}`}
              disabled={isSubmitting}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-lg text-primary">Link</Label>
            <Input
              {...register("link", {
                required: "Link is required",
                pattern: {
                  value: /^https?:\/\/.+/,
                  message:
                    "Please enter a valid URL starting with http:// or https://",
                },
              })}
              placeholder="Enter URL"
              className={`w-full ${errors.link ? "border-red-500" : ""}`}
              disabled={isSubmitting}
            />
            {errors.link && (
              <p className="mt-1 text-sm text-red-600">{errors.link.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-lg text-primary">Color</Label>
            <div className="flex items-center gap-2">
              <Input
                type="color"
                value={selectedColor}
                onChange={handleColorChange}
                className="w-16 h-9 p-1"
                disabled={isSubmitting}
              />
              <Input
                {...register("color", {
                  required: "Color is required",
                  pattern: {
                    value: /^#[0-9A-F]{6}$/i,
                    message: "Please enter a valid hex color code",
                  },
                  onChange: handleColorTextChange,
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

          <PrimaryButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add Social Media"}
          </PrimaryButton>
        </form>
      </DialogContent>
    </Dialog>
  );
}
