"use client";

import { StudentForm } from "@/components/studentForm/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RegistrarEnrollmentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">
              Temporary Student Management
            </CardTitle>
          </CardHeader>
          <CardContent>
{/*             <p className="text-gray-600 mb-4">
              Add temporary students and generate their IDs based on
              alphabetical order and academic year. The generated IDs will
              follow the format: DEPT_CODE/YEAR/SEQUENCE
            </p> */}
          </CardContent>
        </Card>

        <StudentForm />
      </div>
    </div>
  );
}
