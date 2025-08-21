import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TargetIcon, UserIcon } from "lucide-react";

export function WelcomeSection() {
  return (
    <Card className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl text-primary">
            <UserIcon className="h-5 w-5 text-blue-400" />
            Welcome, Developer!
          </CardTitle>
          <CardDescription className="text-foreground">
            Your portfolio dashboard is your command center for showcasing your skills and projects.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 text-foreground">
              <h4 className="font-semibold flex items-center gap-2">
                <TargetIcon className="h-4 w-4 text-green-400" />
                What You Can Do Here:
              </h4>
              <ul className="text-sm  space-y-1">
                <li>• Manage and update your project portfolio</li>
                <li>• Showcase your technical skills and expertise</li>
                <li>• Track your professional growth and achievements</li>
                <li>• Customize your personal brand and presentation</li>
                <li>• Monitor portfolio performance and analytics</li>
              </ul>
            </div>
            <div className="space-y-2">
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