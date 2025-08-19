// Base interface for tech stack items
export interface BaseTechStack {
  id: string;
  name: string;
  color: string;
  description: string;
  category: string;
  logo: string;
}

// Extended interface for social links
export interface Socials extends BaseTechStack {
  link: string;
}

// Union type for all tech stack variants
export type TechStack = BaseTechStack | Socials;
