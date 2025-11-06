import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 text-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-bold mb-2 text-primary">Page not found</h1>
        <p className="text-white">
          The page you are looking for does not exist.
        </p>
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
