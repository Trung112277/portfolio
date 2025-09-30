"use client";
import { memo } from "react";
import { LinkingFloatingButton } from "@/components/button/linking-floating-button";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { PROJECT_POSITIONS } from "@/types/project";
import { getPositionStyles, resolveResponsivePosition, type Breakpoint } from "@/lib/position-utils";

type ResponsivePosition = import("@/lib/position-utils").ResponsivePosition;

export type FloatingItem = {
  id: string;
  name: string;
  description: string;
  link: string;
  color: string;
  position?: ResponsivePosition;
  isActive?: boolean;
};

export type LinkingFloatingListProps = {
  items: FloatingItem[];
  positions?: typeof PROJECT_POSITIONS; // optional override
};

function useBreakpoint(): Breakpoint {
  if (typeof window === 'undefined') return 'base';
  const width = window.innerWidth;
  if (width >= 1280) return 'xl';
  if (width >= 1024) return 'lg';
  if (width >= 768) return 'md';
  if (width >= 640) return 'sm';
  return 'base';
}

export const LinkingFloatingList = memo(({ items, positions = PROJECT_POSITIONS }: LinkingFloatingListProps) => {
  const breakpoint = useBreakpoint();

  return (
    <TooltipProvider>
      <div className="relative w-full min-h-[800px]">
        {positions.map((pos, index) => {
          const project = items[index];
          const responsivePosition = (project?.position ?? pos.position) as ResponsivePosition;
          const resolved = resolveResponsivePosition(responsivePosition, breakpoint);
          const positionStyles = getPositionStyles(resolved);

          if (!project || project.isActive === false) {
            return (
              <div key={pos.id} style={positionStyles} className="z-10">
                <div className="w-[150px] h-[50px] rounded-2xl border-2 border-dashed border-gray-600 flex items-center justify-center text-gray-500 text-sm bg-gray-900/50">
                  Empty Slot {index + 1}
                </div>
              </div>
            );
          }

          return (
            <div key={pos.id} style={positionStyles} className="z-10">
              <LinkingFloatingButton to={project.link} content={project.description} color={project.color}>
                {project.name}
              </LinkingFloatingButton>
            </div>
          );
        })}
      </div>
    </TooltipProvider>
  );
});

LinkingFloatingList.displayName = "LinkingFloatingList";