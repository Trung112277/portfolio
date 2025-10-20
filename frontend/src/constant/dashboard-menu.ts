export const DASHBOARD_MENU = [
  {
    name: "Overview",
    path: "/dashboard/overview",
    roles: ['admin', 'user'], // All users can see this
  },
  {
    name: "About Me",
    path: "/dashboard/about-me",
    roles: ['admin', 'user'], // All users can see this
  },
  {
    name: "Tech",
    path: "/dashboard/tech",
    roles: ['admin', 'user'], // All users can see this
  },
  {
    name: "Projects",
    path: "/dashboard/projects",
    roles: ['admin', 'user'], // All users can see this
  },
  {
    name: "User",
    path: "/dashboard/user",
    roles: ['admin'], // Only admin can see this
  },
];
