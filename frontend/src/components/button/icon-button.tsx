import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";


export default function IconButton({
  children,
  onClick,
  className,
  disabled = false,
  props,
}: {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  props?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}) {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      disabled={disabled}
      className={cn("p-2", className)}
      {...props}
    > 
      {children}
    </Button>
  );
}
