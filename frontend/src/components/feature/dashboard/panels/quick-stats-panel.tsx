import {
  BriefcaseIcon,
  CalendarIcon,
  CodeIcon,
  TrendingUpIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


export function QuickStatsPanel() {
  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
        <CardTitle className="text-sm font-medium text-blue-400">
          Total Projects
        </CardTitle>
        <BriefcaseIcon className="h-4 w-4 text-blue-400" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold my-2 text-blue-300">12</div>
        <p className="text-xs text-foreground">+2 from last month</p>
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
        <div className="text-2xl font-bold my-2 text-green-300">8</div>
        <p className="text-xs text-foreground">Frontend & Backend</p>
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
        <div className="text-2xl font-bold my-2 text-orange-300">3+</div>
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
        <div className="text-2xl font-bold my-2 text-purple-300">Today</div>
        <p className="text-xs text-foreground">Portfolio refreshed</p>
      </CardContent>
    </Card>
  </div>;
}
