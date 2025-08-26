import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface PrimaryButtonProps extends React.ComponentProps<typeof Button> {
  children: React.ReactNode;
}

export default function PrimaryButton({
  children,
  className,
  variant = "default",
  ...props
}: PrimaryButtonProps) {
  return (
    <Button 
      className={cn("w-fit mb-0", className)} 
      variant={variant}
      {...props}
    >
      {children}
    </Button>
  );
}
