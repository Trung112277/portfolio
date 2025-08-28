import PrimaryButton from "./primary-button";
import { PlusIcon } from "lucide-react";

interface AddSocialMediaButtonProps {
  onClick?: () => void;
}

export default function AddSocialMediaButton({ onClick }: AddSocialMediaButtonProps) {
  return (
    <PrimaryButton onClick={onClick}>
      <PlusIcon className="w-4 h-4" />
      Add Social Media
    </PrimaryButton>
  );
}
