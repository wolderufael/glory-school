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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateAssessmentRequest } from '@/utils/assessment';
import { useAssessments } from '@/lib/react-query/hooks/useAssessment';
import { ModuleInfoForm } from './moduleInfoForm';
import { AssessmentCell } from './assessmentCell';
import { useByteachingAssessment } from '@/lib/react-query/hooks/useByteachingAssessment';
import { GraduationCap, Users, BookOpen, Trophy, Loader2, AlertCircle } from 'lucide-react';

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
    const numericStudentId = parseInt(studentId.replace('ST', ''));
    return assessments[numericStudentId]?.gradeInLetter || 'F';
  };

  const getGradeColor = (grade: string) => {
    switch(grade) {
      case 'A': return 'text-emerald-600 bg-emerald-50 border border-emerald-200';
      case 'B': return 'text-blue-600 bg-blue-50 border border-blue-200';
      case 'C': return 'text-amber-600 bg-amber-50 border border-amber-200';
      case 'D': return 'text-orange-600 bg-orange-50 border border-orange-200';
      case 'F': return 'text-red-600 bg-red-50 border border-red-200';
      default: return 'text-gray-600 bg-gray-50 border border-gray-200';
    }
  };

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
            Streamline your assessment process with our comprehensive student grading platform
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
            <ModuleInfoForm handleGet={handleGetAssessment} />
          </CardContent>
        </Card>

        {/* Assessment Form */}
        <form onSubmit={handleSubmit}>
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Student Assessments</span>
                </div>
                {fetchedAssessments && fetchedAssessments.length > 0 && (
                  <div className="flex items-center space-x-2 text-white/90">
                    <Trophy className="w-4 h-4" />
                    <span className="text-sm">{fetchedAssessments.length} Students</span>
                  </div>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {isAssessmentsLoading && (
                <div className="flex items-center justify-center py-16 space-x-3">
                  <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                  <span className="text-blue-600 font-medium">Loading assessments...</span>
                </div>
              )}
              
              {isAssessmentsError && (
                <div className="flex items-center justify-center py-16 space-x-3">
                  <AlertCircle className="w-6 h-6 text-red-500" />
                  <span className="text-red-600 font-medium">
                    Error loading assessments: {assessmentsError?.message || 'Unknown error'}
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
                        <TableHead className="font-semibold text-gray-700 py-4">Student ID</TableHead>
                        <TableHead className="font-semibold text-gray-700 py-4">Full Name</TableHead>
                        <TableHead className="font-semibold text-gray-700 py-4">Sex</TableHead>
                        <TableHead className="font-semibold text-gray-700 py-4 text-center">Practical 1</TableHead>
                        <TableHead className="font-semibold text-gray-700 py-4 text-center">Practical 2</TableHead>
                        <TableHead className="font-semibold text-gray-700 py-4 text-center">Practical 3</TableHead>
                        <TableHead className="font-semibold text-gray-700 py-4 text-center">P. Status</TableHead>
                        <TableHead className="font-semibold text-gray-700 py-4 text-center bg-blue-50">Total Practical</TableHead>
                        <TableHead className="font-semibold text-gray-700 py-4 text-center">Theory</TableHead>
                        <TableHead className="font-semibold text-gray-700 py-4 text-center">T. Status</TableHead>
                        <TableHead className="font-semibold text-gray-700 py-4 text-center bg-indigo-50">Total Mark</TableHead>
                        <TableHead className="font-semibold text-gray-700 py-4 text-center">Grade</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {(fetchedAssessments && fetchedAssessments.length > 0 ? fetchedAssessments : []).map((item: any, index: number) => {
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
                          <TableRow 
                            key={studentId} 
                            className={`hover:bg-blue-50/50 transition-colors duration-200 ${
                              index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                            }`}
                          >
                            <TableCell className="font-medium text-gray-900 py-4">
                              <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                <span>{student?.user?.userMainId || ''}</span>
                              </div>
                            </TableCell>
                            <TableCell className="font-medium text-gray-900 py-4">{fullName}</TableCell>
                            <TableCell className="text-gray-700 py-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                sex === 'Male' ? 'bg-blue-100 text-blue-700' : 
                                sex === 'Female' ? 'bg-pink-100 text-pink-700' : 
                                'bg-gray-100 text-gray-700'
                              }`}>
                                {sex}
                              </span>
                            </TableCell>
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
                            <TableCell className="text-center py-4 bg-blue-50/50">
                              <span className="font-bold text-blue-700 text-lg">
                                {totalPractical}
                              </span>
                            </TableCell>
                            <TableCell className="text-center py-4">
                              <span className="font-medium text-gray-900">
                                {theory}
                              </span>
                            </TableCell>
                            <AssessmentCell
                              value={theoryStatus}
                              onChange={(value) => updateLocalAssessment(numericStudentId, 'theoryStatus', value ?? '')}
                              isStatus={true}
                              placeholder="null"
                            />
                            <TableCell className="text-center py-4 bg-indigo-50/50">
                              <span className="font-bold text-indigo-700 text-lg">
                                {totalMark}
                              </span>
                            </TableCell>
                            <TableCell className="text-center py-4">
                              <span className={`px-3 py-1 rounded-full text-sm font-bold ${getGradeColor(grade)}`}>
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
                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 font-semibold"
                          >
                            {isSubmitting ? (
                              <div className="flex items-center space-x-2">
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Submitting...</span>
                              </div>
                            ) : (
                              <div className="flex items-center space-x-2">
                                <Trophy className="w-4 h-4" />
                                <span>Submit Assessments</span>
                              </div>
                            )}
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default ListTable;