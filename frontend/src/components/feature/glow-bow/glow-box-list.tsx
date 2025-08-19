import Image from "next/image";
import { GlowBoxItem } from "./glow-box-item";

interface TechStack {
  id: string;
  name: string;
  color: string;
  description: string;
  category: string;
  logo: string;
}

interface GlowBoxListProps {
  techStack: TechStack[];
}

export function GlowBoxList({ techStack }: GlowBoxListProps) {
  return (
    <ul className="flex gap-4 flex-wrap justify-center">
      {techStack.map((item) => (
        <GlowBoxItem key={item.id} color={item.color} content={item.description} >
          <Image src={item.logo} alt={item.name} width={50} height={50} />
        </GlowBoxItem>
      ))}
    </ul>
  );
}