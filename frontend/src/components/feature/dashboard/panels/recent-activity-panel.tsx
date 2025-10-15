"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRecentActivity } from "@/hooks/useRecentActivity";
import { Loader2 } from "lucide-react";

export function RecentActivityPanel() {
  const { activities, getTimeAgo, getActivityIcon } = useRecentActivity();

  if (activities.length === 0) {
    return (
      <Card className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl text-primary">Recent Activity</CardTitle>
          <CardDescription className="text-foreground">
            Latest portfolio updates and achievements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32">
            <div className="text-center">
              <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-400">Loading activities...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getColorClass = (color: string) => {
    switch (color) {
      case 'green': return 'bg-green-400';
      case 'blue': return 'bg-blue-400';
      case 'purple': return 'bg-purple-400';
      case 'orange': return 'bg-orange-400';
      case 'red': return 'bg-red-400';
      default: return 'bg-gray-400';
    }
  };

  const getActivityStyle = (activity: { action: string }) => {
    if (activity.action === 'deleted') {
      return 'opacity-75 border-l-4 border-red-400';
    }
    return '';
  };

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
          {activities.map((activity) => (
            <div key={activity.id} className={`flex items-center gap-3 p-3 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors ${getActivityStyle(activity)}`}>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${getColorClass(activity.color)}`}></div>
                <span className="text-lg">{getActivityIcon(activity.type, activity.action)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-primary truncate">
                  {activity.title}
                </p>
                <p className="text-xs text-foreground truncate">
                  {activity.description}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {getTimeAgo(activity.timestamp)}
                </p>
              </div>
            </div>
          ))}
          
          {activities.length === 10 && (
            <div className="text-center pt-2">
              <p className="text-xs text-gray-500">
                Showing latest 10 activities
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
