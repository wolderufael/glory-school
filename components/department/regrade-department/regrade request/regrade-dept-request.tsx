"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  GraduationCap,
  Search,
  Save,
  User,
  BookOpen,
  AlertCircle,
  Loader2,
  RefreshCw,
  FileX,
  Wifi,
} from "lucide-react";
import { toast } from "sonner";
import { useFetchRegrade } from "@/lib/react-query/hooks/useRegrade";
import { useAssessments } from "@/lib/react-query/hooks/useAssessment";
import { useCreateRegradeRequest } from "@/lib/react-query/mutations/useRegradeAssesment";
import { AssessmentCell } from "@/components/markList/assessmentCell";
import { Assessment } from "@/utils/assessment";
import { RegradeAssesment } from "@/types/types";
import { Textarea } from "@/components/ui/textarea";
import TeacherSelect from "../../teacher-assignment/TeacherSelect";
import { getLocalStorage } from "@/utils/localStorage";
import { SelectedTeacher } from "../../teacher-assignment/AssignmentConfirmDialog";

export default function RegradeDeptRequest() {
  //const teacherId = getLocalStorage("teacherId") || "";
  const departmentId = getLocalStorage("departmentId") || "";
  const [selectedTeacher, setSelectedTeacher] =
    useState<SelectedTeacher | null>(null);
  //const [teacherId, setTeacherId] = useState<string>("");
  const [studentId, setStudentId] = useState<string>("");
  const [courseCode, setCourseCode] = useState<string>("");
  const [searchTriggered, setSearchTriggered] = useState<boolean>(false);
  const [currentAssessment, setCurrentAssessment] = useState<any | null>(null);
  const [regradeReason, setRegradeReason] = useState<string>("");

  // Check if both fields are filled
  const canSearch = studentId.trim() !== "" && courseCode.trim() !== "";

  //Mock assesment

  // Fetch assessment data using courseCode and studentId (mainId)
  const {
    data: fetchedAssessment,
    isLoading: isAssessmentLoading,
    isError: isAssessmentError,
    error: assessmentError,
    refetch: refetchAssessment,
  } = useFetchRegrade(
    courseCode.trim(),
    studentId.trim(),
    selectedTeacher?.id || ""
  );

  const {
    assessments,
    updateLocalAssessment,
    submitAssessments,
    isSubmitting,
  } = useAssessments();

  const handleTeacherSelect = (teacherId: string, fullName: string) => {
    setSelectedTeacher({ id: teacherId, fullName });
  };

  // Initialize the re-grade request mutation
  const createRegradeRequest = useCreateRegradeRequest();

  // Search for student assessment
  const handleSearch = () => {
    if (!canSearch) {
      if (!studentId.trim()) {
        toast.error("Please enter a Student ID");
      }
      if (!courseCode.trim()) {
        toast.error("Please enter a Course Code");
      }
      return;
    }

    setSearchTriggered(true);
    setCurrentAssessment(null);
    refetchAssessment();
  };

  // Handle assessment data when fetched
  useEffect(() => {
    if (fetchedAssessment && searchTriggered) {
      setCurrentAssessment(fetchedAssessment as Assessment);

      // Populate local assessments with fetched data
      const studentDbId = fetchedAssessment.studentId;
      if (studentDbId) {
        updateLocalAssessment(
          studentDbId,
          "practical1",
          fetchedAssessment.practical1 ?? null
        );
        updateLocalAssessment(
          studentDbId,
          "practical2",
          fetchedAssessment.practical2 ?? null
        );
        updateLocalAssessment(
          studentDbId,
          "practical3",
          fetchedAssessment.practical3 ?? null
        );
        updateLocalAssessment(
          studentDbId,
          "theory",
          fetchedAssessment.theory ?? null
        );
        updateLocalAssessment(
          studentDbId,
          "comment",
          fetchedAssessment.comment ?? ""
        );
      }
    } else if (isAssessmentError && searchTriggered) {
      setCurrentAssessment(null);
    }
  }, [fetchedAssessment, isAssessmentError, searchTriggered]);

  // Submit regrade request
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentAssessment) {
      toast.error("No assessment data to submit");
      return;
    }

    if (!regradeReason.trim()) {
      toast.error("Please provide a reason for the re-grade request");
      return;
    }

    if (regradeReason.trim().length < 10) {
      toast.error(
        "Please provide a more detailed reason (at least 10 characters)"
      );
      return;
    }

    const studentDbId = currentAssessment.studentId;
    if (!studentDbId) {
      toast.error("Invalid student data");
      return;
    }

    const local = assessments[studentDbId] || {};

    const practical1 = local.practical1 ?? currentAssessment.practical1 ?? null;
    const practical2 = local.practical2 ?? currentAssessment.practical2 ?? null;
    const practical3 = local.practical3 ?? currentAssessment.practical3 ?? null;
    const theory = local.theory ?? currentAssessment.theory ?? null;
    const comment = local.comment ?? currentAssessment.comment ?? "";

    // Validate practical marks sum
    if (practical1 !== null && practical2 !== null && practical3 !== null) {
      const totalPractical = practical1 + practical2 + practical3;
      if (totalPractical > 70) {
        toast.error(
          `Total practical marks (${totalPractical}) cannot exceed 70. Please adjust the marks.`
        );
        return;
      }
    }

    // Calculate total mark for the re-grade request
    const totalPracticalCalculated =
      (practical1 ?? 0) + (practical2 ?? 0) + (practical3 ?? 0);
    const totalMarkCalculated = totalPracticalCalculated + (theory ?? 0);

    // Additional validation for re-grade request
    if (totalMarkCalculated > 100) {
      toast.error(
        `Total mark (${totalMarkCalculated}) cannot exceed 100. Please adjust the marks.`
      );
      return;
    }

    try {
      await createRegradeRequest.mutateAsync({
        teachingAssignmentId: currentAssessment.teachingAssignmentId!,
        studentId: studentDbId,
        regradeReason: regradeReason.trim(),
        practical1,
        practical2,
        practical3,
        practical1Type: currentAssessment.practical1Type,
        practical2Type: currentAssessment.practical2Type,
        practical3Type: currentAssessment.practical3Type,
        totalPractical: totalPracticalCalculated,
        practicalStatus: totalPracticalCalculated <= 70 ? "OK" : "Error",
        theory,
        theoryStatus:
          theory !== null && theory <= 30
            ? "OK"
            : theory === null
            ? "N/A"
            : "Error",
        totalMark: totalMarkCalculated,
        gradeInLetter: calculateGrade(totalMarkCalculated),
        comment,
        //teachingAssignment: currentAssessment.teachingAssignment,
      });

      // Clear the form after successful submission
      setRegradeReason("");
      setStudentId("");
      setCourseCode("");
      setSearchTriggered(false);
      setCurrentAssessment(null);
    } catch (error) {
      console.error("Error creating re-grade request:", error);
      // Error is already handled by the mutation hook
    }
  };

  // Helper function to calculate grade based on total marks
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
      case "NG":
        return "text-orange-600 bg-orange-50 border border-orange-200";
      default:
        return "text-gray-600 bg-gray-50 border border-gray-200";
    }
  };

  // Determine error type for better user experience
  const getErrorInfo = () => {
    if (!assessmentError) return null;

    const errorMessage = assessmentError.message || "";
    console.log("errorMessage", errorMessage);
    const isNetworkError =
      errorMessage.includes("fetch") ||
      errorMessage.includes("network") ||
      errorMessage.includes("Network");
    const isNotFound =
      errorMessage.includes("404") ||
      errorMessage.includes("Not Found") ||
      errorMessage.includes("Failed to fetch assessment");

    if (isNetworkError) {
      return {
        type: "network",
        icon: Wifi,
        title: "Network Error",
        message:
          "Unable to connect to the server. Please check your internet connection and try again.",
      };
    } else if (isNotFound) {
      return {
        type: "notfound",
        icon: FileX,
        title: "Assessment Not Found",
        message: `No assessment found for Student ID "${studentId}" in Course "${courseCode}"`,
      };
    } else {
      return {
        type: "error",
        icon: AlertCircle,
        title: "Error",
        message: errorMessage || "An unexpected error occurred",
      };
    }
  };

  const errorInfo = getErrorInfo();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="w-full max-w-7xl mx-auto p-6 space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4 py-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full">
              <RefreshCw className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Assesment ReGrade Request
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Search and modify individual student assessments for regrade
            requests
          </p>
        </div>

        {/* Search Form */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center space-x-2">
              <Search className="w-5 h-5" />
              <span>Search Student Assessment</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Search Teacher */}
              {/*   <div className="space-y-2">
                <Label
                  htmlFor="teacherId"
                  className="text-sm font-medium text-gray-700"
                >
                  Teacher
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="teacherId"
                    type="text"
                    placeholder="Enter Teacher ID"
                    value={teacherId}
                    onChange={(e) => setTeacherId(e.target.value)}
                    className="pl-10 h-11 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
              </div> */}
              <div className="py-4">
                <Label className="text-sm font-medium block mb-2 text-gray-800">
                  Search Teacher{" "}
                  <span className="text-red-500 font-bold text-lg">*</span>
                </Label>
                <TeacherSelect
                  departmentId={departmentId}
                  value={selectedTeacher?.id || ""}
                  onChange={handleTeacherSelect}
                />
              </div>
              {/* Student ID Input */}
              <div className="space-y-2">
                <Label
                  htmlFor="studentId"
                  className="text-sm font-medium text-gray-700"
                >
                  Student ID
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="studentId"
                    type="text"
                    placeholder="Enter Student ID"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="pl-10 h-11 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
              </div>

              {/* Course Code Input */}
              <div className="space-y-2">
                <Label
                  htmlFor="courseCode"
                  className="text-sm font-medium text-gray-700"
                >
                  Course Code
                </Label>
                <div className="relative">
                  <BookOpen className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="courseCode"
                    type="text"
                    placeholder="Enter Course Code"
                    value={courseCode}
                    onChange={(e) => setCourseCode(e.target.value)}
                    className="pl-10 h-11 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <Button
                  onClick={handleSearch}
                  disabled={!canSearch || isAssessmentLoading}
                  className="w-full h-11 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isAssessmentLoading ? (
                    <div className="flex items-center space-x-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Searching...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Search className="w-4 h-4" />
                      <span>Search</span>
                    </div>
                  )}
                </Button>
              </div>
            </div>
            {!canSearch && (
              <div className="mt-3 text-sm text-gray-500 text-center">
                Please fill in both Student ID and Course Code to search
              </div>
            )}
          </CardContent>
        </Card>

        {/* Assessment Results */}
        {searchTriggered && (
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center space-x-2">
                <GraduationCap className="w-5 h-5" />
                <span>Assessment Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {/* Loading State */}
              {isAssessmentLoading && (
                <div className="flex items-center justify-center py-24 space-x-3">
                  <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
                  <span className="text-purple-600 font-medium text-lg">
                    Searching for assessment...
                  </span>
                </div>
              )}

              {/* Error States or No Assessment Found */}
              {!isAssessmentLoading &&
                searchTriggered &&
                (isAssessmentError || !currentAssessment) && (
                  <div className="flex flex-col items-center justify-center py-24 space-y-4">
                    {(() => {
                      // If there's an API error, show the specific error
                      if (isAssessmentError && errorInfo) {
                        return (
                          <>
                            <div
                              className={`p-4 rounded-full ${
                                errorInfo.type === "network"
                                  ? "bg-red-100"
                                  : errorInfo.type === "notfound"
                                  ? "bg-orange-100"
                                  : "bg-red-100"
                              }`}
                            >
                              <errorInfo.icon
                                className={`w-12 h-12 ${
                                  errorInfo.type === "network"
                                    ? "text-red-500"
                                    : errorInfo.type === "notfound"
                                    ? "text-orange-500"
                                    : "text-red-500"
                                }`}
                              />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800">
                              {errorInfo.title}
                            </h3>
                            <p className="text-gray-600 text-center max-w-md">
                              {errorInfo.message}
                            </p>
                            {errorInfo.type === "network" && (
                              <Button
                                onClick={handleSearch}
                                variant="outline"
                                className="mt-4"
                              >
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Try Again
                              </Button>
                            )}
                          </>
                        );
                      } else {
                        // If API call was successful but returned no assessment data
                        return (
                          <>
                            <div className="p-4 rounded-full bg-orange-100">
                              <FileX className="w-12 h-12 text-orange-500" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800">
                              No Assessment Found
                            </h3>
                            <p className="text-gray-600 text-center max-w-md">
                              No assessment record exists for Student ID "
                              <span className="font-semibold">{studentId}</span>
                              " in Course "
                              <span className="font-semibold">
                                {courseCode}
                              </span>
                              "
                            </p>
                            <div className="text-sm text-gray-500 text-center max-w-md mt-2">
                              Please verify the Student ID and Course Code are
                              correct, or contact your administrator if you
                              believe this is an error.
                            </div>
                          </>
                        );
                      }
                    })()}
                  </div>
                )}

              {/* Assessment Found */}
              {currentAssessment &&
                !isAssessmentLoading &&
                !isAssessmentError && (
                  <>
                    {/* Student and Course Information */}
                    <div className="bg-purple-700/20 p-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-purple-900">
                        <div>
                          <span className="font-semibold">Student ID:</span>{" "}
                          {studentId}
                        </div>
                        <div>
                          <span className="font-semibold">Course Code:</span>{" "}
                          {courseCode}
                        </div>
                        <div>
                          <span className="font-semibold">Assessment ID:</span>{" "}
                          {currentAssessment.id}
                        </div>
                        <div>
                          <span className="font-semibold">Status:</span>{" "}
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              currentAssessment.assessmentGroup?.status ===
                              "APPROVED"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {currentAssessment.assessmentGroup?.status ||
                              "DRAFT"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Assessment Table */}
                    <div className="overflow-x-auto">
                      <Table>
                        <TableCaption className="text-gray-600 py-4 bg-gray-50/50">
                          <div className="flex items-center justify-center space-x-2">
                            <BookOpen className="w-4 h-4" />
                            <span>
                              Edit assessment marks and submit changes
                            </span>
                          </div>
                        </TableCaption>
                        <TableHeader>
                          <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                            <TableHead className="font-semibold text-gray-700 py-4">
                              <div>
                                {currentAssessment.practical1Type ||
                                  "Practical 1"}
                              </div>
                              <div className="text-xs text-gray-500 font-normal">
                                (Max: varies)
                              </div>
                            </TableHead>
                            <TableHead className="font-semibold text-gray-700 py-4">
                              <div>
                                {currentAssessment.practical2Type ||
                                  "Practical 2"}
                              </div>
                              <div className="text-xs text-gray-500 font-normal">
                                (Max: varies)
                              </div>
                            </TableHead>
                            <TableHead className="font-semibold text-gray-700 py-4">
                              <div>
                                {currentAssessment.practical3Type ||
                                  "Practical 3"}
                              </div>
                              <div className="text-xs text-gray-500 font-normal">
                                (Max: varies)
                              </div>
                            </TableHead>
                            <TableHead className="font-semibold text-gray-700 py-4">
                              P. Status
                            </TableHead>
                            <TableHead className="font-semibold text-gray-700 py-4 bg-blue-50">
                              <div>Total Practical</div>
                              <div className="text-xs text-blue-600 font-normal">
                                (Max: 70)
                              </div>
                            </TableHead>
                            <TableHead className="font-semibold text-gray-700 py-4">
                              <div>Theory</div>
                              <div className="text-xs text-gray-500 font-normal">
                                (Max: 30)
                              </div>
                            </TableHead>
                            <TableHead className="font-semibold text-gray-700 py-4">
                              T. Status
                            </TableHead>
                            <TableHead className="font-semibold text-gray-700 py-4 bg-indigo-50">
                              <div>Total Mark</div>
                              <div className="text-xs text-indigo-600 font-normal">
                                (Max: 100)
                              </div>
                            </TableHead>
                            <TableHead className="font-semibold text-gray-700 py-4">
                              Grade
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {(() => {
                            const studentDbId = currentAssessment.studentId!;
                            const local = assessments[studentDbId] || {};

                            // Get current values (local changes take priority)
                            const practical1 =
                              local.practical1 ??
                              currentAssessment.practical1 ??
                              null;
                            const practical2 =
                              local.practical2 ??
                              currentAssessment.practical2 ??
                              null;
                            const practical3 =
                              local.practical3 ??
                              currentAssessment.practical3 ??
                              null;
                            const theory =
                              local.theory ?? currentAssessment.theory ?? null;

                            // Dynamic calculations
                            const totalPractical =
                              (practical1 ?? 0) +
                              (practical2 ?? 0) +
                              (practical3 ?? 0);
                            const totalMark = totalPractical + (theory ?? 0);
                            const dynamicGrade = calculateGrade(totalMark);

                            // Dynamic status calculations
                            const practicalStatus =
                              totalPractical <= 70 ? "OK" : "Error";
                            const theoryStatus =
                              theory !== null && theory <= 30
                                ? "OK"
                                : theory === null
                                ? "N/A"
                                : "Error";

                            // Status colors
                            const getPracticalStatusColor = () => {
                              if (totalPractical === 0)
                                return "text-gray-500 bg-gray-100";
                              return totalPractical <= 70
                                ? "text-green-600 bg-green-100"
                                : "text-red-600 bg-red-100";
                            };

                            const getTheoryStatusColor = () => {
                              if (theory === null || theory === 0)
                                return "text-gray-500 bg-gray-100";
                              return theory <= 30
                                ? "text-green-600 bg-green-100"
                                : "text-red-600 bg-red-100";
                            };

                            // Helper function to validate practical marks
                            const validatePracticalUpdate = (
                              field: "practical1" | "practical2" | "practical3",
                              newValue: number
                            ) => {
                              // Check for negative values
                              if (newValue < 0) {
                                toast.error("Marks cannot be negative.");
                                return false;
                              }

                              const currentP1 =
                                field === "practical1"
                                  ? newValue
                                  : practical1 ?? 0;
                              const currentP2 =
                                field === "practical2"
                                  ? newValue
                                  : practical2 ?? 0;
                              const currentP3 =
                                field === "practical3"
                                  ? newValue
                                  : practical3 ?? 0;
                              const newTotal =
                                currentP1 + currentP2 + currentP3;

                              if (newTotal > 70) {
                                const otherMarks =
                                  (practical1 ?? 0) +
                                  (practical2 ?? 0) +
                                  (practical3 ?? 0) -
                                  (field === "practical1"
                                    ? practical1 ?? 0
                                    : field === "practical2"
                                    ? practical2 ?? 0
                                    : practical3 ?? 0);
                                const maxAllowed = 70 - otherMarks;
                                toast.error(
                                  `Cannot enter ${newValue}. Maximum allowed for this field is ${maxAllowed} (Total would be ${newTotal}/70).`
                                );
                                return false;
                              }
                              return true;
                            };

                            return (
                              <TableRow className="hover:bg-blue-50/50 transition-colors duration-200">
                                <AssessmentCell
                                  value={practical1}
                                  onChange={(value) => {
                                    const numValue = Number(value);
                                    if (
                                      validatePracticalUpdate(
                                        "practical1",
                                        numValue
                                      )
                                    ) {
                                      updateLocalAssessment(
                                        studentDbId,
                                        "practical1",
                                        numValue
                                      );
                                    }
                                  }}
                                />
                                <AssessmentCell
                                  value={practical2}
                                  onChange={(value) => {
                                    const numValue = Number(value);
                                    if (
                                      validatePracticalUpdate(
                                        "practical2",
                                        numValue
                                      )
                                    ) {
                                      updateLocalAssessment(
                                        studentDbId,
                                        "practical2",
                                        numValue
                                      );
                                    }
                                  }}
                                />
                                <AssessmentCell
                                  value={practical3}
                                  onChange={(value) => {
                                    const numValue = Number(value);
                                    if (
                                      validatePracticalUpdate(
                                        "practical3",
                                        numValue
                                      )
                                    ) {
                                      updateLocalAssessment(
                                        studentDbId,
                                        "practical3",
                                        numValue
                                      );
                                    }
                                  }}
                                />
                                <TableCell className="text-center py-4">
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium ${getPracticalStatusColor()}`}
                                  >
                                    {practicalStatus}
                                  </span>
                                  {totalPractical > 70 && (
                                    <div className="text-xs text-red-500 mt-1">
                                      Max: 70
                                    </div>
                                  )}
                                </TableCell>
                                <TableCell className="text-center py-4 bg-blue-50/50">
                                  <span
                                    className={`font-bold text-lg ${
                                      totalPractical <= 70
                                        ? "text-blue-700"
                                        : "text-red-600"
                                    }`}
                                  >
                                    {totalPractical}
                                  </span>
                                </TableCell>
                                <AssessmentCell
                                  value={theory}
                                  onChange={(value) => {
                                    const numValue = Number(value);
                                    if (numValue < 0) {
                                      toast.error(
                                        "Theory marks cannot be negative."
                                      );
                                      return;
                                    }
                                    if (numValue > 30) {
                                      toast.error(
                                        `Cannot enter ${numValue}. Theory marks cannot exceed 30.`
                                      );
                                      return;
                                    }
                                    updateLocalAssessment(
                                      studentDbId,
                                      "theory",
                                      numValue
                                    );
                                  }}
                                />
                                <TableCell className="text-center py-4">
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium ${getTheoryStatusColor()}`}
                                  >
                                    {theoryStatus}
                                  </span>
                                  {theory !== null && theory > 30 && (
                                    <div className="text-xs text-red-500 mt-1">
                                      Max: 30
                                    </div>
                                  )}
                                </TableCell>
                                <TableCell className="text-center py-4 bg-indigo-50/50">
                                  <span
                                    className={`font-bold text-lg ${
                                      totalMark <= 100
                                        ? "text-indigo-700"
                                        : "text-red-600"
                                    }`}
                                  >
                                    {totalMark}
                                  </span>
                                </TableCell>
                                <TableCell className="text-center py-4">
                                  <span
                                    className={`px-3 py-1 rounded-full text-sm font-bold ${getGradeColor(
                                      dynamicGrade
                                    )} transition-all duration-300`}
                                  >
                                    {dynamicGrade}
                                  </span>
                                  {totalMark !==
                                    (currentAssessment.totalMark ?? 0) && (
                                    <div className="text-xs text-blue-600 mt-1 font-medium">
                                      Changed
                                    </div>
                                  )}
                                </TableCell>
                              </TableRow>
                            );
                          })()}
                        </TableBody>
                      </Table>
                    </div>

                    {/* Assessment Summary */}
                    {(() => {
                      const studentDbId = currentAssessment.studentId!;
                      const local = assessments[studentDbId] || {};
                      const practical1 =
                        local.practical1 ?? currentAssessment.practical1 ?? 0;
                      const practical2 =
                        local.practical2 ?? currentAssessment.practical2 ?? 0;
                      const practical3 =
                        local.practical3 ?? currentAssessment.practical3 ?? 0;
                      const theory =
                        local.theory ?? currentAssessment.theory ?? 0;
                      const totalPractical =
                        practical1 + practical2 + practical3;
                      const remainingPractical = Math.max(
                        0,
                        70 - totalPractical
                      );
                      const remainingTheory = Math.max(0, 30 - theory);

                      return (
                        <div className="p-4 bg-gray-50 border-t">
                          <div className="grid grid-cols-3 md:grid-cols-2 gap-4 text-sm">
                            <div className="text-center">
                              <div className="font-medium text-gray-600">
                                Current Practical Total
                              </div>
                              <div
                                className={`text-lg font-bold ${
                                  totalPractical <= 70
                                    ? "text-blue-600"
                                    : "text-red-600"
                                }`}
                              >
                                {totalPractical} / 70
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="font-medium text-gray-600">
                                Current Theory
                              </div>
                              <div
                                className={`text-lg font-bold ${
                                  theory <= 30
                                    ? "text-blue-600"
                                    : "text-red-600"
                                }`}
                              >
                                {theory} / 30
                              </div>
                            </div>{" "}
                          </div>
                        </div>
                      );
                    })()}

                    {/* Re-grade Reason Section */}
                    <div className="p-6 bg-purple-50/50 border-t">
                      <div className="space-y-4">
                        <div>
                          <Label
                            htmlFor="regradeReason"
                            className="text-sm font-medium text-gray-700 mb-2 block"
                          >
                            Reason for Re-grade Request *
                          </Label>
                          <Textarea
                            id="regradeReason"
                            placeholder="Please provide a detailed reason for the re-grade request (e.g., calculation error, missing marks, etc.)"
                            value={regradeReason}
                            onChange={(e) => {
                              if (e.target.value.length <= 500) {
                                setRegradeReason(e.target.value);
                              }
                            }}
                            className="min-h-[100px] border-gray-300 focus:border-purple-500 focus:ring-purple-500 resize-none"
                            required
                          />
                          <div className="mt-2 text-xs text-gray-500">
                            Character count: {regradeReason.length}/500
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="p-6 bg-gray-50/50 border-t">
                      <div className="flex justify-end">
                        <Button
                          onClick={handleSubmit}
                          disabled={
                            createRegradeRequest.isPending ||
                            !regradeReason.trim() ||
                            regradeReason.trim().length < 10
                          }
                          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                          {createRegradeRequest.isPending ? (
                            <div className="flex items-center space-x-2">
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>Submitting...</span>
                            </div>
                          ) : (
                            <div className="flex items-center space-x-2">
                              <RefreshCw className="w-4 h-4" />
                              <span>Submit Re-grade Request</span>
                            </div>
                          )}
                        </Button>
                      </div>
                      {(!regradeReason.trim() ||
                        regradeReason.trim().length < 10) && (
                        <div className="mt-3 text-sm text-red-600 text-right">
                          {!regradeReason.trim()
                            ? "Please provide a reason for the re-grade request"
                            : "Reason must be at least 10 characters long"}
                        </div>
                      )}
                    </div>
                  </>
                )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
