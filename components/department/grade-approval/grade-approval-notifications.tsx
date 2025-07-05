"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bell,
  Clock,
  Eye,
  AlertCircle,
  CheckCircle,
  XCircle,
  Users,
  BookOpen,
  Calendar,
  Filter,
} from "lucide-react";
import { GradeApprovalRequest } from "./types";
import { useGradeApprovalRequests } from "@/lib/react-query/hooks/useAssessmentGroups";
import { getLocalStorage } from "@/utils/localStorage";

interface GradeApprovalNotificationsProps {
  onViewRequest: (request: GradeApprovalRequest) => void;
}

export function GradeApprovalNotifications({
  onViewRequest,
}: GradeApprovalNotificationsProps) {
  const departmentId = getLocalStorage("departmentId");

  const {
    data: requests = [],
    isLoading: loading,
    error,
  } = useGradeApprovalRequests(
    departmentId ? parseInt(departmentId.toString()) : undefined
  );
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected" | "revision_requested">("all");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-orange-500" />;
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "revision_requested":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-orange-100 text-orange-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "revision_requested":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredRequests = requests.filter((request) => {
    if (filter === "pending") return request.status === "pending";
    if (filter === "approved") return request.status === "approved";
    if (filter === "rejected") return request.status === "rejected";
    return true;
  });

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const getDeadlineStatus = (deadline?: string) => {
    if (!deadline) return null;

    const deadlineDate = new Date(deadline);
    const now = new Date();
    const hoursLeft =
      (deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (hoursLeft <= 0)
      return { status: "overdue", text: "Overdue", color: "text-red-600" };
    if (hoursLeft <= 24)
      return {
        status: "urgent",
        text: `${Math.floor(hoursLeft)}h left`,
        color: "text-orange-600",
      };
    if (hoursLeft <= 72)
      return {
        status: "soon",
        text: `${Math.floor(hoursLeft / 24)}d left`,
        color: "text-yellow-600",
      };
    return {
      status: "normal",
      text: `${Math.floor(hoursLeft / 24)}d left`,
      color: "text-green-600",
    };
  };

  if (loading) {
    return (
      <Card className="border-blue-100">
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-blue-600">Loading notifications...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-red-100">
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-4" />
            <p className="text-red-600">
              Error loading grade approval requests
            </p>
            <p className="text-sm text-gray-600 mt-2">{error.message}</p>
          </div>
        </CardContent>
      </Card>
    );    
  }

  return (
    <Card className="border-blue-100">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-blue-900 flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Grade Approval Requests
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
              className="text-xs"
            >
              All ({requests.length})
            </Button>
            <Button
              variant={filter === "pending" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("pending")}
              className="text-xs"
            >
              Pending ({requests.filter((r) => r.status === "pending").length})
            </Button>
            <Button
              variant={filter === "approved" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("approved")}
              className="text-xs"
            >
              <CheckCircle className="h-3 w-3 mr-1" />
              Approved ({requests.filter((r) => r.status === "approved").length}
              )
            </Button>
            <Button
              variant={filter === "rejected" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("rejected")}
              className="text-xs"
            >
              Rejected ({requests.filter((r) => r.status === "rejected").length}
              )
            </Button>
          </div>
          </div>
        <p className="text-blue-600 text-sm">
          Review and approve teacher-submitted grades
        </p>
      </CardHeader>
      <CardContent>
        {filteredRequests.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">No grade approval requests</p>
            <p className="text-sm">
              All caught up! Check back later for new submissions.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRequests.map((request) => {
              const deadlineInfo = getDeadlineStatus(request.deadline);

              return (
                <div
                  key={request.id}
                  className={`p-4 rounded-lg border transition-colors ${
                    request.status === "pending"
                      ? "bg-red-50 border-red-200 hover:bg-red-100"
                      : request.status === "approved"
                      ? "bg-green-50 border-green-200 hover:bg-green-100"
                      : "bg-blue-50 border-blue-100 hover:bg-blue-100"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      {/* Teacher Avatar */}
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback className="bg-blue-500 text-white">
                          {request.teacher.firstName.charAt(0)}
                          {request.teacher.lastName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>

                      {/* Request Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium text-blue-900">
                            {request.teacher.firstName}{" "}
                            {request.teacher.lastName}
                          </h4>
                          <Badge variant="outline" className="text-xs">
                            {request.teacher.employeeId}
                          </Badge>
                          <Badge
                            className={`text-xs ${getStatusColor(
                              request.status
                            )}`}
                          >
                            {getStatusIcon(request.status)}
                            <span className="ml-1 capitalize">
                              {request.status.replace("_", " ")}
                            </span>
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm mb-3">
                          <div className="flex items-center gap-2 text-blue-700">
                            <BookOpen className="h-4 w-4" />
                            <span className="font-medium">
                              {request.course.code}
                            </span>
                            <span>{request.course.name}</span>
                          </div>
                          <div className="flex items-center gap-2 text-blue-700">
                            <Users className="h-4 w-4" />
                            <span>
                              {request.section.departmentName} -{" "}
                              {request.section.name}
                            </span>
                            <span>Level {request.section.level}</span>
                          </div>
                          <div className="flex items-center gap-2 text-blue-700">
                            <Calendar className="h-4 w-4" />
                            <span>
                              AY {request.section.year} - Sem{" "}
                              {request.section.semester}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>
                            Submitted {getTimeAgo(request.submittedAt)}
                          </span>
                          <span>•</span>
                          <span>
                            {request.submittedGrades}/{request.totalStudents}{" "}
                            students graded
                          </span>
                          {deadlineInfo && (
                            <>
                              <span>•</span>
                              <span className={deadlineInfo.color}>
                                {deadlineInfo.text}
                              </span>
                            </>
                          )}
                        </div>

                        {request.message && (
                          <p className="text-sm text-gray-700 mt-2 italic">
                            "{request.message}"
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Action Button */}
                    {(request.status === "pending" && <Button
                      onClick={() => onViewRequest(request)}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      size="sm"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Review
                    </Button>)}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
