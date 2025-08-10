"use client";

import { useState } from "react";
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
  Users,
  BookOpen,
  Calendar,
  ArrowLeft,
  GraduationCap,
  RefreshCw,
  FileText,
  User,
} from "lucide-react";
import { RegradeAssesmentResponse } from "@/types/types";
import { toast } from "sonner";

interface ReGradeDetailPageProps {
  request: any | null;
  onClose: () => void;
  loading?: boolean;
  onSuccess?: () => void;
}

export default function ReGradeDetailPage({
  request,
  onClose,
  loading = false,
  onSuccess,
}: ReGradeDetailPageProps) {
  const [decision, setDecision] = useState<"approve" | "reject">("approve");
  const [rejectionReason, setRejectionReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock mutation for updating re-grade decision
  const updateRegradeDecision = {
    mutate: (data: any, options?: any) => {
      setIsSubmitting(true);

      // Simulate API delay
      setTimeout(() => {
        const actionText =
          data.regradeStatus === "REGISTRAR_UNDER_REVIEW"
            ? "approved"
            : "rejected";
        toast.success(`Re-grade request ${actionText} successfully!`);

        setIsSubmitting(false);

        // Call success callback if provided
        if (options?.onSuccess) {
          options.onSuccess();
        }
      }, 1500);
    },
  };

  const handleSubmitDecision = () => {
    if (!request) return;

    updateRegradeDecision.mutate(
      {
        id: request.id,
        regradeStatus:
          decision === "approve"
            ? "REGISTRAR_UNDER_REVIEW"
            : "REGRADE_REQUESTED",
        regradeReason:
          decision === "reject"
            ? rejectionReason
            : "Regrade request approved by department",
      },
      {
        onSuccess: () => {
          resetForm();

          // Call onSuccess callback to trigger refetch
          if (onSuccess) {
            onSuccess();
          }

          onClose();
        },
      }
    );
  };

  const resetForm = () => {
    setDecision("approve");
    setRejectionReason("");
  };

  const handleBack = () => {
    resetForm();
    onClose();
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A+":
      case "A":
      case "A-":
        return "text-emerald-600 bg-emerald-50 border border-emerald-200";
      case "B+":
      case "B":
      case "B-":
        return "text-blue-600 bg-blue-50 border border-blue-200";
      case "C+":
      case "C":
        return "text-amber-600 bg-amber-50 border border-amber-200";
      case "D":
        return "text-orange-600 bg-orange-50 border border-orange-200";
      case "F":
        return "text-red-600 bg-red-50 border border-red-200";
      default:
        return "text-gray-600 bg-gray-50 border border-gray-200";
    }
  };

  if (!request) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No Re-grade Request Found
            </h2>
            <p className="text-gray-600 mb-4">
              The re-grade request could not be found.
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
                Back to Re-grade Review
              </Button>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-xl font-semibold text-gray-900">
                Re-grade Review - {request.teachingAssignment.course.courseCode}
              </h1>
            </div>
            <Badge
              className={`
                ${
                  request.regradeStatus === "DEPARTMENT_UNDER_REVIEW"
                    ? "bg-orange-100 text-orange-800 border-orange-200"
                    : request.regradeStatus === "DEPARTMENT_APPROVED"
                    ? "bg-green-100 text-green-800 border-green-200"
                    : "bg-red-100 text-red-800 border-red-200"
                }
              `}
            >
              {request.regradeStatus.replace("_", " ")}
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="space-y-6">
          {/* Student & Course Information */}
          <Card className="border-purple-100">
            <CardHeader>
              <CardTitle className="text-lg text-purple-900 flex items-center gap-2">
                <User className="h-5 w-5" />
                Student & Course Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Student</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                      {request.student.user.firstName.charAt(0)}
                      {request.student.user.lastName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {request.student.user.firstName}{" "}
                        {request.student.user.lastName}
                      </p>
                      <p className="text-sm text-gray-600">
                        {request.student.user.studentId}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Course</p>
                  <div>
                    <p className="font-medium text-gray-900">
                      {request.teachingAssignment.course.courseCode}
                    </p>
                    <p className="text-sm text-gray-600">
                      {request.teachingAssignment.course.title}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Teacher</p>
                  <div>
                    <p className="font-medium text-gray-900">
                      {request.teachingAssignment.teacher.user.firstName}{" "}
                      {request.teachingAssignment.teacher.user.lastName}
                    </p>
                    <p className="text-sm text-gray-600">
                      {request.teachingAssignment.teacher.user.userMainId}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Department</p>
                  <p className="font-medium text-gray-900">
                    {request.student.user.department}
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Grade Level</p>
                  <p className="font-medium text-gray-900">
                    Grade {request.teachingAssignment.level}
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Academic Year</p>
                  <p className="font-medium text-gray-900">
                    AY {request.teachingAssignment.academicYearId} - Sem{" "}
                    {request.teachingAssignment.academicSemesterId}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Grade Comparison */}
          <Card className="border-indigo-100">
            <CardHeader>
              <CardTitle className="text-lg text-indigo-900 flex items-center gap-2">
                <RefreshCw className="h-5 w-5" />
                Grade Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Original Grade */}
                <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                  <h3 className="text-lg font-semibold text-red-900 mb-4 flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Original Grade
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-red-700">Final Grade:</span>
                      <Badge
                        className={`font-bold ${getGradeColor(
                          request.originalGrade?.gradeInLetter || ""
                        )}`}
                      >
                        {request.originalGrade?.gradeInLetter}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-red-700">Total Mark:</span>
                      <span className="font-medium">
                        {request.originalGrade?.totalMark}/100
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-red-700">Practical:</span>
                        <span>{request.originalGrade?.totalPractical}/70</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-red-700">Theory:</span>
                        <span>{request.originalGrade?.theory}/30</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Requested Grade */}
                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                  <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Requested Grade
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-green-700">
                        Final Grade:
                      </span>
                      <Badge
                        className={`font-bold ${getGradeColor(
                          request.gradeInLetter!
                        )}`}
                      >
                        {request.gradeInLetter}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-green-700">
                        Total Mark:
                      </span>
                      <span className="font-medium">
                        {request.totalMark}/100
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-green-700">Practical:</span>
                        <span>{request.totalPractical}/70</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-green-700">Theory:</span>
                        <span>{request.theory}/30</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Grade Change Summary */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-2">
                  Change Summary
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-blue-700">Grade Change: </span>
                    <span className="font-medium">
                      {request.originalGrade?.gradeInLetter} →{" "}
                      {request.gradeInLetter}
                    </span>
                  </div>
                  <div>
                    <span className="text-blue-700">Mark Change: </span>
                    <span className="font-medium">
                      {request.originalGrade?.totalMark} → {request.totalMark}
                      <span
                        className={`ml-1 ${
                          request.totalMark! -
                            request.originalGrade?.totalMark! >
                          0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        (
                        {request.totalMark! -
                          request.originalGrade?.totalMark! >
                        0
                          ? "+"
                          : ""}
                        {request.totalMark! - request.originalGrade?.totalMark!}
                        )
                      </span>
                    </span>
                  </div>
                  <div>
                    <span className="text-blue-700">Practical Change: </span>
                    <span className="font-medium">
                      {request.originalGrade?.totalPractical} →{" "}
                      {request.totalPractical}
                      <span
                        className={`ml-1 ${
                          request.totalPractical! -
                            request.originalGrade?.totalPractical! >
                          0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        (
                        {request.totalPractical! -
                          request.originalGrade?.totalPractical! >
                        0
                          ? "+"
                          : ""}
                        {request.totalPractical! -
                          request.originalGrade?.totalPractical!}
                        )
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Student's Reason */}
          <Card className="border-amber-100">
            <CardHeader>
              <CardTitle className="text-lg text-amber-900 flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Student's Re-grade Request
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <h4 className="font-medium text-amber-900 mb-2">
                  Reason for Re-grade Request:
                </h4>
                <p className="text-amber-800 leading-relaxed">
                  "{request.regradeReason}"
                </p>
              </div>
              {request.comment && (
                <div className="mt-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-2">
                    Additional Comments:
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    "{request.comment}"
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Decision Section - Only show if status is APPROVAL_REQUESTED */}
          {request.regradeStatus === "DEPARTMENT_UNDER_REVIEW" && (
            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="text-lg text-blue-900 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Department Decision
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label
                    htmlFor="decision"
                    className="text-blue-900 font-medium"
                  >
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
                          Approve Re-grade Request
                        </div>
                      </SelectItem>
                      <SelectItem value="reject">
                        <div className="flex items-center gap-2">
                          <XCircle className="h-4 w-4 text-red-600" />
                          Reject Re-grade Request
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {decision === "reject" && (
                  <div>
                    <Label
                      htmlFor="rejectionReason"
                      className="text-blue-900 font-medium"
                    >
                      Reason for Rejection *
                    </Label>
                    <Textarea
                      id="rejectionReason"
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      placeholder="Please provide a detailed reason for rejecting this re-grade request..."
                      className="border-blue-200 focus:border-blue-400"
                      rows={4}
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      This reason will be shared with the student and teacher.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Footer Actions - Only show if status is APPROVAL_REQUESTED */}
        {request.regradeStatus === "DEPARTMENT_UNDER_REVIEW" && (
          <div className="flex justify-between mt-6 pt-6 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={isSubmitting}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button
              onClick={handleSubmitDecision}
              disabled={
                isSubmitting ||
                (decision === "reject" && !rejectionReason.trim())
              }
              className={`${
                decision === "approve"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-red-600 hover:bg-red-700"
              } text-white`}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : (
                <>
                  {decision === "approve" ? (
                    <CheckCircle className="h-4 w-4 mr-2" />
                  ) : (
                    <XCircle className="h-4 w-4 mr-2" />
                  )}
                  {decision === "approve"
                    ? "Approve Re-grade"
                    : "Reject Re-grade"}
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
