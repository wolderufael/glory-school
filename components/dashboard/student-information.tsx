


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StudentInfoProps {
  academicYear: string;
  semester: string;
  program: string;
  programType: string;
  department: string;
}

export function StudentInfo({ 
  academicYear, 
  semester, 
  program, 
  programType, 
  department 
}: StudentInfoProps) {
  return (
    <Card className="bg-white border-slate-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-800">Academic Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-slate-600">Academic Year</label>
            <div className="text-sm text-slate-800 bg-slate-50 p-2 rounded border">
              {academicYear}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600">Semester</label>
            <div className="text-sm text-slate-800 bg-slate-50 p-2 rounded border">
              {semester}
            </div>
          </div>
        </div>
        
        <div>
          <label className="text-sm font-medium text-slate-600">Program</label>
          <div className="text-sm text-slate-800 bg-slate-50 p-2 rounded border">
            {program}
          </div>
        </div>
        
        <div>
          <label className="text-sm font-medium text-slate-600">Program Type</label>
          <div className="text-sm text-slate-800 bg-slate-50 p-2 rounded border">
            {programType}
          </div>
        </div>
        
        <div>
          <label className="text-sm font-medium text-slate-600">Department</label>
          <div className="text-sm text-slate-800 bg-slate-50 p-2 rounded border">
            {department}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}