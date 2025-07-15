"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  BarChart3,
  Users,
  BookOpen,
  Calendar,
  MessageSquare,
  ArrowLeft,
} from "lucide-react";
import {
  GradeApprovalRequest,
  ApprovalDecision,
  GradeDistribution,
} from "@/components/department/grade-approval/types";
import { useByteachingAssessment } from "@/lib/react-query/hooks/useByteachingAssessment";
import { useUpdateAssessmentGroupStatus } from "@/lib/react-query/mutations/useUpdateAssessmentGroupStatus";
import { getLocalStorage } from "@/utils/localStorage";

interface GradeReviewPageProps {
  request: GradeApprovalRequest | null;
  //onDecision: (decision: ApprovalDecision) => void;
  onClose: () => void;
  loading?: boolean;
}

export default function GradeReviewPage({
  request,
  /*   onDecision, */
  onClose,
  loading = false,
}: GradeReviewPageProps) {
  const [decision, setDecision] = useState<
    "approve" | "reject" | "request_revision"
  >("approve");
  const [feedback, setFeedback] = useState("");
  const [reason, setReason] = useState("");

  // Extract teaching assignment ID from the request
  const teachingAssignmentId = request?.teachingAssignmentId ?? null;

  // Fetch real student assessment data
  const {
    data: studentAssessments = [],
    isLoading: isLoadingStudents,
    error: studentsError,
  } = useByteachingAssessment(teachingAssignmentId ?? 0);
    const departmentId = getLocalStorage("departmentId");

  // Mutation for updating assessment group status
  const updateStatusMutation = useUpdateAssessmentGroupStatus();

  const handleSubmitDecision = () => {
    if (!request) return;

    updateStatusMutation.mutate({
      id: parseInt(request.id, 10),
      departmentId: Number(departmentId),
      status: decision === "approve" ? "APPROVED" : "REJECTED",
      reason: reason || undefined,
    });
    resetForm();
    onClose();
  };

  const calculateGradeDistribution = (): GradeDistribution[] => {
    if (!studentAssessments || studentAssessments.length === 0) return [];

    const gradeCount: Record<string, number> = {};
    studentAssessments.forEach((assessment: any) => {
      const grade = assessment.gradeInLetter || "F";
      gradeCount[grade] = (gradeCount[grade] || 0) + 1;
    });

    const total = studentAssessments.length;
    return Object.entries(gradeCount)
      .map(([grade, count]) => ({
        grade,
        count,
        percentage: Math.round((count / total) * 100),
      }))
      .sort((a, b) => b.count - a.count);
  };

  const getGradeStats = () => {
    if (!request) return { pass: 0, fail: 0, incomplete: 0 };

    return request.grades.reduce(
      (stats, grade) => {
        stats[grade.status]++;
        return stats;
      },
      { pass: 0, fail: 0, incomplete: 0 }
    );
  };

  const resetForm = () => {
    setDecision("approve");
    setFeedback("");
    setReason("");
  };

  const handleBack = () => {
    resetForm();
    onClose();
  };

  if (!request) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No Request Found
            </h2>
            <p className="text-gray-600 mb-4">
              The grade review request could not be found.
            </p>
            <Button onClick={handleBack} variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const gradeDistribution = calculateGradeDistribution();
  const gradeStats = getGradeStats();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={handleBack}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Grade Approval
              </Button>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-xl font-semibold text-gray-900">
                Grade Review - {request.course.code}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="space-y-6">
          {/* Request Summary */}
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900 flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Request Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Teacher</p>
                  <p className="font-medium text-blue-900">
                    {request.teacher.firstName} {request.teacher.lastName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {request.teacher.employeeId}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Course</p>
                  <p className="font-medium text-blue-900">
                    {request.course.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {request.course.code} • {request.course.creditHours} credits
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Section</p>
                  <p className="font-medium text-blue-900">
                    {request.section.departmentName} - {request.section.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    Level {request.section.level}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Academic Period</p>
                  <p className="font-medium text-blue-900">
                    AY {request.section.year}
                  </p>
                  <p className="text-xs text-gray-500">
                    Semester {request.section.semester}
                  </p>
                </div>
              </div>

              {request.message && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-start gap-2">
                    <MessageSquare className="h-4 w-4 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-900">
                        Teacher's Message
                      </p>
                      <p className="text-sm text-blue-700 mt-1">
                        {request.message}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Student Grades Table */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Student Grades</span>
                </div>
                <div className="flex items-center space-x-2 text-white/90">
                  <BarChart3 className="w-4 h-4" />
                  <span className="text-sm">
                    {studentAssessments.length} Students
                  </span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-96 overflow-y-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200 sticky top-0">
                    <tr>
                      <th className="font-semibold text-gray-700 py-4 px-4 text-left">
                        Student ID
                      </th>
                      <th className="font-semibold text-gray-700 py-4 px-4 text-left">
                        Full Name
                      </th>
                      <th className="font-semibold text-gray-700 py-4 px-4 text-center">
                        Practical 1
                      </th>
                      <th className="font-semibold text-gray-700 py-4 px-4 text-center">
                        Practical 2
                      </th>
                      <th className="font-semibold text-gray-700 py-4 px-4 text-center">
                        Practical 3
                      </th>
                      <th className="font-semibold text-gray-700 py-4 px-4 text-center bg-blue-50">
                        Total Practical
                      </th>
                      <th className="font-semibold text-gray-700 py-4 px-4 text-center">
                        Theory
                      </th>
                      <th className="font-semibold text-gray-700 py-4 px-4 text-center bg-indigo-50">
                        Total Mark
                      </th>
                      <th className="font-semibold text-gray-700 py-4 px-4 text-center">
                        Grade
                      </th>
                      <th className="font-semibold text-gray-700 py-4 px-4 text-center">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoadingStudents ? (
                      <tr>
                        <td colSpan={10} className="text-center py-8">
                          <div className="flex items-center justify-center space-x-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                            <span className="text-blue-600">
                              Loading student data...
                            </span>
                          </div>
                        </td>
                      </tr>
                    ) : studentsError ? (
                      <tr>
                        <td
                          colSpan={10}
                          className="text-center py-8 text-red-600"
                        >
                          Error loading student data: {studentsError.message}
                        </td>
                      </tr>
                    ) : studentAssessments.length === 0 ? (
                      <tr>
                        <td
                          colSpan={10}
                          className="text-center py-8 text-gray-500"
                        >
                          No student assessment data found
                        </td>
                      </tr>
                    ) : (
                      studentAssessments.map(
                        (assessment: any, index: number) => {
                          const getGradeColor = (gradeValue: string) => {
                            switch (gradeValue) {
                              case "A":
                              case "A+":
                              case "A-":
                                return "text-emerald-600 bg-emerald-50 border border-emerald-200";
                              case "B":
                              case "B+":
                              case "B-":
                                return "text-blue-600 bg-blue-50 border border-blue-200";
                              case "C":
                              case "C+":
                              case "C-":
                                return "text-amber-600 bg-amber-50 border border-amber-200";
                              case "F":
                                return "text-red-600 bg-red-50 border border-red-200";
                              default:
                                return "text-gray-600 bg-gray-50 border border-gray-200";
                            }
                          };

                          // Get data from real student assessment
                          const student = assessment.student;
                          const practical1 = assessment.practical1 || 0;
                          const practical2 = assessment.practical2 || 0;
                          const practical3 = assessment.practical3 || 0;
                          const totalPractical =
                            practical1 + practical2 + practical3;
                          const theory = assessment.theory || 0;
                          const totalMark = totalPractical + theory;
                          const grade = assessment.gradeInLetter || "F";

                          const fullName = student?.user?.firstName
                            ? `${student.user.firstName} ${
                                student.user.middleName ?? ""
                              } ${student.user.lastName ?? ""}`.trim()
                            : "Unknown Student";

                          return (
                            <tr
                              key={student?.id || index}
                              className={`hover:bg-blue-50/50 transition-colors duration-200 ${
                                index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                              }`}
                            >
                              <td className="font-medium text-gray-900 py-4 px-4">
                                <div className="flex items-center space-x-2">
                                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                  <span>
                                    {student?.user?.userMainId ||
                                      `ST${student?.id || index}`}
                                  </span>
                                </div>
                              </td>
                              <td className="font-medium text-gray-900 py-4 px-4">
                                {fullName}
                              </td>
                              <td className="text-center py-4 px-4">
                                <div className="bg-gray-50 border border-gray-200 rounded-md px-3 py-1 text-sm font-medium text-gray-700">
                                  {practical1}
                                </div>
                              </td>
                              <td className="text-center py-4 px-4">
                                <div className="bg-gray-50 border border-gray-200 rounded-md px-3 py-1 text-sm font-medium text-gray-700">
                                  {practical2}
                                </div>
                              </td>
                              <td className="text-center py-4 px-4">
                                <div className="bg-gray-50 border border-gray-200 rounded-md px-3 py-1 text-sm font-medium text-gray-700">
                                  {practical3}
                                </div>
                              </td>
                              <td className="text-center py-4 px-4 bg-blue-50/50">
                                <span className="font-bold text-blue-700 text-lg">
                                  {totalPractical}
                                </span>
                              </td>
                              <td className="text-center py-4 px-4">
                                <div className="bg-gray-50 border border-gray-200 rounded-md px-3 py-1 text-sm font-medium text-gray-700">
                                  {theory}
                                </div>
                              </td>
                              <td className="text-center py-4 px-4 bg-indigo-50/50">
                                <span className="font-bold text-indigo-700 text-lg">
                                  {totalMark}
                                </span>
                              </td>
                              <td className="text-center py-4 px-4">
                                <span
                                  className={`px-3 py-1 rounded-full text-sm font-bold ${getGradeColor(
                                    grade
                                  )}`}
                                >
                                  {grade}
                                </span>
                              </td>
                              <td className="text-center py-4 px-4">
                                <Badge
                                  className={`text-xs ${
                                    totalMark >= 50
                                      ? "bg-green-100 text-green-800"
                                      : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {totalMark >= 50 ? "Pass" : "Fail"}
                                </Badge>
                              </td>
                            </tr>
                          );
                        }
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Grade Statistics */}
          <Card className="border-green-100">
            <CardHeader>
              <CardTitle className="text-lg text-green-900 flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Grade Distribution Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {(() => {
                  const gradeStats: Record<string, number> = {};
                  const allGrades = [
                    "A+",
                    "A",
                    "A-",
                    "B+",
                    "B",
                    "B-",
                    "C+",
                    "C",
                    "C-",
                    "F",
                  ];

                  // Initialize all grades with 0
                  allGrades.forEach((grade) => {
                    gradeStats[grade] = 0;
                  });

                  // Count actual grades from student assessments
                  studentAssessments.forEach((assessment: any) => {
                    const grade = assessment.gradeInLetter || "F";
                    if (gradeStats.hasOwnProperty(grade)) {
                      gradeStats[grade]++;
                    }
                  });

                  const getGradeColor = (grade: string) => {
                    switch (grade) {
                      case "A+":
                      case "A":
                      case "A-":
                        return "bg-emerald-100 text-emerald-800 border-emerald-200";
                      case "B+":
                      case "B":
                      case "B-":
                        return "bg-blue-100 text-blue-800 border-blue-200";
                      case "C+":
                      case "C":
                      case "C-":
                        return "bg-amber-100 text-amber-800 border-amber-200";
                      case "F":
                        return "bg-red-100 text-red-800 border-red-200";
                      default:
                        return "bg-gray-100 text-gray-800 border-gray-200";
                    }
                  };

                  return allGrades.map((grade) => (
                    <div
                      key={grade}
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium ${getGradeColor(
                        grade
                      )}`}
                    >
                      <span className="font-bold">{gradeStats[grade]}</span>
                      <span>{grade}</span>
                      <span className="text-xs opacity-75">
                        (
                        {studentAssessments.length > 0
                          ? `${Math.round(
                              (gradeStats[grade] / studentAssessments.length) *
                                100
                            )}%`
                          : "0%"}
                        )
                      </span>
                    </div>
                  ));
                })()}
              </div>

              {/* Summary Stats */}
              <div className="mt-4 flex flex-wrap gap-4 pt-3 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">
                    A Grades:{" "}
                    <span className="font-bold text-emerald-600">
                      {
                        studentAssessments.filter((a: any) =>
                          ["A+", "A", "A-"].includes(a.gradeInLetter || "F")
                        ).length
                      }
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">
                    B Grades:{" "}
                    <span className="font-bold text-blue-600">
                      {
                        studentAssessments.filter((a: any) =>
                          ["B+", "B", "B-"].includes(a.gradeInLetter || "F")
                        ).length
                      }
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">
                    F Grades:{" "}
                    <span className="font-bold text-red-600">
                      {
                        studentAssessments.filter(
                          (a: any) => a.gradeInLetter === "F"
                        ).length
                      }
                    </span>
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Decision Form */}
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900">
                Review Decision
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="decision" className="text-blue-900 font-medium">
                  Decision
                </Label>
                <Select
                  value={decision}
                  onValueChange={(value: any) => setDecision(value)}
                >
                  <SelectTrigger className="border-blue-200 focus:border-blue-400">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="approve">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Approve Grades
                      </div>
                    </SelectItem>
                    <SelectItem value="reject">
                      <div className="flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-red-600" />
                        Reject Submission
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {decision === "reject" && (
                <div>
                  <Label htmlFor="reason" className="text-blue-900 font-medium">
                    Reason{" "}
                    {decision === "reject" ? "for Rejection" : "for Revision"}
                  </Label>
                  <Textarea
                    id="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder={`Please provide a reason for ${
                      decision === "reject"
                        ? "rejecting"
                        : "requesting revision of"
                    } these grades...`}
                    className="border-blue-200 focus:border-blue-400"
                    rows={3}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-between mt-6 pt-6 border-t border-gray-200">
          <Button variant="outline" onClick={handleBack} disabled={loading}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button
            onClick={handleSubmitDecision}
            disabled={loading || (decision !== "approve" && !reason.trim())}
            className={`${
              decision === "approve"
                ? "bg-green-600 hover:bg-green-700"
                : decision === "reject"
                ? "bg-red-600 hover:bg-red-700"
                : "bg-yellow-600 hover:bg-yellow-700"
            } text-white`}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing...
              </>
            ) : (
              <>
                {decision === "approve" && (
                  <CheckCircle className="h-4 w-4 mr-2" />
                )}
                {decision === "reject" && <XCircle className="h-4 w-4 mr-2" />}
                {decision === "approve"
                  ? "Approve Grades"
                  : decision === "reject"
                  ? "Reject Submission"
                  : "Approve Grades"}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
