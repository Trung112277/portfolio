import { TooltipContent } from "../ui/tooltip";

export function BadgeTooltip({ children }: { children: React.ReactNode }) {
  return (
    <TooltipContent className="bg-white p-3 text-black text-sm font-semibold rounded-xl italic shadow-lg border border-gray-200 max-w-xs">
      {children}
    </TooltipContent>
  );
}