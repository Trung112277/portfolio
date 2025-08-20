import { Project } from "@/types/project";

export const PROJECTS_DATA: Project[] = [
  {
    id: "project-1",
    title: "Project Alpha",
    description: "A revolutionary web application",
    link: "https://github.com/username/project-alpha",
    color: "#1fc3ff",
    category: "web-app",
    isActive: true,
    position: { top: "1/6", left: "1/6" }
  },
  {
    id: "project-2",
    title: "Project Beta",
    description: "Mobile app for productivity",
    link: "https://github.com/username/project-beta",
    color: "#4ecdc4",
    category: "mobile-app",
    isActive: true,
    position: { top: "1/6", right: "1/6" }
  },
  {
    id: "project-3",
    title: "Project Gamma",
    description: "AI-powered chatbot",
    link: "https://github.com/username/project-gamma",
    color: "#ff6b6b",
    category: "ai-ml",
    isActive: false, // Test empty slot
    position: { bottom: "1/6", left: "1/6" }
  },
  {
    id: "project-4",
    title: "Project Delta",
    description: "E-commerce platform",
    link: "https://github.com/username/project-delta",
    color: "#1fc3ff",
    category: "e-commerce",
    isActive: true,
    position: { bottom: "1/6", right: "1/6" }
  },
  {
    id: "project-5",
    title: "Project Epsilon",
    description: "Data visualization dashboard",
    link: "https://github.com/username/project-epsilon",
    color: "#1fc3ff",
    category: "data-viz",
    isActive: true,
    position: { top: "1/4", left: "50%", transform: "translateX(-50%)" }
  },
  {
    id: "project-6",
    title: "Project Zeta",
    description: "Real-time collaboration tool",
    link: "https://github.com/username/project-zeta",
    color: "#1fc3ff",
    category: "collaboration",
    isActive: false, // Test empty slot
    position: { top: "50%", left: "1/6", transform: "translateY(-50%)" }
  },
  {
    id: "project-7",
    title: "Project Eta",
    description: "Blockchain wallet",
    link: "https://github.com/username/project-eta",
    color: "#1fc3ff",
    category: "blockchain",
    isActive: true,
    position: { top: "50%", right: "1/6", transform: "translateY(-50%)" }
  },
  {
    id: "project-8",
    title: "Project Theta",
    description: "Machine learning model",
    link: "https://github.com/username/project-theta",
    color: "#1fc3ff",
    category: "ai-ml",
    isActive: true,
    position: { bottom: "1/4", left: "50%", transform: "translateX(-50%)" }
  }
];
