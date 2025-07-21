"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
  BarChart3,
  TrendingUp,
  Users,
} from "lucide-react";
import { GradeApprovalStats } from "./types";
import { useAllAssessmentGroups, useGradeApprovalRequests } from "@/lib/react-query/hooks/useAssessmentGroups";
import { getLocalStorage } from "@/utils/localStorage";

interface GradeApprovalStatsProps {}

export function GradeApprovalStatsComponent({}: GradeApprovalStatsProps) {

  const {
    data: requests = [],
    isLoading: loading,
    error,
  } = useAllAssessmentGroups();

  console.log("requests 123", requests);

  // Calculate stats from the actual data
  const stats = {
      totalRequests: requests.length,
      pendingRequests: requests.filter((r) => r.status === "registrar_pending").length,
      approvedRequests: requests.filter((r) => r.status === "registrar_approved").length,
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className="border-blue-100">
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-blue-100 rounded mb-2"></div>
                <div className="h-8 bg-blue-200 rounded mb-2"></div>
                <div className="h-3 bg-blue-100 rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-red-100">
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-600">Error loading statistics</p>
            <p className="text-sm text-gray-600 mt-2">{error.message}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const statCards = [
    {
      title: "Total Requests",
      value: stats.totalRequests,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "All grade submissions",
    },
    {
      title: "Pending Review",
      value: stats.pendingRequests,
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      description: "Awaiting approval",
      urgent: stats.pendingRequests > 5,
    },
    {
      title: "Approved",
      value: stats.approvedRequests,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "Successfully processed",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat) => (
          <Card
            key={stat.title}
            className="border-blue-100 hover:shadow-md transition-shadow"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                {stat.urgent && (
                  <Badge variant="destructive" className="text-xs">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    High
                  </Badge>
                )}
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-blue-900">{stat.value}</p>
                <p className="text-sm font-medium text-blue-700">
                  {stat.title}
                </p>
                <p className="text-xs text-gray-600">{stat.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

    </div>
  );
}
