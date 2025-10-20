
"use client";

import Link from "next/link";
import { memo } from "react";
import { hexToRgb } from "@/lib/utils";
import { Tooltip, TooltipTrigger } from "@radix-ui/react-tooltip";
import { BadgeTooltip } from "@/components/common/badge-tooltip";
import { FloatingButtonProps } from "@/types/components";
import { usePageLoader } from "@/hooks/usePageLoader";

interface LinkingFloatingButtonProps extends Omit<FloatingButtonProps, 'onClick'> {
  to: string;
  content: string;
  external?: boolean;
}

const LinkingFloatingButton = memo(({
  children,
  color = "#1fc3ff",
  to,
  content,
  external = true,
  className = "",
}: LinkingFloatingButtonProps) => {
  const rgbColor = hexToRgb(color);
  const { startLoading } = usePageLoader();

  const handleClick = () => {
    // Chỉ start loading cho internal page navigation
    if (!external && !to.startsWith('#') && !to.startsWith('/dashboard/')) {
      startLoading(to);
    }
  };

  return (
    <div>
      <Tooltip>
        <TooltipTrigger>
          <Link
            href={to}
            className={`floating-button ${className}`}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            style={
              {
                "--button-color": color,
                "--button-color-rgb": rgbColor,
              } as React.CSSProperties
            }
            onClick={handleClick}
          >
            {children}
          </Link>
        </TooltipTrigger>
        <BadgeTooltip>{content}</BadgeTooltip>
      </Tooltip>
    </div>
  );
});

LinkingFloatingButton.displayName = "LinkingFloatingButton";

export { LinkingFloatingButton };
