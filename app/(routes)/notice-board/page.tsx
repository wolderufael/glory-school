"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useTempStudents } from "@/lib/react-query/hooks/useTempStudents";
import { Skeleton } from "@/components/ui/skeleton";

export default function NoticeBoardPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: students, isLoading, error } = useTempStudents();

  // Filter students based on search term
  const filteredStudents =
    students?.filter(
      (student) =>
        student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.generatedId?.toLowerCase().includes(searchTerm.toLowerCase())
    ) ?? [];

  const renderTableContent = () => {
    if (isLoading) {
      return Array(5)
        .fill(null)
        .map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <Skeleton className="h-4 w-32" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-24" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-24" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-24" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-32" />
            </TableCell>
          </TableRow>
        ));
    }

    if (error) {
      return (
        <TableRow>
          <TableCell colSpan={5} className="text-center text-red-500">
            Failed to load students. Please try again later.
          </TableCell>
        </TableRow>
      );
    }

    if (filteredStudents.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={5} className="text-center text-gray-500">
            No students found.
          </TableCell>
        </TableRow>
      );
    }

    return filteredStudents.map((student) => (
      <TableRow key={student.id}>
        <TableCell className="font-medium">
          {student.generatedId || "Not generated"}
        </TableCell>
        <TableCell>{student.firstName}</TableCell>
        <TableCell>{student.middleName}</TableCell>
        <TableCell>{student.lastName}</TableCell>
        <TableCell>{student.department?.name || "N/A"}</TableCell>
      </TableRow>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Wolaita Sodo Agricultural College Notice Board
        </h1>

        <Tabs defaultValue="temp-students" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-[400px] mx-auto">
            <TabsTrigger value="temp-students">Temporary Students</TabsTrigger>
            <TabsTrigger value="schedule">Semester Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="temp-students">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Temporary Students List</CardTitle>
                  <div className="relative w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Search by name or ID..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Generated ID</TableHead>
                      <TableHead>First Name</TableHead>
                      <TableHead>Middle Name</TableHead>
                      <TableHead>Last Name</TableHead>
                      <TableHead>Department</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>{renderTableContent()}</TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle>Semester Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Important Dates
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-gray-600">
                          Registration Period
                        </span>
                        <span className="font-medium">
                          March 1 - March 15, 2024
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-gray-600">Classes Begin</span>
                        <span className="font-medium">March 18, 2024</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-gray-600">Add/Drop Period</span>
                        <span className="font-medium">
                          March 18 - March 22, 2024
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-gray-600">
                          Mid-term Examinations
                        </span>
                        <span className="font-medium">
                          April 29 - May 3, 2024
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600">
                          Final Examinations
                        </span>
                        <span className="font-medium">
                          June 17 - June 28, 2024
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
