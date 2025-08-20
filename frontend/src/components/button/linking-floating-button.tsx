
import Link from "next/link";
import { hexToRgb } from "@/lib/utils";
import { Tooltip, TooltipTrigger } from "@radix-ui/react-tooltip";
import { BadgeTooltip } from "../common/badge-tooltip";

export function LinkingFloatingButton({
  children,
  color = "#1fc3ff",
  to,
  content,
}: {
  children: React.ReactNode;
  color?: string;
  to: string;
  content: string;
}) {
  const rgbColor = hexToRgb(color);

  return (
    <div>
      <Tooltip>
        <TooltipTrigger>
          <Link
            href={to}
            className="floating-button"
            target="_blank"
            style={
              {
                "--button-color": color,
                "--button-color-rgb": rgbColor,
              } as React.CSSProperties
            }
          >
            {children}
          </Link>
        </TooltipTrigger>
        <BadgeTooltip>{content}</BadgeTooltip>
      </Tooltip>
    </div>
  );
}
