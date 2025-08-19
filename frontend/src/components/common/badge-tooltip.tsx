import { TooltipContent } from "../ui/tooltip";

export function BadgeTooltip({ children }: { children: React.ReactNode }) {
  return (
    <TooltipContent className="bg-white p-2 text-black text-md font-bold italic rounded-xl">
        {children}
    </TooltipContent>
  );
}