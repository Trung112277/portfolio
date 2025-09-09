import { FrontendGlowBow } from "@/components/feature/glow-bow/frontend-glow-bow";

interface TechItemProps {
  title: string;
}

export default function TechItem({ title }: TechItemProps) {
  return (
    <div className="flex flex-col gap-3 text-foreground justify-center items-center">
      <h3 className="text-2xl capitalize">{title}</h3>
      <FrontendGlowBow />
    </div>
  );
}
