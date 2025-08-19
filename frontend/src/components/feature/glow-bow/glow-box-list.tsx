import Image from "next/image";
import { GlowBoxItem } from "./glow-box-item";
import { BaseTechStack } from "@/types/tech-stack";

interface GlowBoxListProps {
  techStack: BaseTechStack[];
}

export function GlowBoxList({ techStack }: GlowBoxListProps) {
  return (
    <ul className="flex gap-4 flex-wrap justify-center">
      {techStack.map((item) => (
        <GlowBoxItem key={item.id} color={item.color} content={item.description} >
            <Image src={item.logo} loading="lazy"  alt={item.name} width={50} height={50} />
        </GlowBoxItem>
      ))}
    </ul>
  );
}