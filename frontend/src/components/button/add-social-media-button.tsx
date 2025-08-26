import { DialogTrigger } from "@radix-ui/react-dialog";
import PrimaryButton from "./primary-button";
import { PlusIcon } from "lucide-react";

export default function AddSocialMediaButton() {
  return (
    <DialogTrigger asChild>
      <PrimaryButton>
        <PlusIcon className="w-4 h-4" />
        Add Social Media
      </PrimaryButton>
    </DialogTrigger>
  );
}
