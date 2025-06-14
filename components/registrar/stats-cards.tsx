import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  BookOpen,
  UserCheck,
  GraduationCap,
  Building,
  Calendar,
  FileText,
  TrendingUp,
} from "lucide-react";

const statsData = [
  {
    title: "Total Students",
    value: "2,847",
    change: "+12%",
    changeType: "positive" as const,
    icon: Users,
    color: "blue",
  },
  {
    title: "Active Courses",
    value: "156",
    change: "+8%",
    changeType: "positive" as const,
    icon: BookOpen,
    color: "indigo",
  },
  {
    title: "Faculty Members",
    value: "89",
    change: "+2%",
    changeType: "positive" as const,
    icon: UserCheck,
    color: "purple",
  },
  {
    title: "Departments",
    value: "12",
    change: "0%",
    changeType: "neutral" as const,
    icon: Building,
    color: "cyan",
  },
  {
    title: "Graduates (This Year)",
    value: "324",
    change: "+15%",
    changeType: "positive" as const,
    icon: GraduationCap,
    color: "blue",
  },
  {
    title: "Academic Sessions",
    value: "42",
    change: "+5%",
    changeType: "positive" as const,
    icon: Calendar,
    color: "indigo",
  },
  {
    title: "Pending Applications",
    value: "127",
    change: "-8%",
    changeType: "negative" as const,
    icon: FileText,
    color: "orange",
  },
  {
    title: "System Usage",
    value: "94%",
    change: "+3%",
    changeType: "positive" as const,
    icon: TrendingUp,
    color: "green",
  },
];

const colorClasses = {
  blue: "bg-blue-500",
  indigo: "bg-indigo-500",
  purple: "bg-purple-500",
  cyan: "bg-cyan-500",
  orange: "bg-orange-500",
  green: "bg-green-500",
};

export function RegistrarStatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((stat) => (
        <Card
          key={stat.title}
          className="border-blue-100 hover:shadow-lg transition-shadow duration-200"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">
              {stat.title}
            </CardTitle>
            <div
              className={`${
                colorClasses[stat.color as keyof typeof colorClasses]
              } p-2 rounded-lg`}
            >
              <stat.icon className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{stat.value}</div>
            <p
              className={`text-xs ${
                stat.changeType === "positive"
                  ? "text-green-600"
                  : stat.changeType === "negative"
                  ? "text-red-600"
                  : "text-gray-600"
              }`}
            >
              {stat.change} from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
