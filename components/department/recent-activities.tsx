import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Clock,
  UserPlus,
  BookOpen,
  FileText,
  Calendar,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const activities = [
  {
    id: 1,
    type: "class assignment",
    title: "New Class Assignment",
    description: "Sarah Johnson assigned to Grade 10-A Mathematics",
    timestamp: "2 minutes ago",
    icon: UserPlus,
    color: "bg-green-500",
    status: "completed",
  },
  {
    id: 2,
    type: "teacher assignment",
    title: "Subject Teacher Updated",
    description: "Mr. David Smith assigned to Grade 11 Physics",
    timestamp: "15 minutes ago",
    icon: Calendar,
    color: "bg-blue-500",
    status: "updated",
  },
  {
    id: 3,
    type: "grade review",
    title: "Grade Review Pending",
    description: "Ms. Wilson submitted Grade 12 Chemistry marks for review",
    timestamp: "1 hour ago",
    icon: FileText,
    color: "bg-purple-500",
    status: "pending",
  },
  {
    id: 4,
    type: "progress report",
    title: "Progress Report Generated",
    description: "Mid-semester reports generated for Grade 9 students",
    timestamp: "2 hours ago",
    icon: BookOpen,
    color: "bg-indigo-500",
    status: "completed",
  },
  {
    id: 5,
    type: "parent notice",
    title: "Parent Notice Sent",
    description: "Parent-teacher meeting notice sent to Grade 10 parents",
    timestamp: "3 hours ago",
    icon: CheckCircle,
    color: "bg-orange-500",
    status: "completed",
  },
  {
    id: 6,
    type: "student enrollment",
    title: "Student Enrollment",
    description: "3 new students enrolled in Grade 11 sections",
    timestamp: "4 hours ago",
    icon: UserPlus,
    color: "bg-cyan-500",
    status: "completed",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "updated":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export function DepartmentRecentActivities() {
  return (
    <Card className="border-blue-100">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-blue-900 flex items-center gap-2">
          🕒 Recent Activities
        </CardTitle>
        <p className="text-blue-600 text-sm">
          Latest high school administration activities and updates
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-4 p-4 rounded-lg border border-blue-100 hover:bg-blue-50 transition-colors"
            >
              <div className={`${activity.color} p-2 rounded-lg flex-shrink-0`}>
                <activity.icon className="h-4 w-4 text-white" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-medium text-blue-900 truncate">
                    {activity.title}
                  </h4>
                  <Badge
                    variant="secondary"
                    className={`${getStatusColor(activity.status)} text-xs`}
                  >
                    {activity.status}
                  </Badge>
                </div>
                <p className="text-sm text-blue-600 mb-2">
                  {activity.description}
                </p>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />
                  <span>{activity.timestamp}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-blue-100">
          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
            View All Activities →
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
