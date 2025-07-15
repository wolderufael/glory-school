"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertTriangle, RefreshCw } from "lucide-react";
import { useUpdateReregistration } from "@/lib/react-query/mutations/useUpdateReregistration";
import {
  useReregistration,
  useReregistrationByStudent,
} from "@/lib/react-query/hooks/useReregistration";
import { getLocalStorage } from "@/utils/localStorage";
import { useAuthStore } from "@/lib/store/authStore";
import { getNextLevel } from "@/utils/romanNumerals";

interface ReregistrationData {
  academicSemester: string;
  academicYear: string;
  level: string;
  status: "PASS" | "FAIL";
  gpa: number;
  cumulativeGPA: number;
  nextSemester?: string;
  nextLevel?: string;
}

interface ReregistrationProps {
  onReregister?: () => void;
}

export default function Reregistration({ onReregister }: ReregistrationProps) {
  const studentId = getLocalStorage("studentId");
  const reregistrationMutation = useUpdateReregistration(studentId || "");
  const { data: reregistrationData, isLoading } = useReregistrationByStudent(
    Number(studentId)
  );
  console.log(
    "reregistrationData in the reregistration component",
    reregistrationData
  );
  if (!studentId) throw new Error("Student ID not found");
  const { user } = useAuthStore();
  const currentLevel = user?.student?.currentStudyingLevel || "I";
  const currentStudyingYear = user?.student?.currentStudyingYear || "1";
  const currentStudyingSemester = user?.student?.currentStudyingSemester || "1";
  const nextLevel = getNextLevel(currentLevel);

  const handleReregistration = () => {
    if (!reregistrationData) return;

    // Calculate next semester and year based on current semester
    let nextSemester: string;
    let nextYear: string;

    if (currentStudyingSemester === "2") {
      // If current semester is 2, add 1 to current year and make semester 1
      nextSemester = "1";
      nextYear = (parseInt(currentStudyingYear) + 1).toString();
    } else {
      // If current semester is 1, make semester 2 and preserve current year
      nextSemester = "2";
      nextYear = currentStudyingYear;
    }

    reregistrationMutation.mutate(
      {
        studentId,
        academicSemesterId: Number(getLocalStorage("academicSemesterId")) || 0,
        academicYearId: Number(getLocalStorage("academicYearId")) || 0,
        currentStudyingYear: nextYear,
        currentStudyingSemester: nextSemester,
        currentStudyingLevel: nextLevel,
      },
      {
        onSuccess: () => {
          // Refetch reregistration data after successful registration
          if (onReregister) {
            onReregister();
          }
        },
      }
    );
  };

  const getStatusIcon = (hasPassed: boolean) => {
    switch (hasPassed) {
      case true:
        return <CheckCircle className="h-6 w-6 text-green-600" />;
      case false:
        return <XCircle className="h-6 w-6 text-red-600" />;
      default:
        return <AlertTriangle className="h-6 w-6 text-yellow-600" />;
    }
  };

  const getStatusColor = (hasPassed: boolean) => {
    switch (hasPassed) {
      case true:
        return "bg-blue-100 text-blue-800 border-blue-200";
      case false:
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
    }
  };

  const getGPAColor = (gpa: number) => {
    if (gpa >= 3.5) return "text-green-600 font-bold";
    if (gpa >= 3.0) return "text-blue-600 font-bold";
    if (gpa >= 2.5) return "text-yellow-600 font-bold";
    return "text-red-600 font-bold";
  };

  /*   if (isLoading) {
    return (
      <Card className="w-full mb-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5 animate-spin" />
            Loading Registration Status...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </CardContent>
      </Card>
    );
  } */

  // Check if reregistrationData is null, undefined, or empty object
  if (!reregistrationData || Object.keys(reregistrationData).length === 0) {
    return null; // Don't render anything if data is empty
  }

  return (
    <Card className="w-full mb-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            {getStatusIcon(reregistrationData.hasPassed)}
            Academic Status & Reregistration
          </span>
          <Badge className={getStatusColor(reregistrationData.hasPassed)}>
            {reregistrationData.hasPassed ? "Passed" : "Failed"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Academic Information */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">Academic Year</p>
            <p className="font-semibold">
              {reregistrationData.academicYear.name}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">Semester</p>
            <p className="font-semibold">
              {reregistrationData.academicSemester.name}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">Level</p>
            <p className="font-semibold">{nextLevel}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">Status</p>
            <p
              className={`font-bold ${
                reregistrationData.hasPassed === true
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {reregistrationData.hasPassed ? "Passed" : "Failed"}
            </p>
          </div>
        </div>

        {/* GPA Information */}
        <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500 mb-1">
              Semester GPA
            </p>
            <p className={`text-2xl ${getGPAColor(reregistrationData.gpa)}`}>
              {reregistrationData.gpa.toFixed(2)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500 mb-1">
              Cumulative GPA
            </p>
            <p className={`text-2xl ${getGPAColor(reregistrationData.cgpa)}`}>
              {reregistrationData.cgpa.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Status Message */}
        <div
          className={`p-4 rounded-lg border-l-4 ${
            reregistrationData.hasPassed === true
              ? "bg-green-50 border-green-400"
              : "bg-red-50 border-red-400"
          }`}
        >
          {reregistrationData.hasPassed === true ? (
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-green-800 mb-2">
                    Congratulations! You have successfully passed semsster{" "}
                    {reregistrationData.academicSemester.name} -{" "}
                    {reregistrationData.academicYear.name}
                  </h4>
                  <p className="text-green-700 mb-3">
                    Based on your academic performance with a GPA of{" "}
                    <span className="font-bold">
                      {reregistrationData.gpa.toFixed(2)}
                    </span>{" "}
                    and cumulative GPA of{" "}
                    <span className="font-bold">
                      {reregistrationData.cgpa.toFixed(2)}
                    </span>
                    , you are eligible to register for the next semester.
                  </p>
                  <p className="text-green-700 text-sm">
                    <strong>Next Step:</strong> Please complete your
                    reregistration for {nextLevel} -{" "}
                    {reregistrationData.academicYear.name} {}
                    {""}
                    by clicking the button below. Registration must be completed
                    within the specified deadline.
                  </p>
                </div>
              </div>

              <Button
                onClick={handleReregistration}
                disabled={reregistrationMutation.isPending}
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white"
              >
                {reregistrationMutation.isPending ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Processing Registration...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Register for Next Semester
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <XCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-red-800 mb-2">
                    Academic Requirements Not Met
                  </h4>
                  <p className="text-red-700 mb-2">
                    Unfortunately, you have not met the minimum academic
                    requirements to advance to the next semester. Your current
                    GPA of{" "}
                    <span className="font-bold">
                      {reregistrationData.gpa.toFixed(2)}
                    </span>{" "}
                    does not meet the university's progression standards.
                  </p>
                  <p className="text-red-700 text-sm">
                    <strong>Next Steps:</strong> Please contact your academic
                    advisor or the registrar office to discuss your options,
                    which may include retaking courses, academic probation, or
                    other remedial measures.
                  </p>
                </div>
              </div>

              <div className="mt-4 p-3 bg-red-100 rounded border">
                <p className="text-red-800 text-sm font-medium">
                  📞 For assistance, contact the Registrar Office or your
                  Academic Advisor
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Additional Information */}
        <div className="text-xs text-gray-500 border-t pt-4">
          <p>
            * Registration deadlines and academic policies are subject to
            university regulations. For detailed information, please refer to
            the academic calendar and student handbook.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
