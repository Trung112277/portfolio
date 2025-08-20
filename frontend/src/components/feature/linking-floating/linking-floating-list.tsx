import { LinkingFloatingButton } from "@/components/button/linking-floating-button";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { PROJECTS_DATA } from "@/data/projects";
import { PROJECT_POSITIONS } from "@/types/project";

export function LinkingFloatingList() {
  // Helper function để convert position thành CSS styles
  const getPositionStyles = (position: { top?: string; left?: string; right?: string; bottom?: string; transform?: string }) => {
    const styles: React.CSSProperties = {
      position: 'absolute' as const,
    };

    // Convert Tailwind-like values to CSS values
    if (position.top) {
      if (position.top.includes('/')) {
        // Handle fractions like "2/5" -> "40%"
        const [numerator, denominator] = position.top.split('/').map(Number);
        styles.top = `${(numerator / denominator) * 100}%`;
      } else {
        styles.top = position.top;
      }
    }
    
    if (position.left) {
      if (position.left.includes('/')) {
        const [numerator, denominator] = position.left.split('/').map(Number);
        styles.left = `${(numerator / denominator) * 100}%`;
      } else {
        styles.left = position.left;
      }
    }
    
    if (position.right) {
      if (position.right.includes('/')) {
        const [numerator, denominator] = position.right.split('/').map(Number);
        styles.right = `${(numerator / denominator) * 100}%`;
      } else {
        styles.right = position.right;
      }
    }
    
    if (position.bottom) {
      if (position.bottom.includes('/')) {
        const [numerator, denominator] = position.bottom.split('/').map(Number);
        styles.bottom = `${(numerator / denominator) * 100}%`;
      } else {
        styles.bottom = position.bottom;
      }
    }

    // Handle transform property
    if (position.transform) {
      styles.transform = position.transform;
    }

    return styles;
  };

  return (
    <TooltipProvider>
      <div className="relative w-full min-h-[800px]">
        {/* Debug info */}
       
        
        {PROJECT_POSITIONS.map((pos, index) => {
          const project = PROJECTS_DATA[index];
          
          if (!project || !project.isActive) {
            return (
              <div
                key={pos.id}
                style={getPositionStyles(pos.position)}
                className="z-10"
              >
                <div className="w-[150px] h-[50px] rounded-2xl border-2 border-dashed border-gray-600 flex items-center justify-center text-gray-500 text-sm bg-gray-900/50">
                  Empty Slot {index + 1}
                </div>
              </div>
            );
          }

          // Render project button
          return (
            <div
              key={pos.id}
              style={getPositionStyles(pos.position)}
              className="z-10"
            >
              <LinkingFloatingButton
                to={project.link}
                content={project.title}
                color={project.color}
              >
                {project.title}
              </LinkingFloatingButton>
            </div>
          );
        })}
      </div>
    </TooltipProvider>
  );
}
