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
} from "lucide-react";

const quickActions = [
  {
    title: "Register Student",
    description: "Enroll new student in grade level",
    icon: UserPlus,
    color: "bg-blue-500",
    href: "#",
  },
  {
    title: "Create Class Section",
    description: "Add new class section for grade",
    icon: BookOpen,
    color: "bg-indigo-500",
    href: "#",
  },
  {
    title: "Manage Schedule",
    description: "Update class timetables",
    icon: Calendar,
    color: "bg-purple-500",
    href: "#",
  },
  {
    title: "Grade Reports",
    description: "Generate student report cards",
    icon: FileText,
    color: "bg-cyan-500",
    href: "#",
  },
  {
    title: "Export Records",
    description: "Download student transcripts",
    icon: Download,
    color: "bg-green-500",
    href: "#",
  },
  {
    title: "Import Students",
    description: "Bulk upload student data",
    icon: Upload,
    color: "bg-orange-500",
    href: "#",
  },
  {
    title: "Academic Year",
    description: "Configure semester settings",
    icon: Settings,
    color: "bg-gray-500",
    href: "#",
  },
  {
    title: "Parent Notice",
    description: "Send announcements to parents",
    icon: Mail,
    color: "bg-rose-500",
    href: "#",
  },
];

export function RegistrarQuickActions() {
  return (
    <Card className="border-blue-100">
      <CardHeader className="px-4 py-4 sm:px-6 sm:py-6">
        <CardTitle className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-900 flex items-center gap-2">
          Quick Actions
        </CardTitle>
        <p className="text-blue-600 text-xs sm:text-sm lg:text-base">
          Common tasks and shortcuts for efficient management
        </p>
      </CardHeader>
      <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {quickActions.map((action) => (
            <Button
              key={action.title}
              variant="outline"
              className="h-auto flex-col p-3 sm:p-4 lg:p-5 border-blue-200 hover:bg-blue-50 hover:border-blue-300 group transition-all duration-200 min-h-[100px] sm:min-h-[120px] lg:min-h-[140px]"
              asChild
            >
              <a href={action.href}>
                <div
                  className={`${action.color} p-2 sm:p-3 lg:p-4 rounded-lg mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-200`}
                >
                  <action.icon className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-white" />
                </div>
                <div className="text-center w-full">
                  <div className="font-medium text-blue-900 text-xs sm:text-sm lg:text-base mb-1 leading-tight">
                    {action.title}
                  </div>
                  <div className="text-[10px] sm:text-xs lg:text-sm text-blue-600 leading-tight px-1">
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
