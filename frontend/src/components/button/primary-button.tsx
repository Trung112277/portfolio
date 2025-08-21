import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface PrimaryButtonProps extends React.ComponentProps<typeof Button> {
  children: React.ReactNode;
}

export default function PrimaryButton({
  children,
  className,
  ...props
}: PrimaryButtonProps) {
  return (
    <Button 
      className={cn("w-fit text-background mb-0", className)} 
      {...props}
    >
      {children}
    </Button>
  );
}
