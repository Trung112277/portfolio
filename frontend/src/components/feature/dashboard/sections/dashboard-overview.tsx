import { DashboardTitle } from "@/components/heading/dashboar-title";
import { WelcomePanel } from "@/components/feature/dashboard/panels/welcome-panel";
import { QuickStatsPanel } from "@/components/feature/dashboard/panels/quick-stats-panel";
import { RecentActivityPanel } from "@/components/feature/dashboard/panels/recent-activity-panel";

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      <DashboardTitle
        title="Dashboard Overview"
        description="Welcome to portfolio dashboard. Manage content and track progress."
      />
      
      {/* Quick Stats */}
      <QuickStatsPanel />

      {/* Welcome Section */}
      <WelcomePanel />

      {/* Recent Activity */}
      <RecentActivityPanel />
    </div>
  );
}
