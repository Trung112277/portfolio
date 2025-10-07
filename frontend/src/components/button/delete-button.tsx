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
import { LoadingOverlay } from "@/components/feature/loading/loading-overlay";
import { useState } from "react";

interface DeleteButtonProps {
  title: string;
  onDelete: () => Promise<void> | void;
}

export default function DeleteButton({ title, onDelete }: DeleteButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await onDelete();
    } catch (error) {
      console.error("Error in delete operation:", error);
    } finally {
      setIsDeleting(false);
    }
  };

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
        <LoadingOverlay isLoading={isDeleting} />
        <AlertDialogHeader>
          <AlertDialogTitle className="text-primary text-lg font-bold">
            Delete {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-foreground text-sm">
            Are you sure you want to delete this {title}?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel 
            className="bg-primary/10 border-primary/10 hover:bg-primary/20 text-primary hover:border-primary/20 hover:text-primary"
            disabled={isDeleting}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-500/10 border-red-500/10 hover:bg-red-500/20 border hover:border-red-500/20 hover:text-red-500 text-white disabled:opacity-50"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
