export const DEVELOPER_ROLES = [
  "FRONTEND",
  "BACKEND", 
  "FULLSTACK",
] as const;

export type DeveloperRole = typeof DEVELOPER_ROLES[number];
