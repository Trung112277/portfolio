import { SocialMediaFormInputs } from "@/types/social-media-form";
import { useState, useEffect } from "react";
import { UseFormWatch, UseFormSetValue } from "react-hook-form";

export function useColorSync(
  watch: UseFormWatch<SocialMediaFormInputs>,
  setValue: UseFormSetValue<SocialMediaFormInputs>
) {
  const [selectedColor, setSelectedColor] = useState("--primary");
  const [colorText, setColorText] = useState("--primary");

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

  return {
    selectedColor,
    colorText,
    handleColorChange,
    handleColorTextChange,
  };
}
