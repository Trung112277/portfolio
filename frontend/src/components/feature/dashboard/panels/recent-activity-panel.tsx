import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function RecentActivityPanel() {
  return (
    <Card className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-xl text-primary">Recent Activity</CardTitle>
        <CardDescription className="text-foreground">
          Latest portfolio updates and achievements
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/50">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-primary">
                Added new project: E-commerce Platform
              </p>
              <p className="text-xs text-foreground">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/50">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-primary">
                Updated skills: Added React 18 & TypeScript
              </p>
              <p className="text-xs text-foreground">1 day ago</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/50">
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-primary">
                Portfolio viewed by 15 new visitors
              </p>
              <p className="text-xs text-foreground">3 days ago</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
