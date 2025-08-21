import { TrashIcon } from "lucide-react";
import IconButton from "./icon-button";
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

export default function DeleteButton() {
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
            Delete Social Media
          </AlertDialogTitle>
          <AlertDialogDescription className="text-foreground text-sm">
            Are you sure you want to delete this social media?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-primary/10 border-primary/10 hover:bg-primary/20 text-primary hover:border-primary/20 hover:text-primary">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction className="bg-red-500/10 border-red-500/10 hover:bg-red-500/20  hover:border-red-500/20 hover:text-red-500 text-white">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
