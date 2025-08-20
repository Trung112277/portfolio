export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  link: string;
  color?: string;
  isActive: boolean;
  position: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
    transform?: string;
  };
}

export interface ProjectPosition {
  id: string;
  position: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
    transform?: string;
  };
  isActive: boolean;
}

// 8 vị trí cố định cho projects - phân bố đều trên 4 góc và 4 cạnh
export const PROJECT_POSITIONS: ProjectPosition[] = [
  // Top-left corner
  {
    id: "pos-1",
    position: { top: "1/6", left: "1/6" },
    isActive: true
  },
  // Top-right corner  
  {
    id: "pos-2", 
    position: { top: "1/6", right: "1/6" },
    isActive: true
  },
  // Bottom-left corner
  {
    id: "pos-3",
    position: { bottom: "1/6", left: "1/6" },
    isActive: true
  },
  // Bottom-right corner
  {
    id: "pos-4",
    position: { bottom: "1/6", right: "1/6" },
    isActive: true
  },
  // Top-center
  {
    id: "pos-5",
    position: { top: "1/4", left: "50%", transform: "translateX(-50%)" },
    isActive: true
  },
  // Left-center
  {
    id: "pos-6",
    position: { top: "50%", left: "1/6", transform: "translateY(-50%)" },
    isActive: true
  },
  // Right-center
  {
    id: "pos-7",
    position: { top: "50%", right: "1/6", transform: "translateY(-50%)" },
    isActive: true
  },
  // Bottom-center
  {
    id: "pos-8",
    position: { bottom: "1/4", left: "50%", transform: "translateX(-50%)" },
    isActive: true
  }
];
