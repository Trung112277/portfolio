import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";


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
