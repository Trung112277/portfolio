import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <nav className="bg-background border-b border-border p-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-bold hover:text-primary transition-colors">
            ← Back to Portfolio
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/dashboard" className="hover:text-primary transition-colors">
              Dashboard
            </Link>
          </div>
        </div>
      </nav>
      {children}
    </>
  );
}