"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { toast } from "sonner";
import {
  useTempStudents,
  useGenerateIds,
} from "@/lib/react-query/hooks/useTempStudentManagement";
import { Loader2 } from "lucide-react";

export default function TempStudentsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch temporary students
  const { data: students = [], isLoading, isError } = useTempStudents();

  // Generate IDs mutation
  const { mutate: generateIds, isPending: isGenerating } = useGenerateIds();

  // Handle ID generation
  const handleGenerateIds = () => {
    generateIds(undefined, {
      onSuccess: () => {
        toast.success("Student IDs generated successfully");
      },
      onError: (error) => {
        toast.error("Failed to generate student IDs");
        console.error("Error generating IDs:", error);
      },
    });
  };

  // Filter students based on search term
  const filteredStudents = students.filter(
    (student) =>
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (student.tempId &&
        student.tempId.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (isError) {
    return (
      <div className="p-8 text-center text-red-600">
        Failed to load temporary students. Please try again later.
      </div>
    );
  }

  return (
    <div className="p-8">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Temporary Students Management</CardTitle>
            <div className="flex items-center gap-4">
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search by name or ID..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button
                onClick={handleGenerateIds}
                disabled={isGenerating || students.length === 0}
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Student IDs"
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>First Name</TableHead>
                  <TableHead>Middle Name</TableHead>
                  <TableHead>Last Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Temporary ID</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.firstName}</TableCell>
                    <TableCell>{student.middleName}</TableCell>
                    <TableCell>{student.lastName}</TableCell>
                    <TableCell>{student.department}</TableCell>
                    <TableCell>{student.tempId || "Not Generated"}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          student.tempId
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {student.tempId ? "ID Generated" : "Pending"}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredStudents.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-4 text-gray-500"
                    >
                      {students.length === 0
                        ? "No temporary students added yet"
                        : "No students found"}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
