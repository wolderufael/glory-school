import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  UserPlus,
  BookOpen,
  Calendar,
  FileText,
  Download,
  Upload,
  Settings,
  Mail,
  ActivityIcon,
} from "lucide-react";

const quickActions = [
  {
    title: "Student Grades",
    description: "Enter and manage student grades",
    icon: FileText,
    color: "bg-blue-500",
    href: "#",
  },
  {
    title: "Class Attendance",
    description: "Track daily attendance",
    icon: UserPlus,
    color: "bg-green-500",
    href: "#",
  },
  {
    title: "Assignment Results",
    description: "Record test and assignment scores",
    icon: BookOpen,
    color: "bg-indigo-500",
    href: "#",
  },
  {
    title: "Class Schedule",
    description: "View teaching schedule",
    icon: Calendar,
    color: "bg-purple-500",
    href: "#",
  },
  {
    title: "Grade Reports",
    description: "Generate semester reports",
    icon: Download,
    color: "bg-orange-500",
    href: "#",
  },
  {
    title: "Parent Messages",
    description: "Send messages to parents",
    icon: Mail,
    color: "bg-pink-500",
    href: "#",
  },
  {
    title: "Lesson Plans",
    description: "Create and manage lesson plans",
    icon: Settings,
    color: "bg-teal-500",
    href: "#",
  },
  {
    title: "Student Progress",
    description: "Monitor individual progress",
    icon: ActivityIcon,
    color: "bg-red-500",
    href: "#",
  },
];

export function TeacherQuickActions() {
  return (
    <Card className="border-blue-100">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-blue-900 flex items-center gap-2">
          Quick Actions
        </CardTitle>
        <p className="text-blue-600 text-sm">
          Essential high school teaching tools and classroom management
          shortcuts
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Button
              key={action.title}
              variant="outline"
              className="h-auto flex-col p-4 border-blue-200 hover:bg-blue-50 hover:border-blue-300 group"
              asChild
            >
              <a href={action.href}>
                <div
                  className={`${action.color} p-3 rounded-lg mb-3 group-hover:scale-110 transition-transform`}
                >
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-center">
                  <div className="font-medium text-blue-900 text-sm mb-1">
                    {action.title}
                  </div>
                  <div className="text-xs text-blue-600">
                    {action.description}
                  </div>
                </div>
              </a>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
