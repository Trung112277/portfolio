import { DashboardTitle } from "@/components/heading/dashboar-title";
import { WelcomeSection } from "./welcome.-section";
import { QuickStatsSection } from "./quick-stats-section";
import { RecentActivity } from "./recent-activity";

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      <DashboardTitle
        title="Dashboard Overview"
        description="Welcome to portfolio dashboard. Manage content and track progress."
      />
      
      {/* Quick Stats */}
      <QuickStatsSection />

      {/* Welcome Section */}
      <WelcomeSection />

      {/* Recent Activity */}
      <RecentActivity />
    </div>
  );
}
