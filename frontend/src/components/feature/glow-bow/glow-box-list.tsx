import { SafeImage } from "@/components/ui/safe-image";
import { GlowBoxItem } from "@/components/feature/glow-bow/glow-box-item";
import { BaseTechStack } from "@/types/tech-stack";

interface GlowBoxListProps {
  techStack: BaseTechStack[];
}

export function GlowBoxList({ techStack }: GlowBoxListProps) {
  return (
    <ul className="flex gap-4 flex-wrap justify-center">
      {techStack.map((item) => (
        <GlowBoxItem key={item.id} color={item.color} content={item.description} >
            <SafeImage
              src={item.logo}
              alt={item.name}
              width={50}
              height={50}
              loading="lazy"
              sizes="50px"
              fallbackSrc="/file.svg"
            />
        </GlowBoxItem>
      ))}
    </ul>
  );
}