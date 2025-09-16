import { TargetIcon, UserIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function WelcomePanel() {
  return (
    <Card className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl text-primary">
            <UserIcon className="h-5 w-5 text-blue-400" />
            Welcome, Developer!
          </CardTitle>
          <CardDescription className="text-foreground">
            Portfolio dashboard is command center for showcasing skills and projects.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="space-y-2 text-foreground w-full md:w-1/2">
              <h4 className="font-semibold flex items-center gap-2">
                <TargetIcon className="h-4 w-4 text-green-400" />
                What can be done here:
              </h4>
              <ul className="text-sm space-y-1">
                <li>• Manage and update project portfolio</li>
                <li>• Showcase technical skills and expertise</li>
                <li>• Track professional growth and achievements</li>
                <li>• Customize personal brand and presentation</li>
                <li>• Add new projects and skills</li>
              </ul>
            </div>
            <div className="space-y-2 w-full md:w-1/2">
              <h4 className="font-semibold text-foreground">Quick Actions:</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/30">
                  Add New Project
                </Badge>
                <Badge variant="secondary" className="bg-green-500/20 text-green-300 hover:bg-green-500/30">
                  Update Skills
                </Badge>
                <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 hover:bg-purple-500/30">
                  Edit Profile
                </Badge>
                <Badge variant="secondary" className="bg-orange-500/20 text-orange-300 hover:bg-orange-500/30">
                  View Analytics
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>  
      </Card>
  )
}