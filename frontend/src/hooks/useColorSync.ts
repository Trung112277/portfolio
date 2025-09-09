import { useState, useEffect } from "react";
import { UseFormWatch, UseFormSetValue, FieldValues, Path, PathValue } from "react-hook-form";

export function useColorSync<T extends FieldValues>(
  watch: UseFormWatch<T>,
  setValue: UseFormSetValue<T>
) {
  const [selectedColor, setSelectedColor] = useState("--primary");
  const [colorText, setColorText] = useState("--primary");

  const watchedColor = watch("color" as Path<T>);

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
        setValue("color" as Path<T>, primaryColor as PathValue<T, Path<T>>);
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
    setValue("color" as Path<T>, color as PathValue<T, Path<T>>);
  };

  const handleColorTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColorText = e.target.value;
    setColorText(newColorText);

    if (/^#[0-9A-F]{6}$/i.test(newColorText)) {
      setSelectedColor(newColorText);
      setValue("color" as Path<T>, newColorText as PathValue<T, Path<T>>);
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
