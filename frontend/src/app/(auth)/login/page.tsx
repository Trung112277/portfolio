import Auth from "@/components/feature/auth/auth";
import Link from "next/link";
export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-4">
      <Auth />
      <Link
        href="/"
        className="text-xl font-bold text-white border bg-primary border-primary rounded-md p-2 hover:bg-primary/80 hover:border-primary/80 transition-colors"
      >
        Go Back to Home
      </Link>
    </div>
  );
}
