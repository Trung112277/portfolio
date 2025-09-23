import Auth from "@/components/feature/auth/auth";
import Link from "next/link";
import dynamic from "next/dynamic";
export default function Login() {
  const Image = dynamic(() => import("next/image"));
  return (
    <div className="relative">
      <div className="absolute top-0 left-0 w-full h-full">
        <Image
          src="/background/background-login.jpg"
          alt="Background Login"
          className="w-full h-full object-cover -z-10 brightness-50 blur-xs"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMzInIGhlaWdodD0nMzInIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHJlY3Qgd2lkdGg9JzMyJyBoZWlnaHQ9JzMyJyByeD0nNCcgZmlsbD0nI2ZmZicgZmlsbC1vcGFjaXR5PScwLjEnIC8+PC9zdmc+"
          width={1000}
          height={1000}
        />
      </div>
      <div className="min-h-screen flex items-center justify-center flex-col gap-4 relative z-10 p-5">
        <Auth />
        <Link
          href="/"
          className="text-xl font-bold text-white border bg-primary border-primary rounded-md p-2 hover:bg-primary/80 hover:border-primary/80 transition-colors"
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
}
