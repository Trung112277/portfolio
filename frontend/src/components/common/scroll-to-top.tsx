"use client";

import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <Button
          onClick={scrollToTop}
          className={cn(
            "fixed bottom-6 right-6 z-50",
            "flex h-12 w-12 items-center justify-center",
            "rounded-full bg-gradient-to-r from-primary to-purple-500",
            "text-white shadow-lg transition-all duration-300",
            "hover:scale-110 hover:shadow-xl",
            "focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-0",
            "transform opacity-0 scale-95",
            isVisible && "opacity-100 scale-100"
          )}
          aria-label="Scroll to top"
        >
          <ChevronUp
            style={{
              width: "24px",
              height: "24px",
            }}
          />
        </Button>
      )}
    </>
  );
}
