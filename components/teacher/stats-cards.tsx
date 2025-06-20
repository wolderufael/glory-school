"use client";

import React from "react";
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
import {
  getRegistrarStats,
  getStatsComparison,
} from "@/lib/react-query/queries/getRegistrarStat";
import { useStats } from "@/lib/react-query/hooks/useStats";

const iconMap = {
  Users,
  BookOpen,
  UserCheck,
  Building,
  GraduationCap,
};

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

export function TeacherStatsCards() {
  const { data, isLoading, error } = useStats();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(5)].map((_, i) => (
          <Card key={i} className="border-blue-100 animate-pulse">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-8 w-8 bg-gray-200 rounded"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-20"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 rounded-lg bg-red-50 text-red-600">
        Error loading stats:{" "}
        {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );
  }

  if (!data || data.stats.length < 2) {
    return (
      <div className="p-4 rounded-lg bg-yellow-50 text-yellow-600">
        Insufficient data to show comparisons
      </div>
    );
  }

  const statsComparison = getStatsComparison(data);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsComparison.map((stat) => (
        <Card
          key={stat.title}
          className="border-blue-100 hover:shadow-lg transition-shadow duration-200"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">
              {stat.title}
            </CardTitle>
            <div className={`bg-${stat.color}-100 p-2 rounded-lg`}>
              {stat.iconName && (
                <div className={`h-4 w-4 text-${stat.color}-600`}>
                  {React.createElement(
                    iconMap[stat.iconName as keyof typeof iconMap]
                  )}
                </div>
              )}
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
              {stat.change} from previous year
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
