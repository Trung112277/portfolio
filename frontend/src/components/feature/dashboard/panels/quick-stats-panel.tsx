"use client";

import {
  BriefcaseIcon,
  CalendarIcon,
  CodeIcon,
  TrendingUpIcon,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuickStats } from "@/hooks/useQuickStats";

export function QuickStatsPanel() {
  // Use real data from database with fallback
  const { data, loading, error } = useQuickStats();


  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="bg-gradient-to-br from-gray-500/10 to-gray-600/10 border-gray-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
              <CardTitle className="text-sm font-medium text-gray-400">
                Loading...
              </CardTitle>
              <Loader2 className="h-4 w-4 text-gray-400 animate-spin" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold my-2 text-gray-300">-</div>
              <p className="text-xs text-foreground">Please wait...</p>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="col-span-full bg-gradient-to-br from-red-500/10 to-red-600/10 border-red-500/20">
          <CardContent className="pt-6">
            <div className="text-center text-red-400">
              <p className="text-sm">Error loading statistics</p>
              <p className="text-xs text-foreground mt-1">{error}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
          <CardTitle className="text-sm font-medium text-blue-400">
            Total Projects
          </CardTitle>
          <BriefcaseIcon className="h-4 w-4 text-blue-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold my-2 text-blue-300">
            {data.totalProjects}
          </div>
          <p className="text-xs text-foreground">{data.projectsGrowth}</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
          <CardTitle className="text-sm font-medium text-green-400">
            Technologies
          </CardTitle>
          <CodeIcon className="h-4 w-4 text-green-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold my-2 text-green-300">
            {data.totalTechnologies}
          </div>
          <p className="text-xs text-foreground">{data.technologiesDescription}</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
          <CardTitle className="text-sm font-medium text-orange-400">
            Experience
          </CardTitle>
          <TrendingUpIcon className="h-4 w-4 text-orange-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold my-2 text-orange-300">
            {data.yearsOfExperience}+
          </div>
          <p className="text-xs text-foreground">Years of development</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
          <CardTitle className="text-sm font-medium text-purple-400">
            Last Updated
          </CardTitle>
          <CalendarIcon className="h-4 w-4 text-purple-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold my-2 text-purple-300">
            {data.lastUpdated}
          </div>
          <p className="text-xs text-foreground">{data.lastUpdatedDetail}</p>
        </CardContent>
      </Card>
    </div>
  );
}
