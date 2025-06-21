"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Loader2, GraduationCap, ArrowLeft } from "lucide-react";
import { useTempStudents } from "@/lib/react-query/hooks/useTempStudents";
import Link from "next/link";

interface TempStudent {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  departmentId: number;
  studentMainId?: string;
  department?: {
    name: string;
  };
}

export default function AcceptedStudents() {
  const [searchQuery, setSearchQuery] = useState("");
  const academicYearID=  localStorage.getItem("academicYearId") || "";


  const { data: students = [], isLoading, error } = useTempStudents(academicYearID);

  // Filter students based on search query
  const filteredStudents = students.filter((student: TempStudent) => {
    const searchString = `${student.firstName} ${student.middleName} ${
      student.lastName
    } ${student.studentMainId || ""}`.toLowerCase();
    return searchString.includes(searchQuery.toLowerCase());
  });

  if (error) {
    return (
      <div className="p-8 text-center text-red-600">
        Failed to load student list. Please try again later.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

       <Link href="/admission" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
        </Link>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <GraduationCap className="h-6 w-6 text-blue-600" />
              <CardTitle>This Year Accepted Students List</CardTitle>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search by name or ID..."
                className="pl-10 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          ) : (
            <div className="space-y-6">
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student ID</TableHead>
                      <TableHead>First Name</TableHead>
                      <TableHead>Middle Name</TableHead>
                      <TableHead>Last Name</TableHead>
                      <TableHead>Department</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student: TempStudent) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">
                          {student.studentMainId || "Not Generated"}
                        </TableCell>
                        <TableCell>{student.firstName}</TableCell>
                        <TableCell>{student.middleName}</TableCell>
                        <TableCell>{student.lastName}</TableCell>
                        <TableCell>
                          {student.department?.name || "N/A"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>

              {filteredStudents.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  {students.length === 0
                    ? "No students found"
                    : "No students match your search criteria"}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
    </div>
  );
}
