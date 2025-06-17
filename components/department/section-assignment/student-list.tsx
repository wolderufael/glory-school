"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Hash, Users } from "lucide-react";

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  studentId: string;
  email: string;
  currentSection?: string;
  department: string;
  level: string;
  year: string;
  semester: string;
}

interface StudentListProps {
  students: Student[];
  title?: string;
}

export function StudentList({
  students,
  title = "Students",
}: StudentListProps) {
  // Sort students alphabetically by last name, then first name
  const sortedStudents = [...students].sort((a, b) => {
    const lastNameComparison = a.lastName.localeCompare(b.lastName);
    if (lastNameComparison !== 0) return lastNameComparison;
    return a.firstName.localeCompare(b.firstName);
  });

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  if (students.length === 0) {
    return (
      <Card className="border-blue-100">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-blue-900 flex items-center gap-2">
            <Users className="h-5 w-5" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">No students found</p>
            <p className="text-sm">Try adjusting your search criteria</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-blue-100">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-blue-900 flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            {title}
          </div>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            {students.length} students
          </Badge>
        </CardTitle>
        <p className="text-blue-600 text-sm">
          Students sorted alphabetically by last name
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {sortedStudents.map((student, index) => (
            <div
              key={student.id}
              className="flex items-center gap-4 p-3 rounded-lg border border-blue-100 hover:bg-blue-50 transition-colors"
            >
              {/* Student Number */}
              <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full text-blue-700 font-medium text-sm">
                {index + 1}
              </div>

              {/* Avatar */}
              <Avatar className="h-10 w-10">
                <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                <AvatarFallback className="bg-blue-500 text-white">
                  {getInitials(student.firstName, student.lastName)}
                </AvatarFallback>
              </Avatar>

              {/* Student Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-sm font-medium text-blue-900 truncate">
                    {student.firstName} {student.lastName}
                  </h4>
                  {student.currentSection && (
                    <Badge
                      variant="outline"
                      className="text-xs border-orange-300 text-orange-700"
                    >
                      Section {student.currentSection}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-4 text-xs text-blue-600">
                  <div className="flex items-center gap-1">
                    <Hash className="h-3 w-3" />
                    <span>{student.studentId}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    <span className="truncate">{student.email}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
