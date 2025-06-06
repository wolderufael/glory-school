'use client';

import React, { useState, useEffect } from 'react';
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
import { CreateAssessmentRequest } from '@/utils/assessment';
import { useAssessments } from '@/lib/react-query/hooks/useAssessment';
import { ModuleInfoForm } from './moduleInfoForm';
import { AssessmentCell } from './assessmentCell';
import { useByteachingAssessment } from '@/lib/react-query/hooks/useByteachingAssessment';


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
  const { assessments, updateLocalAssessment, submitAssessments, isSubmitting } = useAssessments();
  const [moduleInfo, setModuleInfo] = useState({
    academicYear: '',
    department: '',
    sector: '',
    module: '',
    moduleCode: '',
    program: '',
    teachingAssignmentId: 1
  });
  const [selectedTeachingAssignmentId, setSelectedTeachingAssignmentId] = useState<number | null>(null);

  // Fetch assessment data for the selected teaching assignment
  const {
    data: fetchedAssessments,
    isLoading: isAssessmentsLoading,
    isError: isAssessmentsError,
    error: assessmentsError,
    refetch: refetchAssessments
  } = useByteachingAssessment(selectedTeachingAssignmentId ?? 0);

  // Handle Get button from ModuleInfoForm
  const handleGetAssessment = (id: number) => {
    setSelectedTeachingAssignmentId(id);
    refetchAssessments();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTeachingAssignmentId) {
      alert('Please select a module and click Get first.');
      return;
    }
    // Only send students whose marks have been updated locally
    const updatedStudentIds = Object.keys(assessments);
    if (updatedStudentIds.length === 0) {
      alert('No changes to submit.');
      return;
    }
    const assessmentData: CreateAssessmentRequest[] = updatedStudentIds.map((studentId) => {
      const numericStudentId = Number(studentId);
      const local = assessments[numericStudentId] || {};
      // Find the original fetched row for this student
      const fetched = (fetchedAssessments || []).find((item: any) => (item.student?.id === numericStudentId));
      const practical1 = local.practical1 ?? fetched?.practical1 ?? 0;
      const practical2 = local.practical2 ?? fetched?.practical2 ?? 0;
      const practical3 = local.practical3 ?? fetched?.practical3 ?? 0;
      const theory = local.theory ?? fetched?.theory ?? 0;
      const comment = local.comment ?? fetched?.comment ?? '';
      const practicalStatus = local.practicalStatus ?? fetched?.practicalStatus ?? null;
      const theoryStatus = local.theoryStatus ?? fetched?.theoryStatus ?? null;

      // Calculate totals
      const totalPractical = practical1 + practical2 + practical3;
      const totalMark = totalPractical + theory;
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
        comment,
        // Optionally include totalPractical and totalMark if backend expects them
        // totalPractical,
        // totalMark,
      };
    });

    console.log('Submitting assessments:', assessmentData);
    submitAssessments({
      teachingAssignmentId: selectedTeachingAssignmentId,
      assessments: assessmentData,
    });
  };

  const getAssessmentValue = (studentId: string, field: keyof typeof assessments[number]): number => {
    const numericStudentId = parseInt(studentId.replace('ST', ''));
    return assessments[numericStudentId]?.[field] as number || 0;
  };

  const getTotalPractical = (studentId: string): number => {
    const numericStudentId = parseInt(studentId.replace('ST', ''));
    const assessment = assessments[numericStudentId];
    return (assessment?.practical1 || 0) + (assessment?.practical2 || 0) + (assessment?.practical3 || 0);
  };

  const getTotalMark = (studentId: string): number => {
    const numericStudentId = parseInt(studentId.replace('ST', ''));
    const assessment = assessments[numericStudentId];
    return getTotalPractical(studentId) + (assessment?.theory || 0);
  };

  const getGrade = (studentId: string): string => {
    const numericStudentId = parseInt(studentId.replace('ST', ''));
    return assessments[numericStudentId]?.gradeInLetter || 'F';
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      <ModuleInfoForm handleGet={handleGetAssessment} />
      <form onSubmit={handleSubmit}>
        <Card>
          <CardContent className="p-6">
            {isAssessmentsLoading && (
              <div className="text-blue-600 py-4">Loading assessments...</div>
            )}
            {isAssessmentsError && (
              <div className="text-red-600 py-4">Error loading assessments: {assessmentsError?.message || ''}</div>
            )}
            <Table>
              <TableCaption>Students Assessment - Edit marks and submit</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Full Name</TableHead>
                  <TableHead>Sex</TableHead>
                  <TableHead>Practical 1</TableHead>
                  <TableHead>Practical 2</TableHead>
                  <TableHead>Practical 3</TableHead>
                  <TableHead>Practical Status</TableHead>
                  <TableHead>Total Practical</TableHead>
                  <TableHead>Theory</TableHead>
                  <TableHead>Theory Status</TableHead>
                  <TableHead>Total Mark</TableHead>
                  <TableHead>Grade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                  {(fetchedAssessments && fetchedAssessments.length > 0 ? fetchedAssessments : []).map((item: any) => {
                    const student = item.student;
                    const studentId = student?.id;
                    const numericStudentId = Number(studentId);
                    // Use local edits if present, else fallback to fetched values
                    const local = assessments[numericStudentId] || {};
                    const practical1 = local.practical1 ?? item.practical1 ?? 0;
                    const practical2 = local.practical2 ?? item.practical2 ?? 0;
                    const practical3 = local.practical3 ?? item.practical3 ?? 0;
                    const practicalStatus = local.practicalStatus || null;
                    const theoryStatus = local.theoryStatus || null;
                    const theory = local.theory ?? item.theory ?? 0;
                    const totalPractical = practical1 + practical2 + practical3;
                    const totalMark = totalPractical + theory;
                    const grade = item.gradeInLetter || 'F';
                    const fullName = student?.user?.firstName
                      ? `${student.user.firstName} ${student.user.middleName ?? ''} ${student.user.lastName ?? ''}`
                      : 'Unknown Student';
                    const sex = student?.user?.gender || 'N/A';
                    return (
                     <TableRow key={studentId}>
                      <TableCell>{student?.user?.userMainId || ''}</TableCell>
                      <TableCell>{fullName}</TableCell>
                      <TableCell>{sex}</TableCell>
                      <AssessmentCell
                        value={practical1}
                        onChange={(value) => updateLocalAssessment(numericStudentId, 'practical1', Number(value))}
                        max={30}
                      />
                      <AssessmentCell
                        value={practical2}
                        onChange={(value) => updateLocalAssessment(numericStudentId, 'practical2', Number(value))}
                        max={30}
                      />
                      <AssessmentCell
                        value={practical3}
                        onChange={(value) => updateLocalAssessment(numericStudentId, 'practical3', Number(value))}
                        max={30}
                      />
                        <AssessmentCell
                        value={practicalStatus}
                        onChange={(value) => updateLocalAssessment(numericStudentId, 'practicalStatus', value ?? '')}
                        isStatus={true}
                        placeholder="null"
                      />
                      <TableCell>{totalPractical}</TableCell>
                      <TableCell>{theory}</TableCell>
                      <AssessmentCell
                        value={theoryStatus}
                        onChange={(value) => updateLocalAssessment(numericStudentId, 'theoryStatus', value ?? '')}
                        isStatus={true}
                        placeholder="null"
                      />
                      <TableCell>{totalMark}</TableCell>
                      <TableCell>{grade}</TableCell>
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
                      {isSubmitting ? 'Submitting...' : 'Submit Assessments'}
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