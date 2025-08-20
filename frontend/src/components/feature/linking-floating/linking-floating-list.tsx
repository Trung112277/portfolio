import { memo } from "react";
import { LinkingFloatingButton } from "@/components/button/linking-floating-button";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { PROJECTS_DATA } from "@/data/projects";
import { PROJECT_POSITIONS } from "@/types/project";
import { getPositionStyles, resolveResponsivePosition, type Breakpoint } from "@/lib/position-utils";

interface EmptySlotProps {
  index: number;
  position: React.CSSProperties;
}

const EmptySlot = memo(({ index, position }: EmptySlotProps) => (
  <div style={position} className="z-10">
    <div className="w-[150px] h-[50px] rounded-2xl border-2 border-dashed border-gray-600 flex items-center justify-center text-gray-500 text-sm bg-gray-900/50">
      Empty Slot {index + 1}
    </div>
  </div>
));

EmptySlot.displayName = "EmptySlot";

interface ProjectSlotProps {
  project: typeof PROJECTS_DATA[number];
  position: React.CSSProperties;
  positionId: string;
}

const ProjectSlot = memo(({ project, position, positionId }: ProjectSlotProps) => (
  <div key={positionId} style={position} className="z-10">
    <LinkingFloatingButton
      to={project.link}
      content={project.title}
      color={project.color}
    >
      {project.title}
    </LinkingFloatingButton>
  </div>
));

ProjectSlot.displayName = "ProjectSlot";

function useBreakpoint(): Breakpoint {
  if (typeof window === 'undefined') return 'base';
  const width = window.innerWidth;
  if (width >= 1280) return 'xl';
  if (width >= 1024) return 'lg';
  if (width >= 768) return 'md';
  if (width >= 640) return 'sm';
  return 'base';
}

export const LinkingFloatingList = memo(() => {
  const breakpoint = useBreakpoint();
  return (
    <TooltipProvider>
      <div className="relative w-full min-h-[800px]">
        {PROJECT_POSITIONS.map((pos, index) => {
          const project = PROJECTS_DATA[index];
          const responsivePosition = (project?.position ?? pos.position) as import("@/lib/position-utils").ResponsivePosition;
          const resolved = resolveResponsivePosition(responsivePosition, breakpoint);
          const positionStyles = getPositionStyles(resolved);
          
          if (!project || !project.isActive) {
            return (
              <EmptySlot
                key={pos.id}
                index={index}
                position={positionStyles}
              />
            );
          }

          return (
            <ProjectSlot
              key={pos.id}
              project={project}
              position={positionStyles}
              positionId={pos.id}
            />
          );
        })}
      </div>
    </TooltipProvider>
  );
});

LinkingFloatingList.displayName = "LinkingFloatingList";
