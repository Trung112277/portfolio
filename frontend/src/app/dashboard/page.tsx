import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Nhat Trung Portfolio",
  description: "Dashboard for managing portfolio content and analytics",
};

export default function Dashboard() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-card p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">Analytics</h2>
          <p className="text-muted-foreground">View your portfolio analytics and insights.</p>
        </div>
        <div className="bg-card p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">Projects</h2>
          <p className="text-muted-foreground">Manage your projects and showcase items.</p>
        </div>
        <div className="bg-card p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">Settings</h2>
          <p className="text-muted-foreground">Configure your portfolio settings.</p>
        </div>
      </div>
    </main>
  );
}