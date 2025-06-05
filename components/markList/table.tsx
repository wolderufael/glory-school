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
import { ModuleInfoForm } from './moduleInfoForm';
import { EditableMarkCell } from './editablemarkcell';
import { StudentMark, useMarks } from '@/hooks/useMarks';

const ListTable = () => {
  const { data: students, isLoading, error } = useStudent();
  const { marks, updateMark, submitMarks, isSubmitting } = useMarks();
  
  const [moduleInfo, setModuleInfo] = useState({
    academicYear: '',
    department: '',
    sector: '',
    module: '',
    moduleCode: '',
    program: ''
  });

  // Initialize marks when students data is loaded
  useEffect(() => {
    if (students) {
      students.forEach((student: StudentMark) => {
        if (!marks[student.student_main_id]) {
          updateMark(student.student_main_id, 'student_main_id', student.student_main_id);
          updateMark(student.student_main_id, 'practical', student.practical || 0);
          updateMark(student.student_main_id, 'theory', student.theory || 0);
        }
      });
    }
  }, [students]);

  const handleModuleInfoChange = (field: string, value: string) => {
    setModuleInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!moduleInfo.academicYear || !moduleInfo.department || !moduleInfo.module) {
      alert('Please fill in the required module information');
      return;
    }
    
    await submitMarks();
  };

  const getMarkValue = (studentId: string, field: keyof StudentMark): number => {
    return marks[studentId]?.[field as keyof typeof marks[typeof studentId]] as number || 0;
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
              <TableCaption>Students Mark List - Edit marks and submit</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Full Name</TableHead>
                  <TableHead>Sex</TableHead>
                  <TableHead>ID.No</TableHead>
                  <TableHead>Practical (70%)</TableHead>
                  <TableHead>Theory (30%)</TableHead>
                  <TableHead>Total (100%)</TableHead>
                  <TableHead>Grade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students?.map((student: StudentMark) => (
                  <TableRow key={student.student_main_id}>
                    <TableCell>{student.student_main_id}</TableCell>
                    <TableCell>
                      {`${student.first_name} ${student.middle_name} ${student.last_name}`}
                    </TableCell>
                    <TableCell>{student.sex}</TableCell>
                    <TableCell>{student.id_no}</TableCell>
                    <EditableMarkCell
                      value={getMarkValue(student.student_main_id, 'practical')}
                      onChange={(value) => updateMark(student.student_main_id, 'practical', value)}
                      max={70}
                      placeholder="0"
                    />
                    <EditableMarkCell
                      value={getMarkValue(student.student_main_id, 'theory')}
                      onChange={(value) => updateMark(student.student_main_id, 'theory', value)}
                      max={30}
                      placeholder="0"
                    />
                    <TableCell className="font-medium">
                      {marks[student.student_main_id]?.total || 0}
                    </TableCell>
                    <TableCell className="font-medium">
                      {marks[student.student_main_id]?.grade_in_letter || 'F'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={8} className="text-right">
                    <Button 
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Marks'}
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