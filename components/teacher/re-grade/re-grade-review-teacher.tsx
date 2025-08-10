"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  RefreshCw,
  Clock,
  Eye,
  AlertCircle,
  CheckCircle,
  XCircle,
  Users,
  BookOpen,
  Calendar,
  Filter,
  FileText,
  GraduationCap,
} from "lucide-react";
import { RegradeAssesmentResponse } from "@/types/types";
import ReGradeDetailPage from "./re-grade-detail-page-teacher";
import ReGrade from "./re-grade";
import { getLocalStorage } from "@/utils/localStorage";

// Mock data for high school re-grade requests
const mockHighSchoolRegradeRequests = [
  {
    id: 1,
    student: {
      id: 1,
      user: {
        firstName: "Sarah",
        lastName: "Johnson",
        userMainId: "GS/001/2024",
        studentId: "GS/001/2024",
        department: "Science",
      },
    },
    teachingAssignment: {
      course: {
        courseCode: "MATH-10A",
        title: "Mathematics Grade 10",
      },
      departmentId: "Mathematics",
      sectionId: "10-A",
      level: "10",
      academicYearId: "2024/25",
      academicSemesterId: "First Semester",
      teacher: {
        user: {
          firstName: "John",
          lastName: "Smith",
          userMainId: "TEA001",
        },
      },
    },
    regradeStatus: "REGRADE_REQUESTED",
    originalGrade: {
      gradeInLetter: "C",
      totalMark: 65,
      totalPractical: 40,
      theory: 25,
    },
    gradeInLetter: "B",
    totalMark: 75,
    totalPractical: 45,
    theory: 30,
    practical1: 15,
    practical2: 15,
    practical3: 15,
    regradeReason:
      "I believe there was an error in calculating my practical marks. The total should be higher.",
    comment: "Student performed well in lab sessions",
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: 2,
    student: {
      id: 2,
      user: {
        firstName: "Michael",
        lastName: "Brown",
        userMainId: "GS/002/2024",
        studentId: "GS/002/2024",
        department: "Science",
      },
    },
    teachingAssignment: {
      course: {
        courseCode: "PHYS-11B",
        title: "Physics Grade 11",
      },
      departmentId: "Science",
      sectionId: "11-B",
      level: "11",
      academicYearId: "2024/25",
      academicSemesterId: "First Semester",
      teacher: {
        user: {
          firstName: "Dr. Emily",
          lastName: "Davis",
          userMainId: "TEA002",
        },
      },
    },
    regradeStatus: "DEPARTMENT_UNDER_REVIEW",
    originalGrade: {
      gradeInLetter: "D",
      totalMark: 55,
      totalPractical: 30,
      theory: 25,
    },
    gradeInLetter: "C",
    totalMark: 70,
    totalPractical: 45,
    theory: 25,
    practical1: 18,
    practical2: 15,
    practical3: 12,
    regradeReason:
      "My lab report grades seem to be missing from the final calculation.",
    comment: "Needs more focus on theory concepts",
    createdAt: "2024-01-10T14:20:00Z",
  },
  {
    id: 3,
    student: {
      id: 3,
      user: {
        firstName: "Emily",
        lastName: "Wilson",
        userMainId: "GS/003/2024",
        studentId: "GS/003/2024",
        department: "English",
      },
    },
    teachingAssignment: {
      course: {
        courseCode: "ENG-12A",
        title: "English Literature Grade 12",
      },
      departmentId: "English",
      sectionId: "12-A",
      level: "12",
      academicYearId: "2024/25",
      academicSemesterId: "First Semester",
      teacher: {
        user: {
          firstName: "Ms. Anna",
          lastName: "Thompson",
          userMainId: "TEA003",
        },
      },
    },
    regradeStatus: "DEPARTMENT_APPROVED",
    originalGrade: {
      gradeInLetter: "B-",
      totalMark: 78,
      totalPractical: 50,
      theory: 28,
    },
    gradeInLetter: "B+",
    totalMark: 85,
    totalPractical: 55,
    theory: 30,
    practical1: 20,
    practical2: 18,
    practical3: 17,
    regradeReason:
      "I think my essay analysis was undergraded. I provided detailed literary analysis.",
    comment: "Excellent analytical skills",
    createdAt: "2024-01-08T09:15:00Z",
  },
];

// Mock hook to replace useTeacherRegradeRequests
const useMockTeacherRegradeRequests = (teacherId: number) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  const refetch = () => {
    setIsLoading(true);
    setTimeout(() => {
      setData(mockHighSchoolRegradeRequests);
      setIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    refetch();
  }, [teacherId]);

  return {
    data,
    isLoading,
    error: null,
    refetch,
  };
};

type ReGradeStatus =
  | "all"
  | "REGRADE_REQUESTED"
  | "DEPARTMENT_UNDER_REVIEW"
  | "DEPARTMENT_APPROVED"
  | "DEPARTMENT_REJECTED"
  | "REGISTRAR_UNDER_REVIEW"
  | "REGISTRAR_REJECTED"
  | "APPROVED";

export default function ReGradeReview() {
  const teacherId = getLocalStorage("teacherId") || 0;
  const {
    data: allRequests,
    isLoading,
    error,
    refetch,
  } = useMockTeacherRegradeRequests(Number(teacherId));

  const [filter, setFilter] = useState<ReGradeStatus>("all");
  const [selectedRequest, setSelectedRequest] =
    useState<RegradeAssesmentResponse | null>(null);
  const [showDetailPage, setShowDetailPage] = useState(false);
  const [showAssessment, setShowAssessment] = useState(false);

  // Frontend filtering
  const filteredRequests = allRequests?.filter(
    (request: RegradeAssesmentResponse) => {
      if (filter === "all") return true;
      return request.regradeStatus === filter;
    }
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "DEPARTMENT_UNDER_REVIEW":
        return <Clock className="h-4 w-4 text-orange-500" />;
      case "DEPARTMENT_APPROVED":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "DEPARTMENT_REJECTED":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "DEPARTMENT_UNDER_REVIEW":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "DEPARTMENT_APPROVED":
        return "bg-green-100 text-green-800 border-green-200";
      case "DEPARTMENT_REJECTED":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getCardBorderColor = (status: string) => {
    switch (status) {
      case "DEPARTMENT_UNDER_REVIEW":
        return "border-orange-200 bg-orange-50 hover:bg-orange-100";
      case "DEPARTMENT_APPROVED":
        return "border-green-200 bg-green-50 hover:bg-green-100";
      case "DEPARTMENT_REJECTED":
        return "border-red-200 bg-red-50 hover:bg-red-100";
      default:
        return "border-gray-200 bg-gray-50 hover:bg-gray-100";
    }
  };

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

  const getStatusCounts = () => {
    return {
      all: allRequests?.length,
      REGRADE_REQUESTED: allRequests?.filter(
        (r: any) => r.regradeStatus === "REGRADE_REQUESTED"
      ).length,
      DEPARTMENT_UNDER_REVIEW: allRequests?.filter(
        (r: any) => r.regradeStatus === "DEPARTMENT_UNDER_REVIEW"
      ).length,
      DEPARTMENT_APPROVED: allRequests?.filter(
        (r: any) => r.regradeStatus === "DEPARTMENT_APPROVED"
      ).length,
      DEPARTMENT_REJECTED: allRequests?.filter(
        (r: any) => r.regradeStatus === "DEPARTMENT_REJECTED"
      ).length,
    };
  };

  const statusCounts = getStatusCounts();

  // Handler functions for detail page
  const handleReGradeRequest = (request: RegradeAssesmentResponse) => {
    setSelectedRequest(request);
    setShowAssessment(true);
  };
  const handleViewRequest = (request: RegradeAssesmentResponse) => {
    setSelectedRequest(request);
    setShowDetailPage(true);
  };

  const handleCloseDetailPage = () => {
    setShowDetailPage(false);
    setSelectedRequest(null);
  };
  const handleCloseAssessment = () => {
    setShowAssessment(false);
    setSelectedRequest(null);
  };

  // Show detail page if a request is selected
  if (showDetailPage && selectedRequest) {
    return (
      <ReGradeDetailPage
        request={selectedRequest}
        onClose={handleCloseDetailPage}
        loading={false}
      />
    );
  }
  if (showAssessment && selectedRequest) {
    return (
      <ReGrade
        request={selectedRequest}
        onClose={handleCloseAssessment}
        loading={false}
        onSuccess={() => refetch()}
      />
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-purple-100">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-purple-900 flex items-center gap-2">
              <RefreshCw className="h-5 w-5" />
              Re-Grade Review Dashboard
            </CardTitle>
            <div className="flex items-center gap-2 flex-wrap">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("all")}
                className="text-xs"
              >
                All ({statusCounts.all})
              </Button>
              <Button
                variant={filter === "REGRADE_REQUESTED" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("REGRADE_REQUESTED")}
                className="text-xs"
              >
                <Clock className="h-3 w-3 mr-1" />
                Pending ({statusCounts.REGRADE_REQUESTED})
              </Button>
              <Button
                variant={
                  filter === "DEPARTMENT_UNDER_REVIEW" ? "default" : "outline"
                }
                size="sm"
                onClick={() => setFilter("DEPARTMENT_UNDER_REVIEW")}
                className="text-xs"
              >
                <CheckCircle className="h-3 w-3 mr-1" />
                Approved ({statusCounts.DEPARTMENT_UNDER_REVIEW})
              </Button>
              <Button
                variant={
                  filter === "DEPARTMENT_REJECTED" ? "default" : "outline"
                }
                size="sm"
                onClick={() => setFilter("DEPARTMENT_REJECTED")}
                className="text-xs"
              >
                <XCircle className="h-3 w-3 mr-1" />
                Rejected ({statusCounts.DEPARTMENT_REJECTED})
              </Button>
            </div>
          </div>
          <p className="text-purple-600 text-sm">
            Review and manage student re-grade requests across all departments
          </p>
        </CardHeader>
        <CardContent>
          {filteredRequests?.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <RefreshCw className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">No re-grade requests found</p>
              <p className="text-sm">
                {filter === "all"
                  ? "No re-grade requests have been submitted yet."
                  : `No ${filter
                      .toLowerCase()
                      .replace("_", " ")} re-grade requests found.`}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredRequests?.map((request: any) => {
                //const deadlineInfo = getDeadlineStatus(request.deadline);

                return (
                  <div
                    key={request.id}
                    className={`p-4 rounded-lg border transition-all duration-200 ${getCardBorderColor(
                      request.regradeStatus
                    )}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        {/* Student Avatar */}
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={
                              //request.student.student.profilePicture ||
                              "/placeholder.svg?height=40&width=40"
                            }
                          />
                          <AvatarFallback className="bg-purple-500 text-white">
                            {request.student.user.firstName.charAt(0)}
                            {request.student.user.lastName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>

                        {/* Request Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <h4 className="font-medium text-purple-900">
                              {request.student.user.firstName}{" "}
                              {request.student.user.lastName}
                            </h4>
                            <Badge variant="outline" className="text-xs">
                              <GraduationCap className="h-3 w-3 mr-1" />
                              {request.student.user.studentId}
                            </Badge>
                            <Badge
                              className={`text-xs border ${getStatusColor(
                                request.regradeStatus
                              )}`}
                            >
                              {getStatusIcon(request.regradeStatus)}
                              <span className="ml-1">
                                {request.regradeStatus.replace("_", " ")}
                              </span>
                            </Badge>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm mb-3">
                            <div className="flex items-center gap-2 text-purple-700">
                              <BookOpen className="h-4 w-4" />
                              <span className="font-medium">
                                {request.teachingAssignment.course.courseCode}
                              </span>
                              <span className="truncate">
                                {request.teachingAssignment.course.title}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-purple-700">
                              <Users className="h-4 w-4" />
                              <span>
                                {request.teachingAssignment.departmentId} - Sec{" "}
                                {request.teachingAssignment.sectionId}
                              </span>
                              <span>
                                Level {request.teachingAssignment.level}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-purple-700">
                              <Calendar className="h-4 w-4" />
                              <span>
                                AY {request.teachingAssignment.academicYearId} -
                                Sem{" "}
                                {request.teachingAssignment.academicSemesterId}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                            <span>
                              Submitted {/* {getTimeAgo(request.createdAt)} */}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              Grade Change:
                              <Badge variant="outline" className="mx-1 text-xs">
                                {request.originalGrade?.gradeInLetter}
                              </Badge>
                              →
                              <Badge variant="outline" className="mx-1 text-xs">
                                {request.gradeInLetter}
                              </Badge>
                            </span>
                            {/*   {deadlineInfo &&
                              request.regradeStatus === "APPROVAL_REQUESTED" && (
                                <>
                                  <span>•</span>
                                  <span className={deadlineInfo.color}>
                                    {deadlineInfo.text}
                                  </span>
                                </>
                              )} */}
                          </div>

                          <div className="text-sm text-gray-700 mb-2">
                            <span className="font-medium">Teacher: </span>
                            {
                              request.teachingAssignment.teacher.user.firstName
                            }{" "}
                            {request.teachingAssignment.teacher.user.lastName} (
                            {request.teachingAssignment.teacher.user.userMainId}
                            )
                          </div>

                          {request.regradeReason && (
                            <div className="bg-white/70 p-3 rounded border-l-4 border-purple-300 mb-2">
                              <p className="text-sm text-gray-700">
                                <span className="font-medium">
                                  Student's Reason:{" "}
                                </span>
                                "{request.regradeReason}"
                              </p>
                            </div>
                          )}

                          {request.regradeStatus === "APPROVED" && (
                            <div className="bg-green-50 p-3 rounded border-l-4 border-green-300">
                              <p className="text-sm text-green-700">
                                <span className="font-medium">
                                  Approved by:{" "}
                                </span>
                                {/*                                   {request.approvedBy} on{" "}
                                  {new Date(
                                    request.approvedAt!
                                  ).toLocaleDateString()} */}
                              </p>
                            </div>
                          )}

                          {request.regradeStatus === "REGISTRAR_REJECTED" &&
                            request.regradeReason && (
                              <div className="bg-red-50 p-3 rounded border-l-4 border-red-300">
                                <p className="text-sm text-red-700 mb-1">
                                  <span className="font-medium">
                                    Rejected by:{" "}
                                  </span>
                                  {/*     {request.rejectedBy} on{" "}
                                  {new Date(
                                    request.rejectedAt!
                                  ).toLocaleDateString()} */}
                                </p>
                                <p className="text-sm text-red-600">
                                  <span className="font-medium">Reason: </span>"
                                  {request.regradeReason}"
                                </p>
                              </div>
                            )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewRequest(request)}
                          className="text-purple-600 border-purple-300 hover:bg-purple-50"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        {request.regradeStatus === "REGRADE_REQUESTED" && (
                          <Button
                            size="sm"
                            onClick={() => handleReGradeRequest(request)}
                            className="bg-purple-600 hover:bg-purple-700 text-white"
                          >
                            <FileText className="h-4 w-4 mr-2" />
                            Review
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
