import Link from "next/link";
import { SafeImage } from "@/components/ui/safe-image";
import { GlowBoxItem } from "@/components/feature/glow-bow/glow-box-item";
import { Socials } from "@/types/tech-stack";

interface SocialsGlowBoxListProps {
  socials: Socials[];
}

export function SocialsGlowBoxList({ socials }: SocialsGlowBoxListProps) {
  return (
    <div className="flex flex-col gap-3 text-foreground justify-center items-center">
      <h3 className="text-2xl font-bold text-primary uppercase">Socials</h3>
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
    </div>
  );
}
