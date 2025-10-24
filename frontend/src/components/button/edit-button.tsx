import { PencilIcon } from "lucide-react";
import IconButton from "@/components/button/icon-button";

export default function EditButton({ 
  onClick, 
  disabled = false 
}: { 
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <IconButton
      onClick={onClick}
      disabled={disabled}
      className="bg-green-500/10 border-green-500/10 hover:bg-green-500/20 text-green-500 hover:border-green-500/20 hover:text-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <PencilIcon className="w-4 h-4 " />
    </IconButton>
  );
}
