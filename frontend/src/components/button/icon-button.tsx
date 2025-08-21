import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export default function IconButton({
  children,
  onClick,
  className,
  props,
}: {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  props?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}) {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      className={cn("p-2", className)}
      {...props}
    > 
      {children}
    </Button>
  );
}
