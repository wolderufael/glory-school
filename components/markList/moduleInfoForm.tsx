"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { useTeachingAssignment } from "@/lib/react-query/hooks/useTeachingAssignment";
import { AssessmentInfoResponse } from "@/utils/assessment";
import { getLocalStorage } from "@/utils/localStorage";

interface ModuleInfoFormProps {
  handleGet: (id: number) => void;
  isLoading: boolean;
  assessmentData: any;
  isError: boolean;
  error: Error | null;
}

export const ModuleInfoForm: React.FC<ModuleInfoFormProps> = ({
  isLoading,
  assessmentData,
  isError,
  error,
  handleGet,
}: ModuleInfoFormProps) => {
  //   const [teacherId, setTeacherId] = useState<number | null>(null)

  //  useEffect(()=>{
  //     const id = localStorage.getItem('teacherId')
  //     setTeacherId(Number(id))
  //  },[])

  //   const { data: assessmentData, isLoading, isError, error } = useTeachingAssignment(teacherId ?? 1);
  const currentSemester = getLocalStorage("academicSemesterName");
  const currentYear = getLocalStorage("academicYearName");

  const filteredAssessmentData = assessmentData?.filter(
    (assessment: AssessmentInfoResponse) =>
      assessment.academicYear.name === currentYear &&
      assessment.academicSemester.name === currentSemester
  );

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Module Information</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="text-blue-600 py-4">Loading module info...</div>
        )}
        {isError && (
          <div className="text-red-600 py-4">
            Error loading module info: {error?.message || ""}
          </div>
        )}
        {assessmentData && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell className="w-[150px]">Academic Year</TableCell>
                <TableCell className="w-[150px]">Department</TableCell>
                <TableCell className="w-[150px]">Section</TableCell>
                <TableCell className="w-[150px]">Course</TableCell>
                <TableCell className="w-[150px]">Semester</TableCell>
                <TableCell className="w-[150px]">Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAssessmentData.map((assessmentData: AssessmentInfoResponse) => (
                <TableRow key={assessmentData.id}>
                  <TableCell>{assessmentData.academicYear.name}</TableCell>
                  <TableCell>{assessmentData.department.name}</TableCell>
                  <TableCell>{assessmentData.section.sectionName}</TableCell>
                  <TableCell>{assessmentData.course.title}</TableCell>
                  <TableCell>{assessmentData.academicSemester.name}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      onClick={() => handleGet(assessmentData.id)}
                      disabled={isLoading}
                    >
                      {isLoading ? "Loading..." : "Get"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        {!isLoading && !isError && assessmentData.length === 0 && (
          <div className="text-gray-600 py-4">
            No module information available.
          </div>
        )}
      </CardContent>
    </Card>
  );
};
