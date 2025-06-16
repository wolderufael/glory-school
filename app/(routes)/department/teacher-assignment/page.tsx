"use client";

/* import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; */
import TeacherAssignmentForm from "@/components/department/teacher-assignment/TeacherAssignmentForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Users, BookOpen } from "lucide-react";
import TeacherSelect from "@/components/department/teacher-assignment/TeacherSelect";

// This would come from your auth context in a real app
const MOCK_DEPARTMENT_ID = "1"; // Replace with actual department ID from auth

export default function DepartmentPage() {
  return (
    <div className="container mx-auto py-6">
      {/* Department Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Building2 className="h-8 w-8 text-blue-600" />
          Department Dashboard
        </h1>
        <p className="text-gray-600 mt-2">
          Manage department resources, teachers, and course assignments
        </p>
      </div>

      {/* Main Content */}
      <div className="w-full">
        <TeacherAssignmentForm departmentId={MOCK_DEPARTMENT_ID} />
      </div>
    </div>
  );
}
