"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw, Users } from "lucide-react";

import { AssignmentForm, AssignmentCriteria } from "./assignment-form";
import { StudentList, Student } from "./student-list";
import { SectionDisplay } from "./section-display";
import {
  sectionAssignmentLogic,
  SectionAssignmentResult,
  Section,
} from "./section-assignment-logic";
import {
  sectionAssignmentApiService,
  ApiResponse,
  StudentFetchResponse,
} from "./api-service";

export function SectionAssignmentPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [assignmentResult, setAssignmentResult] =
    useState<SectionAssignmentResult | null>(null);
  const [currentCriteria, setCurrentCriteria] =
    useState<AssignmentCriteria | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch students based on criteria
  const handleFetchStudents = useCallback(async (criteria: AssignmentCriteria) => {
    // Prevent duplicate calls for the same criteria
    if (currentCriteria && 
        currentCriteria.department === criteria.department &&
        currentCriteria.level === criteria.level &&
        currentCriteria.year === criteria.year &&
        currentCriteria.semester === criteria.semester) {
      return;
    }

    setLoading(true);
    setError(null);
    setAssignmentResult(null);

    try {
      const response: ApiResponse<StudentFetchResponse> =
        await sectionAssignmentApiService.fetchStudents(criteria);

      if (response.success && response.data) {
        setStudents(response.data.students);
        setCurrentCriteria(criteria);
        console.log(`Found ${response.data.students.length} students`);

        // Automatically generate section assignments
        generateSectionAssignments(response.data.students);
      } else {
        throw new Error(response.error || "Failed to fetch students");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch students";
      setError(errorMessage);
      console.error(errorMessage);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  }, [currentCriteria]);

  // Generate section assignments
  const generateSectionAssignments = (studentList: Student[]) => {
    try {
      const result =
        sectionAssignmentLogic.assignStudentsToSections(studentList);
      const validation = sectionAssignmentLogic.validateAssignment(result);

      if (!validation.isValid) {
        setError(
          `Assignment validation failed: ${validation.errors.join(", ")}`
        );
        console.error("Section assignment validation failed");
        return;
      }

      setAssignmentResult(result);
      console.log(sectionAssignmentLogic.getSectionSummary(result));
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to generate section assignments";
      setError(errorMessage);
      console.error(errorMessage);
    }
  };

  // Save section assignments to database
  const handleSaveAssignment = async () => {
    if (!assignmentResult || !currentCriteria) {
      console.error("No assignment to save");
      return;
    }

    setSaving(true);

    try {
      const response =
        await sectionAssignmentApiService.updateSectionAssignments(
          assignmentResult.sections,
          currentCriteria
        );

      if (response.success) {
        console.log(
          response.message || "Section assignments saved successfully"
        );

        // Reset the form after successful save
        setStudents([]);
        setAssignmentResult(null);
        setCurrentCriteria(null);
      } else {
        throw new Error(response.error || "Failed to save assignments");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to save assignments";
      console.error(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  // Regenerate assignments
  const handleRegenerateAssignments = () => {
    if (students.length > 0) {
      generateSectionAssignments(students);
      console.log("Section assignments regenerated");
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-blue-900 flex items-center gap-2">
            <Users className="h-8 w-8" />
            Student Section Assignment
          </h1>
          <p className="text-blue-600 mt-1">
            Assign students to sections based on academic criteria
          </p>
        </div>

        {assignmentResult && (
          <Button
            variant="outline"
            onClick={handleRegenerateAssignments}
            className="border-blue-200 text-blue-700 hover:bg-blue-50"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Regenerate
          </Button>
        )}
      </div>

      {/* Assignment Form */}
      <AssignmentForm onSearch={handleFetchStudents} loading={loading} />

      {/* Error Display */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="flex items-center gap-3 p-4">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
            <p className="text-red-800 font-medium">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Students List */}
      {students.length > 0 && !assignmentResult && (
        <StudentList students={students} title="Fetched Students" />
      )}

      {/* Section Assignment Results */}
      {assignmentResult && (
        <SectionDisplay
          assignmentResult={assignmentResult}
          onSaveAssignment={handleSaveAssignment}
          saving={saving}
        />
      )}

      {/* Loading State */}
      {loading && (
        <Card className="border-blue-100">
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-blue-600 font-medium">Fetching students...</p>
              <p className="text-sm text-gray-500">
                This may take a few seconds
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Instructions */}
      {!students.length && !loading && (
        <Card className="border-blue-100 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-blue-900">
              How to Use Section Assignment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2 text-blue-800">
              <li>
                Select the department, academic level, year, and semester
                criteria
              </li>
              <li>
                The system will automatically fetch students, sort them alphabetically and
                divide them into sections
              </li>
              <li>Each section will contain 40-60 students (when possible)</li>
              <li>Review the generated sections and student assignments</li>
              <li>
                Click "Save Assignments" to update the database with section
                assignments
              </li>
            </ol>
            <div className="mt-4 p-3 bg-blue-100 rounded-lg">
              <p className="text-sm text-blue-700">
                <strong>Note:</strong> Section assignments will automatically
                balance student numbers and ensure optimal distribution across
                sections A, B, C, etc.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
