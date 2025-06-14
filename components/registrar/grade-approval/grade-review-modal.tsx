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

          {/* Grade Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="text-lg text-blue-900 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Grade Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {gradeDistribution.map((dist) => (
                    <div
                      key={dist.grade}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <Badge
                          variant="outline"
                          className={`w-12 text-center ${
                            ["A", "A+", "A-"].includes(dist.grade)
                              ? "border-green-300 text-green-700"
                              : ["B+", "B", "B-"].includes(dist.grade)
                              ? "border-blue-300 text-blue-700"
                              : ["C+", "C", "C-"].includes(dist.grade)
                              ? "border-yellow-300 text-yellow-700"
                              : "border-red-300 text-red-700"
                          }`}
                        >
                          {dist.grade}
                        </Badge>
                        <span className="text-sm font-medium">
                          {dist.count} students
                        </span>
                      </div>
                      <span className="text-sm text-gray-600">
                        {dist.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="text-lg text-blue-900 flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Summary Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Total Students
                    </span>
                    <span className="font-medium text-blue-900">
                      {request.totalStudents}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Graded</span>
                    <span className="font-medium text-blue-900">
                      {request.submittedGrades}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-600">Passed</span>
                    <span className="font-medium text-green-700">
                      {gradeStats.pass}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-red-600">Failed</span>
                    <span className="font-medium text-red-700">
                      {gradeStats.fail}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-yellow-600">Incomplete</span>
                    <span className="font-medium text-yellow-700">
                      {gradeStats.incomplete}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t">
                    <span className="text-sm font-medium text-gray-700">
                      Pass Rate
                    </span>
                    <span className="font-bold text-blue-900">
                      {Math.round(
                        (gradeStats.pass / request.grades.length) * 100
                      )}
                      %
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Student Grades Table */}
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900">
                Student Grades
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="max-h-64 overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="border-b bg-blue-50">
                    <tr>
                      <th className="text-left p-2 font-medium text-blue-900">
                        Student
                      </th>
                      <th className="text-left p-2 font-medium text-blue-900">
                        Student ID
                      </th>
                      <th className="text-center p-2 font-medium text-blue-900">
                        Grade
                      </th>
                      <th className="text-center p-2 font-medium text-blue-900">
                        Points
                      </th>
                      <th className="text-center p-2 font-medium text-blue-900">
                        Status
                      </th>
                      <th className="text-left p-2 font-medium text-blue-900">
                        Remarks
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {request.grades.map((grade) => (
                      <tr
                        key={grade.studentId}
                        className="border-b hover:bg-blue-50"
                      >
                        <td className="p-2 font-medium text-blue-900">
                          {grade.studentName}
                        </td>
                        <td className="p-2 text-gray-600">
                          {grade.studentNumber}
                        </td>
                        <td className="p-2 text-center">
                          <Badge
                            variant="outline"
                            className={`${
                              ["A", "A+", "A-"].includes(grade.grade)
                                ? "border-green-300 text-green-700"
                                : ["B+", "B", "B-"].includes(grade.grade)
                                ? "border-blue-300 text-blue-700"
                                : ["C+", "C", "C-"].includes(grade.grade)
                                ? "border-yellow-300 text-yellow-700"
                                : "border-red-300 text-red-700"
                            }`}
                          >
                            {grade.grade}
                          </Badge>
                        </td>
                        <td className="p-2 text-center font-medium">
                          {grade.points}
                        </td>
                        <td className="p-2 text-center">
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
                        <td className="p-2 text-gray-600 text-xs">
                          {grade.remarks || "-"}
                        </td>
                      </tr>
                    ))}
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
