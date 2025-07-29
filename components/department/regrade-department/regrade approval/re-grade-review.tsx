"use client";

import { useState } from "react";
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
import { useRegradeRequests } from "@/lib/react-query/hooks/useRegrade";
import { RegradeAssesmentResponse } from "@/types/types";
import ReGradeDetailPage from "./re-grade-detail-page";

// Mock data in RegradeAssesmentResponse format
const mockReGradeRequests: RegradeAssesmentResponse[] = [
  {
    id: 1,
    regradeStatus: "DEPARTMENT_REQUESTED",
    regradeReason:
      "I believe there was an error in the calculation of my final grade. My assignments and exam scores should total to a B grade.",
    teachingAssignmentId: 101,
    studentId: 1001,
    practical1: 25,
    practical2: 20,
    practical3: 18,
    practical1Type: "Lab 1",
    practical2Type: "Lab 2",
    practical3Type: "Project",
    totalPractical: 63,
    practicalStatus: "OK",
    theory: 22,
    theoryStatus: "OK",
    totalMark: 85,
    gradeInLetter: "B",
    comment: "Re-grade requested for final calculation",
    originalGrade: {
      id: 3001,
      teachingAssignmentId: 101,
      studentId: 1001,
      practical1: 20,
      practical2: 18,
      practical3: 15,
      practical1Type: "Lab 1",
      practical2Type: "Lab 2",
      practical3Type: "Project",
      totalPractical: 53,
      practicalStatus: "OK",
      theory: 20,
      theoryStatus: "OK",
      totalMark: 73,
      gradeInLetter: "C+",
      comment: "Original assessment",
      createdAt: new Date("2024-01-10T00:00:00Z"),
      updatedAt: new Date("2024-01-10T00:00:00Z"),
    },
    student: {
      id: 1001,
      studentTempId: 2001,
      userId: 3001,
      placeOfBirthTown: "Addis Ababa",
      placeOfBirthZone: "Zone 1",
      placeOfBirthRegion: "Addis Ababa",
      dateOfBirth: "2000-05-15",
      addressKebele: "05",
      addressWoreda: "Woreda 10",
      addressTown: "Addis Ababa",
      addressZone: "Zone 3",
      addressRegion: "Addis Ababa",
      phoneHome: "+251911234567",
      phoneOffice: "",
      maritalStatus: "Single",
      departmentId: 1,
      programId: 101,
      admissionTypeId: 1,
      listOfSlip: "2023-SIS-001",
      registrationDate: "2023-09-01",
      profilePicture: "",
      currentStudyingYear: "2023/24",
      currentStudyingSemester: "I",
      currentStudyingLevel: "III",
      createdAt: "2023-09-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
      sectionId: 29,
    },
    user: {
      id: 3001,
      firstName: "John",
      lastName: "Doe",
      role: "STUDENT",
      department: "Computer Science",
      userMainId: "SIS/001/2023",
      studentId: "SIS/001/2023",
      userType: "STUDENT",
    },
    teachingAssignment: {
      id: 101,
      teacherId: 501,
      sectionId: 29,
      courseId: 201,
      academicSemesterId: 1,
      academicYearId: 1,
      level: "III",
      departmentId: 1,
      course: {
        id: 201,
        collegeId: 1,
        departmentId: 1,
        level: "III",
        courseCode: "COMP 2023",
        title: "Data Structures and Algorithms",
        theoryNhrs: 3,
        practicalNhrs: 2,
        cooperativeNhrs: 0,
        totalNhrs: 5,
        createdAt: "2024-01-01T00:00:00Z",
      },
      teacher: {
        id: 501,
        userId: 1501,
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-01T00:00:00Z",
        user: {
          id: 1501,
          firstName: "Dr. Jane",
          middleName: "M",
          lastName: "Smith",
          email: "jane.smith@university.edu",
          phoneNumber: "+1234567890",
          password: "hashed_password",
          userType: "TEACHER",
          gender: "Female",
          nationality: "American",
          userMainId: "EMP001",
        },
      },
    },
  },
  {
    id: 2,
    regradeStatus: "APPROVED",
    regradeReason:
      "Midterm exam was graded incorrectly, missing points for partially correct answers.",
    teachingAssignmentId: 102,
    studentId: 1002,
    practical1: 22,
    practical2: 25,
    practical3: 20,
    practical1Type: "Assignment 1",
    practical2Type: "Assignment 2",
    practical3Type: "Project",
    totalPractical: 67,
    practicalStatus: "OK",
    theory: 28,
    theoryStatus: "OK",
    totalMark: 95,
    gradeInLetter: "A",
    comment: "Grade updated after review",
    originalGrade: {
      id: 3002,
      teachingAssignmentId: 102,
      studentId: 1002,
      practical1: 20,
      practical2: 22,
      practical3: 18,
      practical1Type: "Assignment 1",
      practical2Type: "Assignment 2",
      practical3Type: "Project",
      totalPractical: 60,
      practicalStatus: "OK",
      theory: 25,
      theoryStatus: "OK",
      totalMark: 85,
      gradeInLetter: "B-",
      comment: "Original assessment",
      createdAt: new Date("2024-01-05T00:00:00Z"),
      updatedAt: new Date("2024-01-05T00:00:00Z"),
    },
    student: {
      id: 1002,
      studentTempId: 2002,
      userId: 3002,
      placeOfBirthTown: "Bahir Dar",
      placeOfBirthZone: "Zone 2",
      placeOfBirthRegion: "Amhara",
      dateOfBirth: "1999-08-22",
      addressKebele: "03",
      addressWoreda: "Woreda 05",
      addressTown: "Bahir Dar",
      addressZone: "Zone 2",
      addressRegion: "Amhara",
      phoneHome: "+251912345678",
      phoneOffice: "",
      maritalStatus: "Single",
      departmentId: 2,
      programId: 102,
      admissionTypeId: 1,
      listOfSlip: "2023-SIS-002",
      registrationDate: "2023-09-01",
      profilePicture: "",
      currentStudyingYear: "2023/24",
      currentStudyingSemester: "I",
      currentStudyingLevel: "II",
      createdAt: "2023-09-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
      sectionId: 30,
    },
    user: {
      id: 3002,
      firstName: "Sarah",
      lastName: "Johnson",
      role: "STUDENT",
      department: "Mathematics",
      userMainId: "SIS/002/2023",
      studentId: "SIS/002/2023",
      userType: "STUDENT",
    },
    teachingAssignment: {
      id: 102,
      teacherId: 502,
      sectionId: 30,
      courseId: 202,
      academicSemesterId: 1,
      academicYearId: 1,
      level: "II",
      departmentId: 2,
      course: {
        id: 202,
        collegeId: 1,
        departmentId: 2,
        level: "II",
        courseCode: "MATH 2012",
        title: "Linear Algebra",
        theoryNhrs: 3,
        practicalNhrs: 1,
        cooperativeNhrs: 0,
        totalNhrs: 4,
        createdAt: "2024-01-01T00:00:00Z",
      },
      teacher: {
        id: 502,
        userId: 1502,
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-01T00:00:00Z",
        user: {
          id: 1502,
          firstName: "Prof. Michael",
          middleName: "R",
          lastName: "Brown",
          email: "michael.brown@university.edu",
          phoneNumber: "+1234567891",
          password: "hashed_password",
          userType: "TEACHER",
          gender: "Male",
          nationality: "British",
          userMainId: "EMP002",
        },
      },
    },
  },
  {
    id: 3,
    regradeStatus: "REGISTRAR_REJECTED",
    regradeReason: "I think my lab reports were undergraded.",
    teachingAssignmentId: 103,
    studentId: 1003,
    practical1: 15,
    practical2: 12,
    practical3: 18,
    practical1Type: "Lab Report 1",
    practical2Type: "Lab Report 2",
    practical3Type: "Final Project",
    totalPractical: 45,
    practicalStatus: "OK",
    theory: 18,
    theoryStatus: "OK",
    totalMark: 63,
    gradeInLetter: "C",
    comment: "Grade confirmed after review",
    originalGrade: {
      id: 3003,
      teachingAssignmentId: 103,
      studentId: 1003,
      practical1: 15,
      practical2: 12,
      practical3: 18,
      practical1Type: "Lab Report 1",
      practical2Type: "Lab Report 2",
      practical3Type: "Final Project",
      totalPractical: 45,
      practicalStatus: "OK",
      theory: 18,
      theoryStatus: "OK",
      totalMark: 63,
      gradeInLetter: "C",
      comment: "Grade confirmed after review",
      createdAt: new Date("2024-01-05T00:00:00Z"),
      updatedAt: new Date("2024-01-05T00:00:00Z"),
    },
    student: {
      id: 1003,
      studentTempId: 2003,
      userId: 3003,
      placeOfBirthTown: "Mekelle",
      placeOfBirthZone: "Zone 4",
      placeOfBirthRegion: "Tigray",
      dateOfBirth: "2001-03-10",
      addressKebele: "07",
      addressWoreda: "Woreda 12",
      addressTown: "Mekelle",
      addressZone: "Zone 4",
      addressRegion: "Tigray",
      phoneHome: "+251913456789",
      phoneOffice: "",
      maritalStatus: "Single",
      departmentId: 3,
      programId: 103,
      admissionTypeId: 1,
      listOfSlip: "2023-SIS-003",
      registrationDate: "2023-09-01",
      profilePicture: "",
      currentStudyingYear: "2023/24",
      currentStudyingSemester: "I",
      currentStudyingLevel: "IV",
      createdAt: "2023-09-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
      sectionId: 31,
    },
    user: {
      id: 3003,
      firstName: "Michael",
      lastName: "Chen",
      role: "STUDENT",
      department: "Physics",
      userMainId: "SIS/003/2023",
      studentId: "SIS/003/2023",
      userType: "STUDENT",
    },
    teachingAssignment: {
      id: 103,
      teacherId: 503,
      sectionId: 31,
      courseId: 203,
      academicSemesterId: 1,
      academicYearId: 1,
      level: "IV",
      departmentId: 3,
      course: {
        id: 203,
        collegeId: 1,
        departmentId: 3,
        level: "IV",
        courseCode: "PHYS 2015",
        title: "Quantum Physics",
        theoryNhrs: 4,
        practicalNhrs: 2,
        cooperativeNhrs: 0,
        totalNhrs: 6,
        createdAt: "2024-01-01T00:00:00Z",
      },
      teacher: {
        id: 503,
        userId: 1503,
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-01T00:00:00Z",
        user: {
          id: 1503,
          firstName: "Dr. Alice",
          middleName: "K",
          lastName: "Davis",
          email: "alice.davis@university.edu",
          phoneNumber: "+1234567892",
          password: "hashed_password",
          userType: "TEACHER",
          gender: "Female",
          nationality: "Canadian",
          userMainId: "EMP003",
        },
      },
    },
  },
];

type ReGradeStatus =
  | "all"
  | "DEPARTMENT_REQUESTED"
  | "REGISTRAR_UNDER_REVIEW"
  | "REGISTRAR_REJECTED"
  | "APPROVED";

export default function ReGradeReview() {
  // Use mock data with frontend filtering
  const allRequests = mockReGradeRequests;
  const isLoading = false;
  const error = null;

  const [filter, setFilter] = useState<ReGradeStatus>("all");
  const [selectedRequest, setSelectedRequest] =
    useState<RegradeAssesmentResponse | null>(null);
  const [showDetailPage, setShowDetailPage] = useState(false);

  // Frontend filtering
  const requests = allRequests.filter((request: RegradeAssesmentResponse) => {
    if (filter === "all") return true;
    return request.regradeStatus === filter;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "DEPARTMENT_REQUESTED":
        return <Clock className="h-4 w-4 text-orange-500" />;
      case "APPROVED":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "REGISTRAR_REJECTED":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "DEPARTMENT_REQUESTED":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "APPROVED":
        return "bg-green-100 text-green-800 border-green-200";
      case "REGISTRAR_REJECTED":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getCardBorderColor = (status: string) => {
    switch (status) {
      case "DEPARTMENT_REQUESTED":
        return "border-orange-200 bg-orange-50 hover:bg-orange-100";
      case "APPROVED":
        return "border-green-200 bg-green-50 hover:bg-green-100";
      case "REGISTRAR_REJECTED":
        return "border-red-200 bg-red-50 hover:bg-red-100";
      default:
        return "border-gray-200 bg-gray-50 hover:bg-gray-100";
    }
  };

  const filteredRequests = mockReGradeRequests.filter((request) => {
    if (filter === "all") return true;
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
      all: mockReGradeRequests.length,
      DEPARTMENT_REQUESTED: mockReGradeRequests.filter(
        (r) => r.regradeStatus === "DEPARTMENT_REQUESTED"
      ).length,
      APPROVED: mockReGradeRequests.filter(
        (r) => r.regradeStatus === "APPROVED"
      ).length,
      REGISTRAR_REJECTED: mockReGradeRequests.filter(
        (r) => r.regradeStatus === "REGISTRAR_REJECTED"
      ).length,
    };
  };

  const statusCounts = getStatusCounts();

  // Handler functions for detail page
  const handleViewRequest = (request: RegradeAssesmentResponse) => {
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
                  filter === "DEPARTMENT_REQUESTED" ? "default" : "outline"
                }
                size="sm"
                onClick={() => setFilter("DEPARTMENT_REQUESTED")}
                className="text-xs bg-orange-600 hover:bg-orange-700"
              >
                <Clock className="h-3 w-3 mr-1" />
                Pending ({statusCounts.DEPARTMENT_REQUESTED})
              </Button>
              <Button
                variant={filter === "APPROVED" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("APPROVED")}
                className="text-xs bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="h-3 w-3 mr-1" />
                Approved ({statusCounts.APPROVED})
              </Button>
              <Button
                variant={filter === "REGISTRAR_REJECTED" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("REGISTRAR_REJECTED")}
                className="text-xs bg-red-600 hover:bg-red-700"
              >
                <XCircle className="h-3 w-3 mr-1" />
                Rejected ({statusCounts.REGISTRAR_REJECTED})
              </Button>
            </div>
          </div>
          <p className="text-purple-600 text-sm">
            Review and manage student re-grade requests across all departments
          </p>
        </CardHeader>
        <CardContent>
          {filteredRequests.length === 0 ? (
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
              {filteredRequests.map((request) => {
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
                              request.student.profilePicture ||
                              "/placeholder.svg?height=40&width=40"
                            }
                          />
                          <AvatarFallback className="bg-purple-500 text-white">
                            {request.user.firstName.charAt(0)}
                            {request.user.lastName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>

                        {/* Request Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <h4 className="font-medium text-purple-900">
                              {request.user.firstName} {request.user.lastName}
                            </h4>
                            <Badge variant="outline" className="text-xs">
                              <GraduationCap className="h-3 w-3 mr-1" />
                              {request.user.studentId}
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
                                {request.originalGrade.gradeInLetter}
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
                        {request.regradeStatus === "REGISTRAR_UNDER_REVIEW" && (
                          <Button
                            size="sm"
                            onClick={() => handleViewRequest(request)}
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
