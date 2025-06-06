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
  const { data: students, isLoading, error } = useStudent();
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
  const [assessmentRows, setAssessmentRows] = useState<any[]>([]); // store fetched assessment data
  const [fetchedAssessments, setFetchedAssessments] = useState<any[]>([]);
  const [fetching, setFetching] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [selectedTeachingAssignmentId, setSelectedTeachingAssignmentId] = useState<number | null>(null);
  const {
    data: fetchedAssessmentsData,
    isLoading: isAssessmentsLoading,
    isError: isAssessmentsError,
    error: assessmentsError,
    refetch: refetchAssessments
  } = useByteachingAssessment(selectedTeachingAssignmentId ?? 0);

  // When Get is clicked in ModuleInfoForm, update selectedTeachingAssignmentId
  const handleGetAssessment = (id: number) => {
    setSelectedTeachingAssignmentId(id);
    refetchAssessments();
  };

  // Fix handleGetMark to use the hook
  const handleGetMark = async (id: number) => {
    const assessmentResult = useByteachingAssessment(id);
    if (assessmentResult && assessmentResult.data) {
      setAssessmentRows(assessmentResult.data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!moduleInfo.academicYear || !moduleInfo.department || !moduleInfo.module) {
      alert('Please fill in the required module information');
      return;
    }
    

    const assessmentData: CreateAssessmentRequest[] = Object.entries(assessments).map(([studentId, assessment]) => ({
      teachingAssignmentId: moduleInfo.teachingAssignmentId,
      studentId: parseInt(studentId),
      practical1: assessment.practical1 || 0,
      practical2: assessment.practical2 || 0,
      practical3: assessment.practical3 || 0,
      theory: assessment.theory || 0,
      comment: assessment.comment || '',
    }));

    submitAssessments({
      teachingAssignmentId: moduleInfo.teachingAssignmentId,
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
        <ModuleInfoForm handleGet={handleGetAssessment} />
        {isAssessmentsLoading && (
          <div className="text-blue-600 py-4">Loading assessments...</div>
        )}
        {isAssessmentsError && (
          <div className="text-red-600 py-4">Error loading assessments: {assessmentsError?.message || ''}</div>
        )}
        <Card>
          <CardContent className="p-6">
            <Table>
              <TableCaption>Students Assessment - Edit marks and submit</TableCaption>
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
                {(fetchedAssessmentsData && fetchedAssessmentsData.length > 0 ? fetchedAssessmentsData : students)?.map((item: any) => {
                  // If fetchedAssessments, use its structure, else use StudentMark
                  const student = item.student || item;
                  const practical1 = item.practical1 ?? 0;
                  const practical2 = item.practical2 ?? 0;
                  const practical3 = item.practical3 ?? 0;
                  const theory = item.theory ?? 0;
                  const totalPractical = (practical1 || 0) + (practical2 || 0) + (practical3 || 0);
                  const totalMark = totalPractical + (theory || 0);
                  const grade = item.gradeInLetter || 'F';
                  const studentId = student.student_main_id || `ST${student.id}`;
                  const fullName = student.first_name ? `${student.first_name} ${student.middle_name} ${student.last_name}` : `${student.user?.firstName || ''} ${student.user?.middleName || ''} ${student.user?.lastName || ''}`;
                  return (
                    <TableRow key={studentId}>
                      <TableCell>{studentId}</TableCell>
                      <TableCell>{fullName}</TableCell>
                      <TableCell>{student.sex || student.gender || ''}</TableCell>
                      <TableCell>{student.id_no || student.idNo || ''}</TableCell>
                      <AssessmentCell
                        value={practical1}
                        onChange={(value) => updateLocalAssessment(student.id, 'practical1', value)}
                        max={30}
                        placeholder="0"
                      />
                      <AssessmentCell
                        value={practical2}
                        onChange={(value) => updateLocalAssessment(student.id, 'practical2', value)}
                        max={30}
                        placeholder="0"
                      />
                      <AssessmentCell
                        value={practical3}
                        onChange={(value) => updateLocalAssessment(student.id, 'practical3', value)}
                        max={40}
                        placeholder="0"
                      />
                      <TableCell className="font-medium">{totalPractical}</TableCell>
                      <AssessmentCell
                        value={theory}
                        onChange={(value) => updateLocalAssessment(student.id, 'theory', value)}
                        max={30}
                        placeholder="0"
                      />
                      <TableCell className="font-medium">{totalMark}</TableCell>
                      <TableCell className="font-medium">{grade}</TableCell>
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