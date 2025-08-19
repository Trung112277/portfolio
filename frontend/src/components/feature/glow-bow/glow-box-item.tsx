import { BadgeTooltip } from "@/components/common/badge-tooltip";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import { hexToRgb } from "@/lib/utils";

interface GlowBoxItemProps {
  children?: React.ReactNode;
  color?: string;
  content?: string;
}

export function GlowBoxItem({
  children,
  color = "#8b5cf6",
  content,
}: GlowBoxItemProps) {
  const rgbColor = hexToRgb(color);

  return (
    <li>
      <Tooltip>
        <TooltipTrigger>
          <div
            className="glow-box"
            data-color={color}
            style={
              {
                "--data-color": color,
                "--data-color-rgb": rgbColor,
              } as React.CSSProperties
            }
          >
            {children}
          </div>
        </TooltipTrigger>
        <BadgeTooltip>{content}</BadgeTooltip>
      </Tooltip>
    </li>
  );
}
