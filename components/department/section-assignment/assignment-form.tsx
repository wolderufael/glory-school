"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Search, Users, Filter } from "lucide-react";

export interface AssignmentCriteria {
  //department: string;
  level: string;
  //year: string;
  semester: string;
}

interface AssignmentFormProps {
  onSearch: (criteria: AssignmentCriteria) => void;
  loading?: boolean;
}

// Mock data - replace with actual API calls
const departments = [
  { id: "AH", name: "Animal Health" },
  { id: "ANP", name: "Animal Production" },
  { id: "CAA", name: "Cooperative Accounting and Auditing" },
  { id: "CRP", name: "Crop Production" },
  { id: "IRD", name: "Drainage and Irrigation" },
  { id: "NRDC", name: "Natural Resource Conservation and Development" },
];

const levels = [
  { id: "1", name: "Level I" },
  { id: "2", name: "Level II" },
  { id: "3", name: "Level III" },
  { id: "4", name: "Level IV" },
];

const years = [
  { id: "2024", name: "2024/25" },
  { id: "2023", name: "2023/24" },
  { id: "2022", name: "2022/23" },
];

const semesters = [
  { id: "1", name: "Semester I" },
  { id: "2", name: "Semester II" },
];

export function AssignmentForm({
  onSearch,
  loading = false,
}: AssignmentFormProps) {
  const [criteria, setCriteria] = useState<AssignmentCriteria>({
    //department: "",
    level: "",
    //year: "",
    semester: "",
  });

  const isFormValid = criteria.level && criteria.semester;

  // Auto-fetch students when all fields are filled (with debounce)
  useEffect(() => {
    if (isFormValid && !loading) {
      const timeoutId = setTimeout(() => {
        onSearch(criteria);
      }, 300); // 300ms debounce

      return () => clearTimeout(timeoutId);
    }
  }, [
    //criteria.department,
    criteria.level,
    //criteria.year,
    criteria.semester,
    isFormValid,
    loading,
  ]);

  return (
    <Card className="border-blue-100">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-blue-900 flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Student Assignment Criteria
        </CardTitle>
        <p className="text-blue-600 text-sm">
          Select criteria to fetch students for section assignment
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Department Selection */}
            {/*             <div className="space-y-2">
              <Label htmlFor="department" className="text-blue-900 font-medium">
                Department
              </Label>
              <Select
                value={criteria.department}
                onValueChange={(value) =>
                  setCriteria((prev) => ({ ...prev, department: value }))
                }
              >
                <SelectTrigger className="border-blue-200 focus:border-blue-400">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept.id} value={dept.id}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div> */}

            {/* Level Selection */}
            <div className="space-y-2">
              <Label htmlFor="level" className="text-blue-900 font-medium">
                Academic Level
              </Label>
              <Select
                value={criteria.level}
                onValueChange={(value) =>
                  setCriteria((prev) => ({ ...prev, level: value }))
                }
              >
                <SelectTrigger className="border-blue-200 focus:border-blue-400">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map((level) => (
                    <SelectItem key={level.id} value={level.id}>
                      {level.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Year Selection */}
            {/*             <div className="space-y-2">
              <Label htmlFor="year" className="text-blue-900 font-medium">
                Academic Year
              </Label>
              <Select
                value={criteria.year}
                onValueChange={(value) =>
                  setCriteria((prev) => ({ ...prev, year: value }))
                }
              >
                <SelectTrigger className="border-blue-200 focus:border-blue-400">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year.id} value={year.id}>
                      {year.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div> */}

            {/* Semester Selection */}
            <div className="space-y-2">
              <Label htmlFor="semester" className="text-blue-900 font-medium">
                Semester
              </Label>
              <Select
                value={criteria.semester}
                onValueChange={(value) =>
                  setCriteria((prev) => ({ ...prev, semester: value }))
                }
              >
                <SelectTrigger className="border-blue-200 focus:border-blue-400">
                  <SelectValue placeholder="Select semester" />
                </SelectTrigger>
                <SelectContent>
                  {semesters.map((semester) => (
                    <SelectItem key={semester.id} value={semester.id}>
                      {semester.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Loading Indicator */}
          {loading && (
            <div className="flex justify-center pt-4">
              <div className="flex items-center gap-2 text-blue-600">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <span>Loading Students...</span>
              </div>
            </div>
          )}

          {/* Selected Criteria Summary */}
          {isFormValid && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-blue-900 font-medium mb-2 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Selected Criteria:
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                {/*               <div>
                  <span className="text-blue-600">Department:</span>
                  <p className="font-medium text-blue-900">
                    {
                      departments.find((d) => d.id === criteria.department)
                        ?.name
                    }
                  </p>
                </div> */}
                <div>
                  <span className="text-blue-600">Level:</span>
                  <p className="font-medium text-blue-900">
                    {levels.find((l) => l.id === criteria.level)?.name}
                  </p>
                </div>
                {/*               <div>
                  <span className="text-blue-600">Year:</span>
                  <p className="font-medium text-blue-900">
                    {years.find((y) => y.id === criteria.year)?.name}
                  </p>
                </div> */}
                <div>
                  <span className="text-blue-600">Semester:</span>
                  <p className="font-medium text-blue-900">
                    {semesters.find((s) => s.id === criteria.semester)?.name}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
