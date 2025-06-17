"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Users,
  ChevronDown,
  ChevronUp,
  Save,
  CheckCircle,
  AlertTriangle,
  Download,
  Hash,
  User as UserIcon,
} from "lucide-react";
import { Section, SectionAssignmentResult } from "./section-assignment-logic";
import { Student } from "./student-list";

interface SectionDisplayProps {
  assignmentResult: SectionAssignmentResult;
  onSaveAssignment: () => void;
  saving?: boolean;
}

export function SectionDisplay({
  assignmentResult,
  onSaveAssignment,
  saving = false,
}: SectionDisplayProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set()
  );

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const expandAll = () => {
    setExpandedSections(new Set(assignmentResult.sections.map((s) => s.id)));
  };

  const collapseAll = () => {
    setExpandedSections(new Set());
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const downloadSectionList = (section: Section) => {
    const csvContent = [
      ["No.", "Student ID", "First Name", "Last Name", "Email", "Section"].join(
        ","
      ),
      ...section.students.map((student, index) =>
        [
          index + 1,
          student.studentId,
          student.firstName,
          student.lastName,
          student.email,
          section.name,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${section.name.replace(" ", "_")}_students.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (assignmentResult.totalStudents === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <Card className="border-blue-100">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-blue-900 flex items-center gap-2">
              <Users className="h-5 w-5" />
              Section Assignment Result
            </CardTitle>
            <div className="flex items-center gap-2">
              {assignmentResult.isBalanced ? (
                <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  Balanced
                </Badge>
              ) : (
                <Badge
                  variant="destructive"
                  className="flex items-center gap-1"
                >
                  <AlertTriangle className="h-3 w-3" />
                  Unbalanced
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-900">
                {assignmentResult.totalStudents}
              </p>
              <p className="text-sm text-blue-600">Total Students</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-900">
                {assignmentResult.sections.length}
              </p>
              <p className="text-sm text-blue-600">Sections Created</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-900">
                {Math.round(assignmentResult.averagePerSection)}
              </p>
              <p className="text-sm text-blue-600">Avg per Section</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-900">
                {Math.min(...assignmentResult.sections.map((s) => s.count))} -{" "}
                {Math.max(...assignmentResult.sections.map((s) => s.count))}
              </p>
              <p className="text-sm text-blue-600">Size Range</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={expandAll}
                className="border-blue-200 text-blue-700 hover:bg-blue-50"
              >
                <ChevronDown className="h-4 w-4 mr-1" />
                Expand All
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={collapseAll}
                className="border-blue-200 text-blue-700 hover:bg-blue-50"
              >
                <ChevronUp className="h-4 w-4 mr-1" />
                Collapse All
              </Button>
            </div>

            <Button
              onClick={onSaveAssignment}
              disabled={saving}
              className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Assignments
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {assignmentResult.sections.map((section) => (
          <Card key={section.id} className="border-blue-100">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold text-blue-900 flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    {section.name.split(" ")[1]}
                  </div>
                  {section.name}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-800"
                  >
                    {section.count} students
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => downloadSectionList(section)}
                    className="text-blue-600 hover:bg-blue-50"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button
                variant="ghost"
                className="w-full justify-between p-2 hover:bg-blue-50"
                onClick={() => toggleSection(section.id)}
              >
                <span className="text-blue-700">
                  {expandedSections.has(section.id) ? "Hide" : "Show"} student
                  list
                </span>
                {expandedSections.has(section.id) ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>

              {expandedSections.has(section.id) && (
                <div className="mt-3 space-y-2 max-h-64 overflow-y-auto">
                  {section.students.map((student, index) => (
                    <div
                      key={student.id}
                      className="flex items-center gap-3 p-2 rounded-lg border border-blue-100 hover:bg-blue-50 transition-colors"
                    >
                      {/* Student Number */}
                      <div className="flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full text-blue-700 font-medium text-xs">
                        {index + 1}
                      </div>

                      {/* Avatar */}
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={`/placeholder.svg?height=32&width=32`}
                        />
                        <AvatarFallback className="bg-blue-500 text-white text-xs">
                          {getInitials(student.firstName, student.lastName)}
                        </AvatarFallback>
                      </Avatar>

                      {/* Student Info */}
                      <div className="flex-1 min-w-0">
                        <h5 className="text-xs font-medium text-blue-900 truncate">
                          {student.firstName} {student.lastName}
                        </h5>
                        <div className="flex items-center gap-1 text-xs text-blue-600">
                          <Hash className="h-2 w-2" />
                          <span className="truncate">{student.studentId}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
