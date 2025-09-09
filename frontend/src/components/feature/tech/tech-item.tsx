import { FrontendGlowBow } from "@/components/feature/glow-bow/frontend-glow-bow";
import { BackendGlowBow } from "../glow-bow/backend-glow-bow";
import { DatabaseGlowBow } from "../glow-bow/database-glow-bow";
import { DevOpsGlowBow } from "../glow-bow/dev-ops-glow-bow";

interface TechItemProps {
  title: string;
  category: string;
}
export default function TechItem({ title, category }: TechItemProps) {
  const renderGlowBow = () => {
    switch (category) {
      case "frontend":
        return <FrontendGlowBow />;
      case "backend":
        return <BackendGlowBow />;
      case "database":
        return <DatabaseGlowBow />;
      case "devops":
        return <DevOpsGlowBow />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-3 text-foreground justify-center items-center">
      <h3 className="text-2xl capitalize">{title}</h3>
      {renderGlowBow()}
    </div>
  );
}
