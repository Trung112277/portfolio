import { TrashIcon } from "lucide-react";
import IconButton from "@/components/button/icon-button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface DeleteButtonProps {
  title: string;
  onDelete: () => void;
}

export default function DeleteButton({ title, onDelete }: DeleteButtonProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <IconButton
          onClick={() => {}}
          className="bg-red-500/10 border-red-500/10 hover:bg-red-500/20 text-red-500 hover:border-red-500/20 hover:text-red-500"
        >
          <TrashIcon className="w-4 h-4 " />
        </IconButton>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-primary text-lg font-bold">
            Delete {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-foreground text-sm">
            Are you sure you want to delete this {title}?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-primary/10 border-primary/10 hover:bg-primary/20 text-primary hover:border-primary/20 hover:text-primary">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={onDelete}
            className="bg-red-500/10 border-red-500/10 hover:bg-red-500/20 border hover:border-red-500/20 hover:text-red-500 text-white"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
