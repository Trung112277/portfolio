"use client";

import { useEffect } from "react";

export function useTitle(title: string) {
  useEffect(() => {
    // Update title immediately when hook is called
    if (typeof document !== "undefined") {
      document.title = title;
    }
  }, [title]);
}
