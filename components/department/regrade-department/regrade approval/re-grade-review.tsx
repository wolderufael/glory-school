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
import ReGradeDetailPage from "./re-grade-detail-page";
import { getLocalStorage } from "@/utils/localStorage";

// Mock high school regrade requests data
const mockHighSchoolRegradeRequests: any[] = [
  {
    id: 1,
    studentId: 101,
    teachingAssignmentId: 1,
    regradeStatus: "DEPARTMENT_UNDER_REVIEW",
    regradeReason:
      "I believe there was an error in calculating my practical marks for the chemistry lab experiment.",
    practical1: 18,
    practical2: 20,
    practical3: 15,
    practical1Title: "Lab Exercise",
    practical2Title: "Project Work",
    practical3Title: "Presentation",
    totalPractical: 53,
    practicalStatus: "OK",
    theory: 28,
    theoryStatus: "OK",
    totalMark: 81,
    gradeInLetter: "B+",
    comment: "Please review my lab practical scores",
    createdAt: new Date("2024-12-15T10:00:00.000Z"),
    updatedAt: new Date("2024-12-15T10:00:00.000Z"),
    student: {
      student: {
        id: 101,
        userId: 101,
        createdAt: new Date("2024-09-01T00:00:00.000Z"),
        updatedAt: new Date("2024-09-01T00:00:00.000Z"),
      },
      user: {
        id: 101,
        firstName: "Sarah",
        lastName: "Johnson",
        role: "STUDENT" as const,
        userMainId: "GS/2024/001",
        department: "Science",
      },
    },
    teachingAssignment: {
      id: 1,
      teacherId: 1,
      sectionId: 1,
      courseId: 1,
      academicSemesterId: 1,
      academicYearId: 2024,
      level: "10",
      departmentId: 1,
      course: {
        id: 1,
        collegeId: 1,
        departmentId: 1,
        level: "10",
        courseCode: "CHEM10",
        title: "Chemistry Grade 10",
        theoryNhrs: 30,
        practicalNhrs: 40,
        cooperativeNhrs: 0,
        totalNhrs: 70,
        createdAt: "2024-09-01T00:00:00.000Z",
      },
      teacher: {
        id: 1,
        userId: 1,
        createdAt: "2024-09-01T00:00:00.000Z",
        updatedAt: "2024-09-01T00:00:00.000Z",
        user: {
          id: 1,
          firstName: "Dr. Michael",
          middleName: "",
          lastName: "Davis",
          email: "michael.davis@gloryschool.edu.et",
          phoneNumber: "0912345678",
          password: "hashedpassword",
          userType: "Teacher",
          gender: "M",
          nationality: "Ethiopian",
          userMainId: "TCH001",
        },
      },
    },
    originalGrade: {
      id: 1,
      gradeInLetter: "B",
      totalMark: 75,
      totalPractical: 47,
      theory: 28,
    },
  },
  {
    id: 2,
    studentId: 102,
    teachingAssignmentId: 2,
    regradeStatus: "DEPARTMENT_APPROVED",
    regradeReason:
      "Missing marks from final physics practical exam were not included in my total score.",
    practical1: 20,
    practical2: 18,
    practical3: 17,
    practical1Title: "Lab Exercise",
    practical2Title: "Project Work",
    practical3Title: "Presentation",
    totalPractical: 55,
    practicalStatus: "OK",
    theory: 26,
    theoryStatus: "OK",
    totalMark: 81,
    gradeInLetter: "B+",
    comment: "Final practical scores were not recorded properly",
    createdAt: new Date("2024-12-10T14:30:00.000Z"),
    updatedAt: new Date("2024-12-12T09:15:00.000Z"),
    student: {
      id: 102,
      userId: 102,
      createdAt: new Date("2024-09-01T00:00:00.000Z"),
      updatedAt: new Date("2024-09-01T00:00:00.000Z"),
      user: {
        id: 102,
        firstName: "Ahmed",
        lastName: "Ali",
        email: "ahmed.ali@student.gloryschool.edu.et",
        phoneNumber: "0913456789",
        userType: "Student",
        gender: "M",
        nationality: "Ethiopian",
        studentId: "GS/2024/002",
        department: "Science",
      },
    },
    teachingAssignment: {
      id: 2,
      teacherId: 2,
      sectionId: 2,
      courseId: 2,
      academicSemesterId: 1,
      academicYearId: 2024,
      level: "10",
      departmentId: 1,
      course: {
        id: 2,
        courseCode: "PHYS10",
        title: "Physics Grade 10",
        creditHours: 4,
      },
      teacher: {
        id: 2,
        userId: 2,
        createdAt: new Date("2024-09-01T00:00:00.000Z"),
        updatedAt: new Date("2024-09-01T00:00:00.000Z"),
        user: {
          id: 2,
          firstName: "Mrs. Emily",
          lastName: "Wilson",
          email: "emily.wilson@gloryschool.edu.et",
          phoneNumber: "0914567890",
          userType: "Teacher",
          gender: "F",
          nationality: "Ethiopian",
          userMainId: "TCH002",
        },
      },
    },
    originalGrade: {
      id: 2,
      gradeInLetter: "C+",
      totalMark: 72,
      totalPractical: 45,
      theory: 27,
    },
  },
  {
    id: 3,
    studentId: 103,
    teachingAssignmentId: 3,
    regradeStatus: "DEPARTMENT_REJECTED",
    regradeReason: "I think my mathematics exam was graded too harshly.",
    practical1: 15,
    practical2: 16,
    practical3: 14,
    practical1Title: "Problem Solving",
    practical2Title: "Group Work",
    practical3Title: "Presentation",
    totalPractical: 45,
    practicalStatus: "OK",
    theory: 22,
    theoryStatus: "OK",
    totalMark: 67,
    gradeInLetter: "C",
    comment: "Request review of theory exam grading",
    createdAt: new Date("2024-12-08T11:00:00.000Z"),
    updatedAt: new Date("2024-12-14T16:20:00.000Z"),
    student: {
      id: 103,
      userId: 103,
      createdAt: new Date("2024-09-01T00:00:00.000Z"),
      updatedAt: new Date("2024-09-01T00:00:00.000Z"),
      user: {
        id: 103,
        firstName: "Fatima",
        lastName: "Mohammed",
        email: "fatima.mohammed@student.gloryschool.edu.et",
        phoneNumber: "0915678901",
        userType: "Student",
        gender: "F",
        nationality: "Ethiopian",
        studentId: "GS/2024/003",
        department: "Science",
      },
    },
    teachingAssignment: {
      id: 3,
      teacherId: 3,
      sectionId: 1,
      courseId: 3,
      academicSemesterId: 1,
      academicYearId: 2024,
      level: "10",
      departmentId: 1,
      course: {
        id: 3,
        courseCode: "MATH10",
        title: "Mathematics Grade 10",
        creditHours: 5,
      },
      teacher: {
        id: 3,
        userId: 3,
        createdAt: new Date("2024-09-01T00:00:00.000Z"),
        updatedAt: new Date("2024-09-01T00:00:00.000Z"),
        user: {
          id: 3,
          firstName: "Mr. James",
          lastName: "Brown",
          email: "james.brown@gloryschool.edu.et",
          phoneNumber: "0916789012",
          userType: "Teacher",
          gender: "M",
          nationality: "Ethiopian",
          userMainId: "TCH003",
        },
      },
    },
    originalGrade: {
      id: 3,
      gradeInLetter: "C",
      totalMark: 67,
      totalPractical: 45,
      theory: 22,
    },
  },
];

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
  // Use mock data with frontend filtering
  const departmentId = getLocalStorage("departmentId") || 0;

  // Mock implementation replacing API hook
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [allRequests, setAllRequests] = useState<any[]>([]);

  // Mock refetch function
  const refetch = () => {
    setIsLoading(true);
    setTimeout(() => {
      setAllRequests(mockHighSchoolRegradeRequests);
      setIsLoading(false);
    }, 500);
  };

  // Initialize mock data on component mount
  useEffect(() => {
    refetch();
  }, []);

  const [filter, setFilter] = useState<ReGradeStatus>("all");
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null);
  const [showDetailPage, setShowDetailPage] = useState(false);

  // Frontend filtering
  const requests = allRequests?.filter((request: any) => {
    if (filter === "all") {
      return [
        "DEPARTMENT_UNDER_REVIEW",
        "DEPARTMENT_REJECTED",
        "REGISTRAR_UNDER_REVIEW",
      ].includes(request.regradeStatus);
    }
    return request.regradeStatus === filter;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "DEPARTMENT_UNDER_REVIEW":
        return <Clock className="h-4 w-4 text-orange-500" />;
      case "DEPARTMENT_APPROVED":
      case "REGISTRAR_UNDER_REVIEW":
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
      case "REGISTRAR_UNDER_REVIEW":
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
      case "REGISTRAR_UNDER_REVIEW":
        return "border-green-200 bg-green-50 hover:bg-green-100";
      case "DEPARTMENT_REJECTED":
        return "border-red-200 bg-red-50 hover:bg-red-100";
      default:
        return "border-gray-200 bg-gray-50 hover:bg-gray-100";
    }
  };

  const filteredRequests = allRequests?.filter((request) => {
    if (filter === "all") {
      return [
        "DEPARTMENT_UNDER_REVIEW",
        "DEPARTMENT_REJECTED",
        "REGISTRAR_UNDER_REVIEW",
      ].includes(request.regradeStatus);
    }
    if (filter === "DEPARTMENT_UNDER_REVIEW") {
      return request.regradeStatus === "DEPARTMENT_UNDER_REVIEW";
    }
    if (filter === "DEPARTMENT_APPROVED") {
      return (
        request.regradeStatus === "DEPARTMENT_APPROVED" ||
        request.regradeStatus === "REGISTRAR_UNDER_REVIEW"
      );
    }
    if (filter === "DEPARTMENT_REJECTED") {
      return request.regradeStatus === "DEPARTMENT_REJECTED";
    }
    return request.regradeStatus === filter;
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

  const getStatusCounts = () => {
    return {
      all: allRequests?.filter((r) =>
        [
          "DEPARTMENT_UNDER_REVIEW",
          "DEPARTMENT_REJECTED",
          "REGISTRAR_UNDER_REVIEW",
        ].includes(r.regradeStatus)
      ).length,
      DEPARTMENT_PENDING: allRequests?.filter(
        (r) => r.regradeStatus === "DEPARTMENT_UNDER_REVIEW"
      ).length,
      DEPARTMENT_APPROVED: allRequests?.filter(
        (r) =>
          r.regradeStatus === "DEPARTMENT_APPROVED" ||
          r.regradeStatus === "REGISTRAR_UNDER_REVIEW"
      ).length,
      DEPARTMENT_REJECTED: allRequests?.filter(
        (r) => r.regradeStatus === "DEPARTMENT_REJECTED"
      ).length,
    };
  };

  const statusCounts = getStatusCounts();

  // Handler functions for detail page
  const handleViewRequest = (request: any) => {
    setSelectedRequest(request);
    setShowDetailPage(true);
  };

  const handleCloseDetailPage = () => {
    setShowDetailPage(false);
    setSelectedRequest(null);
  };

  // Show detail page if a request is selected
  if (showDetailPage && selectedRequest) {
    return (
      <ReGradeDetailPage
        request={selectedRequest}
        onClose={handleCloseDetailPage}
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
                variant={
                  filter === "DEPARTMENT_UNDER_REVIEW" ? "default" : "outline"
                }
                size="sm"
                onClick={() => setFilter("DEPARTMENT_UNDER_REVIEW")}
                className="text-xs"
              >
                <Clock className="h-3 w-3 mr-1" />
                Pending ({statusCounts.DEPARTMENT_PENDING})
              </Button>
              <Button
                variant={
                  filter === "DEPARTMENT_APPROVED" ? "default" : "outline"
                }
                size="sm"
                onClick={() => setFilter("DEPARTMENT_APPROVED")}
                className="text-xs"
              >
                <CheckCircle className="h-3 w-3 mr-1" />
                Approved ({statusCounts.DEPARTMENT_APPROVED})
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
            Review and manage high school student re-grade requests across all
            subjects
          </p>
          {/* Mock data info */}
          <div className="mt-3 p-2 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-700">
              <strong>Mock Data:</strong> Shows sample regrade requests for
              Chemistry, Physics, and Mathematics (Grade 10)
            </p>
          </div>
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
              {filteredRequests?.map((request) => {
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

                          {request.regradeStatus === "DEPARTMENT_APPROVED" && (
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

                          {request.regradeStatus === "DEPARTMENT_REJECTED" &&
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
                          Review
                        </Button>
                        {/*                         {request.regradeStatus === "REGISTRAR_UNDER_REVIEW" && (
                          <Button
                            size="sm"
                            onClick={() => handleViewRequest(request)}
                            className="bg-purple-600 hover:bg-purple-700 text-white"
                          >
                            <FileText className="h-4 w-4 mr-2" />
                            Review
                          </Button>
                        )} */}
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
