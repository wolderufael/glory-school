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
    title: "Class Assignment",
    description: "Assign students to classes",
    icon: UserPlus,
    color: "bg-blue-500",
    href: "#",
  },
  {
    title: "Subject Teachers",
    description: "Assign teachers to subjects",
    icon: BookOpen,
    color: "bg-indigo-500",
    href: "#",
  },
  {
    title: "Grade Review",
    description: "Review student grades",
    icon: Calendar,
    color: "bg-purple-500",
    href: "#",
  },
  {
    title: "Progress Reports",
    description: "Generate student progress reports",
    icon: FileText,
    color: "bg-cyan-500",
    href: "#",
  },
  {
    title: "Export Grades",
    description: "Download grade sheets",
    icon: Download,
    color: "bg-green-500",
    href: "#",
  },
  {
    title: "Student Records",
    description: "Upload student information",
    icon: Upload,
    color: "bg-orange-500",
    href: "#",
  },
  {
    title: "Class Schedule",
    description: "Manage class timetables",
    icon: Settings,
    color: "bg-gray-500",
    href: "#",
  },
  {
    title: "Parent Notice",
    description: "Send notices to parents",
    icon: Mail,
    color: "bg-rose-500",
    href: "#",
  },
];

export function DepartmentQuickActions() {
  return (
    <Card className="border-blue-100">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-blue-900 flex items-center gap-2">
          Quick Actions
        </CardTitle>
        <p className="text-blue-600 text-sm">
          Common tasks and shortcuts for high school administration
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
