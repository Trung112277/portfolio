import PrimaryButton from "@/components/button/primary-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SocialMediaForm() {
  return (
    <form className="flex flex-col gap-4">
      <div>
        <Label>Image</Label>
        <Input type="file" />
      </div>
      <div>
        <Label>Description</Label>
        <Input type="text" />
      </div>
      <div>
        <Label>Link</Label>
        <Input type="text" />
      </div>
      <div>
        <Label>Color</Label>
        <Input type="color" />
      </div>
      <PrimaryButton type="submit">Add Social Media</PrimaryButton>
    </form>
  );
}
