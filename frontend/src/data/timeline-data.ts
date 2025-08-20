export interface TimelineItem {
  id: string;
  title: string;
  company: string;
  period: string;
  responsibilities: string[];
  skills?: string[];
  location?: string;
}

export const TIMELINE_DATA: TimelineItem[] = [
  {
    id: "wimetrix-fullstack",
    title: "Full Stack Developer",
    company: "Wimetrix",
    period: "2022 - Present",
    location: "Remote",
    skills: ["React", "Node.js", "TypeScript", "PostgreSQL"],
    responsibilities: [
      "Contributed significantly to the development of main project Sooperwizer, a pivotal project for automating and optimizing textile processes.",
      "Developed and maintained a comprehensive system for managing and tracking textile production processes, including inventory management, quality control, and production tracking.",
      "Collaborated with cross-functional teams to deliver high-quality software solutions.",
      "Mentored junior developers and conducted code reviews to maintain code quality standards."
    ]
  },
  {
    id: "freelance-frontend",
    title: "Frontend Developer",
    company: "Freelance",
    period: "2021 - 2022",
    location: "Remote",
    skills: ["React", "JavaScript", "CSS", "Figma"],
    responsibilities: [
      "Built responsive web applications using React and modern JavaScript.",
      "Collaborated with design teams to implement pixel-perfect UI/UX designs.",
      "Optimized applications for maximum speed and scalability.",
      "Integrated with RESTful APIs and managed application state effectively."
    ]
  },
  {
    id: "internship-web",
    title: "Web Developer Intern",
    company: "Tech Startup",
    period: "2020 - 2021",
    location: "Ho Chi Minh City",
    skills: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    responsibilities: [
      "Assisted in developing company websites and landing pages.",
      "Learned modern web development practices and version control with Git.",
      "Participated in daily standups and agile development processes.",
      "Gained experience in debugging and testing web applications."
    ]
  }
];