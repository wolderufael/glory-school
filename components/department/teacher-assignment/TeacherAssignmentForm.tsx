"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GraduationCap, Users, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import CourseList from "./CourseList";
import { useSection } from "@/lib/react-query/hooks/useSection";
import { getLocalStorage } from "@/utils/localStorage";

interface TeacherAssignmentFormData {
  departmentId: string;
  courseId: string;
  sectionId: string;
  grade: string;
  academicSemesterId: string;
  academicYearId: string;
}

interface TeacherAssignmentFormProps {
  departmentId: string;
}

const GRADES = [
  { value: "9", label: "Grade 9" },
  { value: "10", label: "Grade 10" },
  { value: "11", label: "Grade 11" },
  { value: "12", label: "Grade 12" },
] as const;

// Mock sections data for high school
const mockSections = [
  { id: "1", sectionName: "Section A", grade: "9", gradeId: "9" },
  { id: "2", sectionName: "Section B", grade: "9", gradeId: "9" },
  { id: "3", sectionName: "Section A", grade: "10", gradeId: "10" },
  { id: "4", sectionName: "Section B", grade: "10", gradeId: "10" },
  { id: "5", sectionName: "Section A", grade: "11", gradeId: "11" },
  { id: "6", sectionName: "Section B", grade: "11", gradeId: "11" },
  { id: "7", sectionName: "Section A", grade: "12", gradeId: "12" },
  { id: "8", sectionName: "Section B", grade: "12", gradeId: "12" },
];

const TeacherAssignmentForm = ({
  departmentId,
}: TeacherAssignmentFormProps) => {
  const [formData, setFormData] = useState<TeacherAssignmentFormData>({
    courseId: "",
    departmentId,
    sectionId: "", // Default to first section
    grade: "", // Default to first grade
    academicSemesterId: getLocalStorage("academicSemesterId") || "",
    academicYearId: getLocalStorage("academicYearId") || "",
  });

  // Filter sections based on selected grade using mock data
  const sections = mockSections.filter((section) =>
    formData.grade ? section.gradeId === formData.grade : false
  );

  const handleGradeChange = (value: string) => {
    setFormData({ ...formData, grade: value, courseId: "", sectionId: "" });
  };

  const handleSectionChange = (value: string) => {
    setFormData({ ...formData, sectionId: value, courseId: "" });
  };

  const resetForm = () => {
    setFormData({
      departmentId,
      courseId: "",
      sectionId: "",
      grade: "",
      academicSemesterId: getLocalStorage("academicSemesterId") || "",
      academicYearId: getLocalStorage("academicYearId") || "",
    });
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Card className="shadow-xl max-w-6xl mx-auto border border-indigo-100 rounded-2xl overflow-hidden">
          <CardHeader className="space-y-1 text-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-8">
            <div className="flex justify-center mb-3">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30">
                <Users className="w-7 h-7 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold tracking-tight">
              Subject Teacher Assignment
            </CardTitle>
            <CardDescription className="text-blue-100 max-w-2xl mx-auto">
              Assign teachers to high school subjects across different grades
              and sections
            </CardDescription>
            <div className="flex justify-center pt-4">
              <div className="w-24 h-1 bg-blue-300 rounded-full"></div>
            </div>
          </CardHeader>

          <CardContent className="py-8 px-6">
            <div className="space-y-8">
              {/* Form Header */}
              <div className="text-center mb-8">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 justify-center">
                  <GraduationCap className="w-5 h-5 text-indigo-600" />
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Assignment Details
                  </span>
                </h2>
                <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
                  Select the grade and section to view available subjects for
                  teacher assignment
                </p>
              </div>

              {/* Grade and Section Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Grade Selection Card */}
                <Card className="border border-blue-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <span className="text-blue-800 font-bold">G</span>
                        </div>
                        <Label className="text-sm font-medium text-gray-700">
                          Grade Level
                        </Label>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        {GRADES.map(({ value, label }) => (
                          <Button
                            key={value}
                            variant={
                              formData.grade === value ? "default" : "outline"
                            }
                            className={cn(
                              "h-12 transition-all duration-300",
                              formData.grade === value
                                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                                : "bg-white hover:bg-blue-50 border-blue-100"
                            )}
                            onClick={() => handleGradeChange(value)}
                          >
                            {label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Section Selection Card */}
                <Card className="border border-purple-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <span className="text-purple-800 font-bold">S</span>
                        </div>
                        <Label className="text-sm font-medium text-gray-700">
                          Class Section
                        </Label>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        {sections.map(({ id, sectionName }) => (
                          <Button
                            key={id}
                            variant={
                              formData.sectionId === id ? "default" : "outline"
                            }
                            className={cn(
                              "h-12 transition-all duration-300",
                              formData.sectionId === id
                                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                                : "bg-white hover:bg-purple-50 border-purple-100"
                            )}
                            onClick={() => handleSectionChange(id)}
                          >
                            {sectionName}
                          </Button>
                        ))}
                      </div>
                      {formData.grade && sections.length === 0 && (
                        <p className="text-sm text-gray-500 text-center py-4">
                          No sections available for selected grade
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Subject List */}
              <div className="mt-8">
                <Card className="border border-gray-200 rounded-xl shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-gray-800">
                      <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        Available Subjects
                      </span>
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      Select a subject to assign teachers
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CourseList
                      departmentId={departmentId}
                      gradeId={formData.grade}
                      sectionId={formData.sectionId}
                      academicSemesterId={formData.academicSemesterId}
                      selectedCourseId={formData.courseId}
                      academicYearId={formData.academicYearId}
                      onCourseSelect={(courseId) =>
                        setFormData({ ...formData, courseId })
                      }
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-6 border-t border-gray-100 mt-8">
                <Button
                  type="button"
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  onClick={resetForm}
                >
                  <RefreshCw className="w-4 h-4" />
                  Reset Selection
                </Button>

                <Button
                  type="button"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg transition-all"
                  disabled={!formData.courseId}
                >
                  Assign Teacher
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherAssignmentForm;
