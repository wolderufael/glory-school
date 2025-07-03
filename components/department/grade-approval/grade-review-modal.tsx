"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
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
} from "lucide-react";
import {
  GradeApprovalRequest,
  ApprovalDecision,
  GradeDistribution,
} from "./types";

interface GradeReviewModalProps {
  request: GradeApprovalRequest | null;
  isOpen: boolean;
  onClose: () => void;
  onDecision: (decision: ApprovalDecision) => void;
  loading?: boolean;
}

export function GradeReviewModal({
  request,
  isOpen,
  onClose,
  onDecision,
  loading = false,
}: GradeReviewModalProps) {
  const [decision, setDecision] = useState<
    "approve" | "reject" | "request_revision"
  >("approve");
  const [feedback, setFeedback] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmitDecision = () => {
    if (!request) return;

    const approvalDecision: ApprovalDecision = {
      requestId: request.id,
      action: decision,
      reason: reason || undefined,
      feedback: feedback || undefined,
      reviewerId: "current-registrar-id", // This should come from auth context
    };

    onDecision(approvalDecision);
  };

  const calculateGradeDistribution = (): GradeDistribution[] => {
    if (!request) return [];

    const gradeCount: Record<string, number> = {};
    request.grades.forEach((grade) => {
      gradeCount[grade.grade] = (gradeCount[grade.grade] || 0) + 1;
    });

    const total = request.grades.length;
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

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!request) return null;

  const gradeDistribution = calculateGradeDistribution();
  const gradeStats = getGradeStats();

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="!max-w-[90vw] sm:!max-w-[85vw] md:!max-w-[80vw] w-full max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-blue-900 flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Grade Review - {request.course.code}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Request Summary */}
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900">
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
                    {request.grades.length} Students
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
                    {request.grades.map((grade, index) => {
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
                          case "D":
                          case "D+":
                          case "D-":
                            return "text-orange-600 bg-orange-50 border border-orange-200";
                          case "F":
                            return "text-red-600 bg-red-50 border border-red-200";
                          default:
                            return "text-gray-600 bg-gray-50 border border-gray-200";
                        }
                      };

                      // Mock practical breakdown (since we don't have individual practical scores)
                      const totalPractical = Math.floor(grade.points * 0.6); // Assume 60% is practical
                      const theory = grade.points - totalPractical;
                      const practical1 = Math.floor(totalPractical * 0.33);
                      const practical2 = Math.floor(totalPractical * 0.33);
                      const practical3 =
                        totalPractical - practical1 - practical2;

                      return (
                        <tr
                          key={grade.studentId}
                          className={`hover:bg-blue-50/50 transition-colors duration-200 ${
                            index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                          }`}
                        >
                          <td className="font-medium text-gray-900 py-4 px-4">
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                              <span>{grade.studentNumber}</span>
                            </div>
                          </td>
                          <td className="font-medium text-gray-900 py-4 px-4">
                            {grade.studentName}
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
                              {grade.points}
                            </span>
                          </td>
                          <td className="text-center py-4 px-4">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-bold ${getGradeColor(
                                grade.grade
                              )}`}
                            >
                              {grade.grade}
                            </span>
                          </td>
                          <td className="text-center py-4 px-4">
                            <Badge
                              className={`text-xs ${
                                grade.status === "pass"
                                  ? "bg-green-100 text-green-800"
                                  : grade.status === "fail"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {grade.status}
                            </Badge>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
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
                    <SelectItem value="request_revision">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        Request Revision
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {(decision === "reject" || decision === "request_revision") && (
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

              <div>
                <Label htmlFor="feedback" className="text-blue-900 font-medium">
                  Additional Feedback (Optional)
                </Label>
                <Textarea
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Any additional comments or feedback for the teacher..."
                  className="border-blue-200 focus:border-blue-400"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <DialogFooter className="flex justify-between">
          <Button variant="outline" onClick={handleClose} disabled={loading}>
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
                {decision === "request_revision" && (
                  <AlertTriangle className="h-4 w-4 mr-2" />
                )}
                {decision === "approve"
                  ? "Approve Grades"
                  : decision === "reject"
                  ? "Reject Submission"
                  : "Request Revision"}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
