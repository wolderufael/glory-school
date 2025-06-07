"use client";

import React, { useState, useEffect } from "react";
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
import { useStudent } from "@/lib/react-query/hooks/useStudent";

import { Card, CardContent } from "@/components/ui/card";
import { CreateAssessmentRequest } from "@/utils/assessment";
import { useAssessments } from "@/lib/react-query/hooks/useAssessment";
import { ModuleInfoForm } from "./moduleInfoForm";
import { AssessmentCell } from "./assessmentCell";

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
  const [moduleInfo, setModuleInfo] = useState({
    teacherId: "",
    academicYearId: "",
    semesterId: "",
    level: "",
    departmentId: "",
    sectionId: "",
    moduleId: "",
    teachingAssignmentId: 1,
  });

  const {
    data: students,
    isLoading,
    error,
  } = useStudent({
    teacherId: moduleInfo.teacherId,
    academicYearId: moduleInfo.academicYearId,
    semesterId: moduleInfo.semesterId,
    level: moduleInfo.level,
    departmentId: moduleInfo.departmentId,
    sectionId: moduleInfo.sectionId,
    moduleId: moduleInfo.moduleId,
  });
  const {
    assessments,
    updateLocalAssessment,
    submitAssessments,
    isSubmitting,
  } = useAssessments();

  const handleModuleInfoChange = (field: string, value: string) => {
    setModuleInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !moduleInfo.academicYearId ||
      !moduleInfo.departmentId ||
      !moduleInfo.moduleId
    ) {
      alert("Please fill in the required module information");
      return;
    }

    const assessmentData: CreateAssessmentRequest[] = Object.entries(
      assessments
    ).map(([studentId, assessment]) => ({
      teachingAssignmentId: moduleInfo.teachingAssignmentId,
      studentId: parseInt(studentId),
      practical1: assessment.practical1 || 0,
      practical2: assessment.practical2 || 0,
      practical3: assessment.practical3 || 0,
      theory: assessment.theory || 0,
      comment: assessment.comment || "",
    }));

    submitAssessments({
      teachingAssignmentId: moduleInfo.teachingAssignmentId,
      assessments: assessmentData,
    });
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-lg">Loading students...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-red-500 text-lg">Error fetching students</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      <form onSubmit={handleSubmit}>
        <ModuleInfoForm
          moduleInfo={moduleInfo}
          onInfoChange={handleModuleInfoChange}
        />

        <Card>
          <CardContent className="p-6">
            <Table>
              <TableCaption>
                Students Assessment - Edit marks and submit
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Full Name</TableHead>
                  <TableHead>Sex</TableHead>
                  <TableHead>ID.No</TableHead>
                  <TableHead>Practical 1</TableHead>
                  <TableHead>Practical 2</TableHead>
                  <TableHead>Practical 3</TableHead>
                  <TableHead>Total Practical</TableHead>
                  <TableHead>Theory</TableHead>
                  <TableHead>Total Mark</TableHead>
                  <TableHead>Grade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students?.map((student: StudentMark) => {
                  const numericStudentId = parseInt(
                    student.student_main_id.replace("ST", "")
                  );
                  return (
                    <TableRow key={student.student_main_id}>
                      <TableCell>{student.student_main_id}</TableCell>
                      <TableCell>
                        {`${student.first_name} ${student.middle_name} ${student.last_name}`}
                      </TableCell>
                      <TableCell>{student.sex}</TableCell>
                      <TableCell>{student.id_no}</TableCell>
                      <AssessmentCell
                        value={getAssessmentValue(
                          student.student_main_id,
                          "practical1"
                        )}
                        onChange={(value) =>
                          updateLocalAssessment(
                            numericStudentId,
                            "practical1",
                            value
                          )
                        }
                        max={30}
                        placeholder="0"
                      />
                      <AssessmentCell
                        value={getAssessmentValue(
                          student.student_main_id,
                          "practical2"
                        )}
                        onChange={(value) =>
                          updateLocalAssessment(
                            numericStudentId,
                            "practical2",
                            value
                          )
                        }
                        max={30}
                        placeholder="0"
                      />
                      <AssessmentCell
                        value={getAssessmentValue(
                          student.student_main_id,
                          "practical3"
                        )}
                        onChange={(value) =>
                          updateLocalAssessment(
                            numericStudentId,
                            "practical3",
                            value
                          )
                        }
                        max={40}
                        placeholder="0"
                      />
                      <TableCell className="font-medium">
                        {getTotalPractical(student.student_main_id)}
                      </TableCell>
                      <AssessmentCell
                        value={getAssessmentValue(
                          student.student_main_id,
                          "theory"
                        )}
                        onChange={(value) =>
                          updateLocalAssessment(
                            numericStudentId,
                            "theory",
                            value
                          )
                        }
                        max={30}
                        placeholder="0"
                      />
                      <TableCell className="font-medium">
                        {getTotalMark(student.student_main_id)}
                      </TableCell>
                      <TableCell className="font-medium">
                        {getGrade(student.student_main_id)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={11} className="text-right">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Assessments"}
                    </Button>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default ListTable;
