import { SafeImage } from "@/components/ui/safe-image";
import { GlowBoxItem } from "./glow-box-item";
import Link from "next/link";
import { Socials } from "@/types/tech-stack";

interface SocialsGlowBoxListProps {
  socials: Socials[];
}

export function SocialsGlowBoxList({ socials }: SocialsGlowBoxListProps) {
  return (
    <nav>
      <ul className="flex gap-4 flex-wrap justify-center">
        {socials.map((item) => (
          <GlowBoxItem
            key={item.id}
            color={item.color}
            content={item.description}
          >
            <Link href={item.link} target="_blank">
              <SafeImage
                src={item.logo}
                alt={item.name}
                width={50}
                height={50}
                loading="lazy"
                sizes="50px"
                fallbackSrc="/file.svg"
              />
            </Link>
          </GlowBoxItem>
        ))}
      </ul>
    </nav>
  );
}
