import { BadgeTooltip } from "@/components/common/badge-tooltip";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";

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
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
          result[3],
          16
        )}`
      : "139, 92, 246";
  };

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
