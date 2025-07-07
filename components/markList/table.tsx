"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateAssessmentRequest } from "@/utils/assessment";
import { useAssessments } from "@/lib/react-query/hooks/useAssessment";
import { ModuleInfoForm } from "./moduleInfoForm";
import { AssessmentCell } from "./assessmentCell";
import { useByteachingAssessment } from "@/lib/react-query/hooks/useByteachingAssessment";
import { useUpdateAssessmentStatus } from "@/lib/react-query/mutations/useAssessmentStatus";
import {
  GraduationCap,
  Users,
  BookOpen,
  Trophy,
  Loader2,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react";
import { useTeachingAssignment } from "@/lib/react-query/hooks/useTeachingAssignment";

interface StudentMark {
  student_main_id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  sex: string;
  id_no: string;
  practical: number;
  theory: number;
  total: number;
  grade_in_letter: string;
}

const ListTable = () => {
  const {
    assessments,
    updateLocalAssessment,
    submitAssessments,
    isSubmitting,
  } = useAssessments();

  const updateAssessmentStatusMutation = useUpdateAssessmentStatus();
  const [teacherId, setTeacherId] = useState<number | null>(null);
  
  useEffect(() => {
    const id = localStorage.getItem('teacherId');
    setTeacherId(Number(id));
  }, []);

  const { data: assessmentData, isLoading, isError, error } = useTeachingAssignment(teacherId ?? 1);
  const tableRef = useRef<HTMLDivElement>(null);

  const currentTableref = useRef<HTMLDivElement>(null);
  const [selectedTeachingAssignmentId, setSelectedTeachingAssignmentId] =
    useState<number | null>(null);

  const {
    data: fetchedAssessments,
    isLoading: isAssessmentsLoading,
    isError: isAssessmentsError,
    error: assessmentsError,
    refetch: refetchAssessments,
  } = useByteachingAssessment(selectedTeachingAssignmentId ?? 0);

  useEffect(() => {
    if (fetchedAssessments && fetchedAssessments.length > 0 && tableRef.current) {
      setTimeout(() => {
        tableRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }
  }, [fetchedAssessments]);

  const handleGetAssessment = (id: number) => {
    currentTableref.current?.focus();
    setSelectedTeachingAssignmentId(id);
    refetchAssessments();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTeachingAssignmentId) {
      alert("Please select a module and click Get first.");
      return;
    }
    
    const updatedStudentIds = Object.keys(assessments);
    if (updatedStudentIds.length === 0) {
      alert("No changes to submit.");
      return;
    }
    
    const assessmentInfo: CreateAssessmentRequest[] = updatedStudentIds.map(
      (studentId) => {
        const numericStudentId = Number(studentId);
        const local = assessments[numericStudentId] || {};
        const fetched = (fetchedAssessments || []).find(
          (item: any) => item.student?.id === numericStudentId
        );
        const practical1 = local.practical1 ?? fetched?.practical1 ?? null;
        const practical2 = local.practical2 ?? fetched?.practical2 ?? null;
        const practical3 = local.practical3 ?? fetched?.practical3 ?? null;
        const theory = local.theory ?? fetched?.theory ?? null;
        const comment = local.comment ?? fetched?.comment ?? "";

        // Auto-calculate status fields based on new logic
        const practicalStatus =
          practical1 === null || practical2 === null || practical3 === null
            ? "NA"
            : "OK";
        const theoryStatus = theory === null ? "NA" : "OK";

        // Calculate totals with null handling
        const totalPractical =
          (practical1 ?? 0) + (practical2 ?? 0) + (practical3 ?? 0);
        const totalMark = totalPractical + (theory ?? 0);

        // Calculate grade with null check
        const gradeInLetter =
          practical1 === null ||
          practical2 === null ||
          practical3 === null ||
          theory === null
            ? "NG"
            : calculateGrade(totalMark);

        return {
          teachingAssignmentId: selectedTeachingAssignmentId,
          studentId: numericStudentId,
          practical1,
          practical2,
          practical3,
          totalPractical,
          practicalStatus,
          theoryStatus,
          totalMark,
          theory,
          //gradeInLetter,
          comment,
        };
      }
    );

    submitAssessments({
      teachingAssignmentId: selectedTeachingAssignmentId,
      assessments: assessmentInfo,
      assessmentGroupId: selectedTeachingAssignmentId,
    });
  };

  const handleSubmitForApproval = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTeachingAssignmentId) {
      alert("Please select a module and click Get first.");
      return;
    }

    const statusInfo = getAssessmentGroupStatus();
    if (!statusInfo.assessmentGroupId) {
      alert("Assessment group ID not found.");
      return;
    }

    try {
      await updateAssessmentStatusMutation.mutateAsync({
        id: statusInfo.assessmentGroupId,
        status: "UNDER_REVIEW",
      });
      refetchAssessments();
    } catch (error) {
      console.error("Error submitting for approval:", error);
    }
  };

  const getAssessmentGroupStatus = () => {
    if (fetchedAssessments && fetchedAssessments.length > 0) {
      const firstStudent = fetchedAssessments[0];
      return {
        status: firstStudent?.assessmentGroup?.status || "DRAFT",
        assessmentGroupId: firstStudent?.assessmentGroup?.id,
        rejectionReason: firstStudent?.assessmentGroup?.reason || null,
      };
    }
    return { status: "DRAFT", assessmentGroupId: null, rejectionReason: null };
  };

  const getButtonConfig = () => {
    const statusInfo = getAssessmentGroupStatus();
    const status = statusInfo.status;

    if (status === "APPROVED" || status === "UNDER_REVIEW") {
      return [];
    }

    if (status === "DRAFT" || status === "REJECTED") {
      return [
        {
          text: "Save",
          onClick: handleSubmit,
          disabled: isSubmitting || updateAssessmentStatusMutation.isPending,
          className:
            "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 font-semibold",
          icon: "Trophy",
        },
      ];
    }

    const saveButton = {
      text: "Save",
      onClick: handleSubmit,
      disabled: isSubmitting || updateAssessmentStatusMutation.isPending,
      className:
        "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 font-semibold",
      icon: "Trophy",
    };

    let secondButton;
    switch (status) {
      case "SUBMISSION_REQUESTED":
        secondButton = {
          text: "Submit for Approval",
          onClick: handleSubmitForApproval,
          disabled: isSubmitting || updateAssessmentStatusMutation.isPending,
          className:
            "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 font-semibold",
          icon: "CheckCircle",
        };
        break;
      default:
        secondButton = {
          text: "Save",
          onClick: handleSubmit,
          disabled: isSubmitting || updateAssessmentStatusMutation.isPending,
          className:
            "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 font-semibold",
          icon: "Trophy",
        };
        break;
    }

    return [saveButton, secondButton];
  };

  const getAssessmentValue = (
    studentId: string,
    field: keyof (typeof assessments)[number]
  ): number => {
    const numericStudentId = parseInt(studentId.replace("ST", ""));
    return (assessments[numericStudentId]?.[field] as number) || 0;
  };

  const getTotalPractical = (studentId: string): number => {
    const numericStudentId = parseInt(studentId.replace("ST", ""));
    const assessment = assessments[numericStudentId];
    return (
      (assessment?.practical1 || 0) +
      (assessment?.practical2 || 0) +
      (assessment?.practical3 || 0)
    );
  };

  const getTotalMark = (studentId: string): number => {
    const numericStudentId = parseInt(studentId.replace("ST", ""));
    const assessment = assessments[numericStudentId];
    return getTotalPractical(studentId) + (assessment?.theory || 0);
  };

  const getGrade = (studentId: string): string => {
    const numericStudentId = parseInt(studentId.replace("ST", ""));
    return assessments[numericStudentId]?.gradeInLetter || "F";
  };

  const calculateGrade = (total: number): string => {
    if (total > 100) return "Error";
    if (total >= 95) return "A+";
    if (total >= 92) return "A";
    if (total >= 89) return "A-";
    if (total >= 86) return "B+";
    if (total >= 83) return "B";
    if (total >= 80) return "B-";
    if (total >= 77) return "C+";
    if (total >= 74) return "C";
    if (total === 0) return "NA";
    return "F";
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
      case "Error":
        return "text-purple-600 bg-purple-50 border border-purple-200";
      case "NA":
        return "text-gray-500 bg-gray-100 border border-gray-300";
      case "NG":
        return "text-orange-600 bg-orange-50 border border-orange-200";
      default:
        return "text-gray-600 bg-gray-50 border border-gray-200";
    }
  };

  // Extract module info from first assessment
  const moduleInfo = fetchedAssessments && fetchedAssessments.length > 0 
    ? fetchedAssessments[0] 
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="w-full max-w-7xl mx-auto p-6 space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4 py-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Grade Guardian
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Streamline your assessment process with our comprehensive student
            grading platform
          </p>
        </div>

        {/* Module Selection Card */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5" />
              <span>Module Selection</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ModuleInfoForm
              isLoading={isLoading}
              assessmentData={assessmentData}
              isError={isError}
              error={error}
              handleGet={handleGetAssessment}
            />
          </CardContent>
        </Card>

        {/* Assessment Form */}
        <form onSubmit={(e) => e.preventDefault()}>
          <Card
             ref={tableRef}
            className="shadow-xl border-0 bg-white/80 backdrop-blur-sm"
          >
            <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <div className="flex flex-col">
                    <span>Student Assessments</span>
                    {fetchedAssessments && fetchedAssessments.length > 0 && (
                      <div className="flex items-center space-x-3 mt-2">
                        {(() => {
                          const statusInfo = getAssessmentGroupStatus();
                          const status = statusInfo.status;
                          const statusMeanings = {
                            DRAFT: {
                              text: "Draft",
                              meaning: "You can edit and save changes",
                              bgColor: "bg-gray-100/90",
                              textColor: "text-gray-800",
                              icon: "📝",
                              dotColor: "bg-gray-400",
                            },
                            SUBMISSION_REQUESTED: {
                              text: "Submission Requested",
                              meaning: "Ready to submit for approval",
                              bgColor: "bg-blue-100/90",
                              textColor: "text-blue-800",
                              icon: "📤",
                              dotColor: "bg-blue-400",
                            },
                            UNDER_REVIEW: {
                              text: "Under Review",
                              meaning:
                                "Being reviewed by department no more changes allowed",
                              bgColor: "bg-yellow-100/90",
                              textColor: "text-yellow-800",
                              icon: "👁️",
                              dotColor: "bg-yellow-400",
                            },
                            APPROVED: {
                              text: "Approved",
                              meaning: "Finalized - no more changes allowed",
                              bgColor: "bg-green-100/90",
                              textColor: "text-green-800",
                              icon: "✅",
                              dotColor: "bg-green-400",
                            },
                            REJECTED: {
                              text: "Rejected",
                              meaning: "Needs revision - you can edit",
                              bgColor: "bg-red-100/90",
                              textColor: "text-red-800",
                              icon: "❌",
                              dotColor: "bg-red-400",
                            },
                          };
                          const statusConfig =
                            statusMeanings[
                              status as keyof typeof statusMeanings
                            ] || statusMeanings.DRAFT;

                          return (
                            <div className="flex items-center space-x-3 flex-wrap">
                              {/* Status Indicator */}
                              <div
                                className={`flex items-center space-x-2 px-3 py-2 rounded-full ${statusConfig.bgColor} backdrop-blur-sm h-8 min-w-fit`}
                              >
                                <div
                                  className={`w-2 h-2 rounded-full ${statusConfig.dotColor} animate-pulse`}
                                ></div>
                                <span className="text-xs font-medium">
                                  {statusConfig.icon}
                                </span>
                                <span
                                  className={`text-xs font-semibold ${statusConfig.textColor}`}
                                >
                                  {statusConfig.text}
                                </span>
                              </div>

                              {/* Status Meaning */}
                              <div className="text-white/90 text-xs font-light italic max-w-xs h-8 flex items-center">
                                {statusConfig.meaning}
                              </div>

                              {/* Rejection Reason Display - Inline */}
                              {status === "REJECTED" &&
                                statusInfo.rejectionReason && (
                                  <div className="bg-red-50/95 border border-red-200 rounded-full px-4 py-2 backdrop-blur-sm h-8 flex items-center space-x-2 max-w-md shadow-sm">
                                    <AlertCircle className="w-3 h-3 text-red-500 flex-shrink-0" />
                                    <span className="text-xs font-semibold text-red-800">
                                      Reason:
                                    </span>
                                    <span className="text-xs text-red-700 truncate font-medium">
                                      {statusInfo.rejectionReason}
                                    </span>
                                  </div>
                                )}
                            </div>
                          );
                        })()}
                      </div>
                    )}
                  </div>
                </div>
                {fetchedAssessments && fetchedAssessments.length > 0 && (
                  <div className="flex items-center space-x-2 text-white/90">
                    <Trophy className="w-4 h-4" />
                    <span className="text-sm">
                      {fetchedAssessments.length} Students
                    </span>
                  </div>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {isAssessmentsLoading && (
                <div className="flex items-center justify-center py-16 space-x-3">
                  <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                  <span className="text-blue-600 font-medium">
                    Loading assessments...
                  </span>
                </div>
              )}

              {isAssessmentsError && (
                <div className="flex items-center justify-center py-16 space-x-3">
                  <AlertCircle className="w-6 h-6 text-red-500" />
                  <span className="text-red-600 font-medium">
                    Error loading assessments:{" "}
                    {assessmentsError?.message || "Unknown error"}
                  </span>
                </div>
              )}

              {!isAssessmentsLoading && !isAssessmentsError && (
                <div className="overflow-x-auto">
                  <Table>
                    <TableCaption className="text-gray-600 py-4 bg-gray-50/50">
                      <div className="flex items-center justify-center space-x-2">
                        <BookOpen className="w-4 h-4" />
                        <span>Edit marks and submit your assessments</span>
                      </div>
                    </TableCaption>
                    <TableHeader>
                      <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                        <TableHead className="font-semibold text-gray-700 py-4">
                          Student ID
                        </TableHead>
                        <TableHead className="font-semibold text-gray-700 py-4">
                          Full Name
                        </TableHead>
                        <TableHead className="font-semibold text-gray-700 py-4">
                          Sex
                        </TableHead>
                        <TableHead className="font-semibold text-gray-700 py-4 text-center">
                          Practical 1
                        </TableHead>
                        <TableHead className="font-semibold text-gray-700 py-4 text-center">
                          Practical 2
                        </TableHead>
                        <TableHead className="font-semibold text-gray-700 py-4 text-center">
                          Practical 3
                        </TableHead>
                        <TableHead className="font-semibold text-gray-700 py-4 text-center">
                          P. Status
                        </TableHead>
                        <TableHead className="font-semibold text-gray-700 py-4 text-center bg-blue-50">
                          Total Practical
                        </TableHead>
                        <TableHead className="font-semibold text-gray-700 py-4 text-center">
                          Theory
                        </TableHead>
                        <TableHead className="font-semibold text-gray-700 py-4 text-center">
                          T. Status
                        </TableHead>
                        <TableHead className="font-semibold text-gray-700 py-4 text-center bg-indigo-50">
                          Total Mark
                        </TableHead>
                        <TableHead className="font-semibold text-gray-700 py-4 text-center">
                          Grade
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {(fetchedAssessments && fetchedAssessments.length > 0
                        ? fetchedAssessments
                        : []
                      ).map((item: any, index: number) => {
                        const student = item.student;
                        const studentId = student?.id;
                        const numericStudentId = Number(studentId);
                        // Use local edits if present, else fallback to fetched values
                        const local = assessments[numericStudentId] || {};
                        const practical1 =
                          local.practical1 ?? item.practical1 ?? null;
                        const practical2 =
                          local.practical2 ?? item.practical2 ?? null;
                        const practical3 =
                          local.practical3 ?? item.practical3 ?? null;
                        const theory = local.theory ?? item.theory ?? null;

                        // Auto-calculate status fields
                        const practicalStatus =
                          practical1 === null ||
                          practical2 === null ||
                          practical3 === null
                            ? "NA"
                            : "OK";
                        const theoryStatus = theory === null ? "NA" : "OK";

                        // Calculate totals with null handling
                        const totalPractical =
                          (practical1 ?? 0) +
                          (practical2 ?? 0) +
                          (practical3 ?? 0);
                        const totalMark = totalPractical + (theory ?? 0);

                        // Calculate grade with null check
                        const grade =
                          practical1 === null ||
                          practical2 === null ||
                          practical3 === null ||
                          theory === null
                            ? "NG"
                            : calculateGrade(totalMark);
                        const fullName = student?.user?.firstName
                          ? `${student.user.firstName} ${
                              student.user.middleName ?? ""
                            } ${student.user.lastName ?? ""}`
                          : "Unknown Student";
                        const sex = student?.user?.gender || "N/A";

                        return (
                          <TableRow
                            key={studentId}
                            className={`hover:bg-blue-50/50 transition-colors duration-200 ${
                              index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                            }`}
                          >
                            <TableCell className="font-medium text-gray-900 py-4">
                              <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                <span>{student?.user?.userMainId || ""}</span>
                              </div>
                            </TableCell>
                            <TableCell className="font-medium text-gray-900 py-4">
                              {fullName}
                            </TableCell>
                            <TableCell className="text-gray-700 py-4">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  sex === "Male"
                                    ? "bg-blue-100 text-blue-700"
                                    : sex === "Female"
                                    ? "bg-pink-100 text-pink-700"
                                    : "bg-gray-100 text-gray-700"
                                }`}
                              >
                                {sex}
                              </span>
                            </TableCell>
                            <AssessmentCell
                              value={practical1}
                              onChange={(value) =>
                                updateLocalAssessment(
                                  numericStudentId,
                                  "practical1",
                                  Number(value)
                                )
                              }
                              max={30}
                            />
                            <AssessmentCell
                              value={practical2}
                              onChange={(value) =>
                                updateLocalAssessment(
                                  numericStudentId,
                                  "practical2",
                                  Number(value)
                                )
                              }
                              max={30}
                            />
                            <AssessmentCell
                              value={practical3}
                              onChange={(value) =>
                                updateLocalAssessment(
                                  numericStudentId,
                                  "practical3",
                                  Number(value)
                                )
                              }
                              max={30}
                            />
                            <AssessmentCell
                              value={practicalStatus}
                              isStatus={true}
                              readOnly={true}
                            />
                            <TableCell className="text-center py-4 bg-blue-50/50">
                              <span className="font-bold text-blue-700 text-lg">
                                {totalPractical}
                              </span>
                            </TableCell>
                            <AssessmentCell
                              value={theory}
                              onChange={(value) =>
                                updateLocalAssessment(
                                  numericStudentId,
                                  "theory",
                                  Number(value)
                                )
                              }
                              max={30}
                            />
                            {/* <TableCell className="text-center py-4">
                              <span className="font-medium text-gray-900">
                                {theory}
                              </span>
                            </TableCell> */}
                            <AssessmentCell
                              value={theoryStatus}
                              isStatus={true}
                              readOnly={true}
                            />
                            <TableCell className="text-center py-4 bg-indigo-50/50">
                              <span className="font-bold text-indigo-700 text-lg">
                                {totalMark}
                              </span>
                            </TableCell>
                            <TableCell className="text-center py-4">
                              <span
                                className={`px-3 py-1 rounded-full text-sm font-bold ${getGradeColor(
                                  grade
                                )}`}
                              >
                                {grade}
                              </span>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>

                      <TableFooter>
                        <TableRow className="bg-gradient-to-r from-gray-100 to-gray-200 border-t-2 border-gray-300">
                          <TableCell colSpan={11} className="text-right py-6">
                            <div className="flex justify-end space-x-4">
                              {(() => {
                                const buttonConfigs = getButtonConfig();

                                return buttonConfigs.map(
                                  (buttonConfig, index) => {
                                    const IconComponent =
                                      buttonConfig.icon === "Trophy"
                                        ? Trophy
                                        : buttonConfig.icon === "CheckCircle"
                                        ? CheckCircle
                                        : buttonConfig.icon === "Clock"
                                        ? Clock
                                        : Trophy;

                                    return (
                                      <Button
                                        key={index}
                                        type="button"
                                        onClick={buttonConfig.onClick}
                                        disabled={buttonConfig.disabled}
                                        className={buttonConfig.className}
                                      >
                                        {isSubmitting ||
                                        updateAssessmentStatusMutation.isPending ? (
                                          <div className="flex items-center space-x-2">
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            <span>
                                              {updateAssessmentStatusMutation.isPending
                                                ? "Updating Status..."
                                                : "Submitting..."}
                                            </span>
                                          </div>
                                        ) : (
                                          <div className="flex items-center space-x-2">
                                            <IconComponent className="w-4 h-4" />
                                            <span>{buttonConfig.text}</span>
                                          </div>
                                        )}
                                      </Button>
                                    );
                                  }
                                );
                              })()}
                            </div>
                          </TableCell>
                        </TableRow>
                      </TableFooter>
                    </Table>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default ListTable;