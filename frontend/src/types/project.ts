import type { ResponsivePosition } from "@/lib/position-utils";

export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  link: string;
  color?: string;
  category: string; // Thêm category field
  isActive: boolean;
  position: ResponsivePosition;
}

export interface ProjectPosition {
  id: string;
  position: ResponsivePosition;
  isActive: boolean;
}

// 8 vị trí cố định cho projects - phân bố đều trên 4 góc và 4 cạnh
export const PROJECT_POSITIONS: ProjectPosition[] = [
  // Top-left corner
  {
    id: "pos-1",
    position: {
      base: { top: "1/4", left: "0" },
      sm: { top: "1/6", left: "1/6" },
    },
    isActive: true,
  },
  // Top-right corner
  {
    id: "pos-2",
    position: {
      base: { top: "1/4", right: "0" },
      sm: { top: "1/6", right: "1/6" },
    },
    isActive: true,
  },
  // Bottom-left corner
  {
    id: "pos-3",
    position: {
      base: { bottom: "1/3", left: "0" },
      sm: { bottom: "1/6", left: "1/6" },
    },
    isActive: true,
  },
  // Bottom-right corner
  {
    id: "pos-4",
    position: {
      base: { bottom: "1/3", right: "0" },
      sm: { bottom: "1/6", right: "1/6" },
    },
    isActive: true,
  },
  // Top-center
  {
    id: "pos-5",
    position: {
      base: { top: "1/3", left: "0" },
      sm: { top: "1/4", left: "50%", transform: "translateX(-50%)" },
    },
    isActive: true,
  },
  // Left-center
  {
    id: "pos-6",
    position: {
      base: { bottom: "1/4", left: "0" },
      sm: { bottom: "50%", left: "1/6", transform: "translateY(50%)" },
    },
    isActive: true,
  },
  // Right-center
  {
    id: "pos-7",
    position: {
      base: { top: "1/3", right: "0" },
      sm: { top: "50%", right: "1/6", transform: "translateY(-50%)" },
    },
    isActive: true,
  },
  // Bottom-center
  {
    id: "pos-8",
    position: {
      base: { bottom: "1/4", right: "0" },
      sm: { bottom: "1/4", right: "50%", transform: "translateX(50%)" },
    },
    isActive: true,
  },
];
