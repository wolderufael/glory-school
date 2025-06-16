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
    title: "Section Assignment",
    description: "Add new section to the system",
    icon: UserPlus,
    color: "bg-blue-500",
    href: "#",
  },
  {
    title: "Teacher Assignment",
    description: "Add new teacher to the system",
    icon: BookOpen,
    color: "bg-indigo-500",
    href: "#",
  },
  {
    title: "Grade Approval",
    description: "Approve grades for the system",
    icon: Calendar,
    color: "bg-purple-500",
    href: "#",
  },
  {
    title: "Generate Report",
    description: "Generate academic reports",
    icon: FileText,
    color: "bg-cyan-500",
    href: "#",
  },
  {
    title: "Export Data",
    description: "Download academic data",
    icon: Download,
    color: "bg-green-500",
    href: "#",
  },
  {
    title: "Import Records",
    description: "Upload bulk academic records",
    icon: Upload,
    color: "bg-orange-500",
    href: "#",
  },
  {
    title: "System Settings",
    description: "Configure academic system",
    icon: Settings,
    color: "bg-gray-500",
    href: "#",
  },
  {
    title: "Send Notice",
    description: "Broadcast academic announcement",
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
          Common tasks and shortcuts for efficient management
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
