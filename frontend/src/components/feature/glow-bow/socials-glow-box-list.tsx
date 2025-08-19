import Image from "next/image";
import { GlowBoxItem } from "./glow-box-item";
import Link from "next/link";
import { Socials } from "@/types/tech-stack";

interface SocialsGlowBoxListProps {
  socials: Socials[];
}

export function SocialsGlowBoxList({ socials }: SocialsGlowBoxListProps) {
  return (
    <ul className="flex gap-4 flex-wrap justify-center">
      {socials.map((item) => (
        <GlowBoxItem key={item.id} color={item.color} content={item.description} >
          <Link href={item.link} target="_blank">
            <Image src={item.logo} alt={item.name} width={50} height={50} />
          </Link>
        </GlowBoxItem>
      ))}
    </ul>
  );
}