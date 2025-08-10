"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { AssessmentInfoResponse } from "@/utils/assessment";
import { getLocalStorage } from "@/utils/localStorage";
import {
  BookOpen,
  GraduationCap,
  Calendar,
  Users,
  AlertCircle,
  Sparkles,
} from "lucide-react";

// Mock data for high school modules
const mockHighSchoolModules = [
  {
    id: 1,
    course: {
      title: "Mathematics Grade 10",
      courseCode: "MATH-10A",
    },
    section: { sectionName: "10-A" },
    department: { name: "Mathematics" },
    academicYear: { name: "2024/25" },
    academicSemester: { name: "First Semester" },
  },
  {
    id: 2,
    course: {
      title: "Physics Grade 11",
      courseCode: "PHYS-11B",
    },
    section: { sectionName: "11-B" },
    department: { name: "Science" },
    academicYear: { name: "2024/25" },
    academicSemester: { name: "First Semester" },
  },
  {
    id: 3,
    course: {
      title: "Chemistry Grade 12",
      courseCode: "CHEM-12A",
    },
    section: { sectionName: "12-A" },
    department: { name: "Science" },
    academicYear: { name: "2024/25" },
    academicSemester: { name: "First Semester" },
  },
  {
    id: 4,
    course: {
      title: "English Literature Grade 11",
      courseCode: "ENG-11A",
    },
    section: { sectionName: "11-A" },
    department: { name: "English" },
    academicYear: { name: "2024/25" },
    academicSemester: { name: "First Semester" },
  },
  {
    id: 5,
    course: {
      title: "Biology Grade 10",
      courseCode: "BIO-10B",
    },
    section: { sectionName: "10-B" },
    department: { name: "Science" },
    academicYear: { name: "2024/25" },
    academicSemester: { name: "First Semester" },
  },
];

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
  const currentSemester =
    getLocalStorage("academicSemesterName") || "First Semester";
  const currentYear = getLocalStorage("academicYearName") || "2024/25";
  const [selectedModule, setSelectedModule] = useState<string>("");
  const [mockIsLoading, setMockIsLoading] = useState(true);

  // Use mock data instead of assessmentData
  // For mock data, always show all modules regardless of localStorage filters
  const filteredAssessmentData = mockHighSchoolModules;

  // Simulate loading for mock data
  useEffect(() => {
    setTimeout(() => setMockIsLoading(false), 500);
  }, []);

  const handleModuleSelect = (value: string) => {
    setSelectedModule(value);
    const selectedAssessment = filteredAssessmentData?.find(
      (assessment) => assessment.id.toString() === value
    );
    if (selectedAssessment) {
      handleGet(selectedAssessment.id);
    }
  };

  const getSelectedAssessment = () => {
    return filteredAssessmentData?.find(
      (assessment) => assessment.id.toString() === selectedModule
    );
  };

  return (
    <Card className="mb-6 border border-gray-200 shadow-sm">
      <CardContent className="p-4">
        {mockIsLoading && (
          <div className="flex items-center gap-2 py-4">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>
            <span className="text-sm text-gray-600">Loading modules...</span>
          </div>
        )}
        {!mockIsLoading && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <label className="text-lg font-semibold text-gray-800 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-lg">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                Choose your course module
              </label>
              <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full border border-emerald-200">
                <Sparkles className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-700">
                  {filteredAssessmentData.length} available
                </span>
              </div>
            </div>

            <Select
              value={selectedModule}
              onValueChange={handleModuleSelect}
              disabled={mockIsLoading}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose a course module..." />
              </SelectTrigger>
              <SelectContent className="w-full max-w-4xl border-0 shadow-2xl bg-white/95 backdrop-blur-lg rounded-2xl">
                {filteredAssessmentData.map((assessment, index: number) => (
                  <SelectItem
                    key={assessment.id}
                    value={assessment.id.toString()}
                    className="py-4 px-6 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 cursor-pointer focus:bg-gradient-to-r focus:from-blue-50 focus:to-indigo-50 border-b border-gray-100 last:border-b-0 transition-all duration-200"
                  >
                    <div className="flex items-center gap-4 w-full">
                      <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                        <BookOpen className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex flex-col space-y-2 flex-1 min-w-0">
                        <div className="text-gray-900 text-sm truncate">
                          {assessment.course.title}
                        </div>
                        {/*                           <div className="flex items-center gap-3 text-sm flex-wrap">
                            <span className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                              <Users className="h-3 w-3" />
                              {assessment.department.name}
                            </span>
                            <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                              <GraduationCap className="h-3 w-3" />
                              {assessment.section.sectionName}
                            </span>
                            <span className="flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">
                              <Calendar className="h-3 w-3" />
                              {assessment.academicSemester.name}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-md inline-block w-fit">
                            Academic Year: {assessment.academicYear.name}
                          </div> */}
                      </div>
                      <div className="text-xl font-bold text-gray-300">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedModule && getSelectedAssessment() && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full flex-shrink-0"></div>
                  <div className="flex flex-col min-w-0 flex-1 gap-1">
                    <div className="font-semibold text-base text-gray-900 truncate">
                      {getSelectedAssessment()?.course.title}
                    </div>
                    <div className="text-sm text-gray-600 truncate">
                      {getSelectedAssessment()?.department.name}{" "}
                      {getSelectedAssessment()?.section.sectionName} -{" "}
                      {getSelectedAssessment()?.academicYear.name}-{" "}
                      {getSelectedAssessment()?.academicSemester.name}
                    </div>
                  </div>
                  <div className="text-xs text-blue-600 font-medium bg-blue-100 px-2 py-1 rounded">
                    Selected
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
