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
import { GraduationCap, Users } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import CourseList from "./CourseList";

interface TeacherAssignmentFormData {
  departmentId: string;
  courseId: string;
  sectionId: string;
  level: string;
  academicSemesterId: string;
}

interface TeacherAssignmentFormProps {
  departmentId: string;
}

const LEVELS = [
  { value: "I", label: "I" },
  { value: "II", label: "II" },
  { value: "III", label: "III" },
  { value: "IV", label: "IV" },
] as const;

const SECTIONS = [
  { value: "1", label: "A" },
  /*   { value: "2", label: "B" },
  { value: "3", label: "C" },
  { value: "4", label: "D" }, */
] as const;

const TeacherAssignmentForm = ({
  departmentId,
}: TeacherAssignmentFormProps) => {
  const [formData, setFormData] = useState<TeacherAssignmentFormData>({
    courseId: "",
    departmentId,
    sectionId: "",
    level: "",
    academicSemesterId: "1",
  });

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Card className="shadow-md max-w-6xl mx-auto">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">
              Assign Teacher to Section
            </CardTitle>
            <CardDescription>
              Manage course assignments for teachers in different sections
            </CardDescription>
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 flex items-center gap-2 justify-center">
              <GraduationCap className="w-5 h-5" />
              Assignment Details
            </h3>
          </CardHeader>

          <div>
            <CardContent className="w-[90%] mx-auto gap-4 rounded-lg">
              <div className="space-y-4">
                <div className="flex justify-center p-6 rounded-xl">
                  {/* Level and Section Selection */}
                  <div className="w-full max-w-4xl border border-gray-200 rounded-xl bg-white p-6">
                    <div className="grid grid-cols-2 gap-8">
                      {/* Level Selection */}
                      <div className="space-y-2">
                        <Label className="text-sm font-medium block mb-2">
                          Level <span className="text-red-500">*</span>
                        </Label>
                        <RadioGroup
                          className="flex justify-start items-center gap-6"
                          value={formData.level}
                          onValueChange={(value) =>
                            setFormData({ ...formData, level: value })
                          }
                        >
                          {LEVELS.map(({ value, label }) => (
                            <div
                              key={value}
                              className="flex flex-col items-center"
                            >
                              <RadioGroupItem
                                value={value}
                                id={`level-${value}`}
                                className="h-6 w-6 border-2 border-gray-300 data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600"
                              />
                              <Label
                                htmlFor={`level-${value}`}
                                className={cn(
                                  "text-sm font-medium mt-1 cursor-pointer select-none",
                                  formData.level === value
                                    ? "text-blue-600"
                                    : "text-gray-600"
                                )}
                              >
                                {label}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>

                      {/* Section Selection */}
                      <div className="space-y-2">
                        <Label className="text-sm font-medium block mb-2">
                          Section <span className="text-red-500">*</span>
                        </Label>
                        <RadioGroup
                          className="flex justify-start items-center gap-6"
                          value={formData.sectionId}
                          onValueChange={(value) =>
                            setFormData({ ...formData, sectionId: value })
                          }
                        >
                          {SECTIONS.map(({ value, label }) => (
                            <div
                              key={value}
                              className="flex flex-col items-center"
                            >
                              <RadioGroupItem
                                value={value}
                                id={`section-${value}`}
                                className="h-6 w-6 border-2 border-gray-300 data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600"
                              />
                              <Label
                                htmlFor={`section-${value}`}
                                className={cn(
                                  "text-sm font-medium mt-1 cursor-pointer select-none",
                                  formData.sectionId === value
                                    ? "text-blue-600"
                                    : "text-gray-600"
                                )}
                              >
                                {label}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    </div>

                    {/* Course List */}
                    <CourseList
                      departmentId={departmentId}
                      levelId={formData.level}
                      sectionId={formData.sectionId}
                      academicSemesterId={formData.academicSemesterId}
                      selectedCourseId={formData.courseId}
                      onCourseSelect={(courseId) =>
                        setFormData({ ...formData, courseId })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    setFormData({
                      departmentId,
                      courseId: "",
                      sectionId: "",
                      level: "",
                      academicSemesterId: "1",
                    })
                  }
                >
                  Reset
                </Button>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TeacherAssignmentForm;
