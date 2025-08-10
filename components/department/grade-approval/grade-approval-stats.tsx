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
import { useGradeApprovalLogic } from "./grade-approval-logic";

interface GradeApprovalStatsProps {}

export function GradeApprovalStatsComponent({}: GradeApprovalStatsProps) {
  const { requests = [], stats, loading, error } = useGradeApprovalLogic();

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
      value: stats?.totalRequests || 0,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "All grade submissions",
    },
    {
      title: "Pending Review",
      value: stats?.pendingRequests || 0,
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      description: "Awaiting approval",
      urgent: (stats?.pendingRequests || 0) > 5,
    },
    {
      title: "Approved",
      value: stats?.approvedRequests || 0,
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

      {/* Quick Insights */}
      {/*       <Card className="border-blue-100">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-blue-900 flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Quick Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
            <div className="space-y-2">
              <h4 className="font-medium text-blue-900">
                Processing Efficiency
              </h4>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-blue-100 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{
                      width: `${Math.min(
                        100,
                        Math.max(0, 100 - (stats.avgProcessingTime / 24) * 100)
                      )}%`,
                    }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-blue-700">
                  {Math.round(
                    Math.min(
                      100,
                      Math.max(0, 100 - (stats.avgProcessingTime / 24) * 100)
                    )
                  )}
                  %
                </span>
              </div>
              <p className="text-xs text-gray-600">
                Target: &lt;12 hours processing time
              </p>
            </div>

           
            <div className="space-y-2">
              <h4 className="font-medium text-blue-900">
                Today's Approval Rate
              </h4>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-green-100 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all"
                    style={{
                      width: `${
                        stats.approvedToday + stats.rejectedToday > 0
                          ? (stats.approvedToday /
                              (stats.approvedToday + stats.rejectedToday)) *
                            100
                          : 0
                      }%`,
                    }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-green-700">
                  {stats.approvedToday + stats.rejectedToday > 0
                    ? Math.round(
                        (stats.approvedToday /
                          (stats.approvedToday + stats.rejectedToday)) *
                          100
                      )
                    : 0}
                  %
                </span>
              </div>
              <p className="text-xs text-gray-600">
                {stats.approvedToday} approved, {stats.rejectedToday} rejected
              </p>
            </div>

       
            <div className="space-y-2">
              <h4 className="font-medium text-blue-900">Workload Status</h4>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-orange-100 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      stats.pendingRequests > 10
                        ? "bg-red-600"
                        : stats.pendingRequests > 5
                        ? "bg-orange-600"
                        : "bg-green-600"
                    }`}
                    style={{
                      width: `${Math.min(
                        100,
                        (stats.pendingRequests / 15) * 100
                      )}%`,
                    }}
                  ></div>
                </div>
                <Badge
                  className={`text-xs ${
                    stats.pendingRequests > 10
                      ? "bg-red-100 text-red-800"
                      : stats.pendingRequests > 5
                      ? "bg-orange-100 text-orange-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {stats.pendingRequests > 10
                    ? "High"
                    : stats.pendingRequests > 5
                    ? "Medium"
                    : "Low"}
                </Badge>
              </div>
              <p className="text-xs text-gray-600">
                {stats.pendingRequests} requests pending review
              </p>
            </div>
          </div>
        </CardContent>
      </Card> */}
    </div>
  );
}
