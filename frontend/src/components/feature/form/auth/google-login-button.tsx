import { Button } from "@/components/ui/button";
import Image from "next/image";
export default function GoogleLoginButton() {
  return (
    <Button
      variant="outline"
      className="bg-white text-black border-black brightness-80 hover:brightness-100 h-10"
    >
      <Image
        src="/logo/google-logo.png"
        alt="Google Logo"
        width={20}
        height={20}
      />
      Login with Google
    </Button>
  );
}
