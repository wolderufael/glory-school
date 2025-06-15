"use client";

import { useQuery } from "@tanstack/react-query";
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
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";

interface Course {
  code: string;
  title: string;
  creditHours: number;
  grade: string;
  semester: string;
  academicYear: string;
}

interface Semester {
  semester: string;
  academicYear: string;
  courses: Course[];
  gpa: number;
}

export function AcademicRecords() {
  const { data: semesters, isLoading } = useQuery<Semester[]>({
    queryKey: ["academicRecords"],
    queryFn: async () => {
      const response = await axios.get("/api/student/academic-records");
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <FileText className="h-6 w-6" />
              Academic Records
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-slate-200 rounded w-1/4"></div>
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-4 bg-slate-200 rounded"></div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <FileText className="h-6 w-6" />
            Academic Records
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="grades" className="space-y-4">
            <TabsList>
              <TabsTrigger value="grades">Grades by Semester</TabsTrigger>
              <TabsTrigger value="transcript">Full Transcript</TabsTrigger>
            </TabsList>

            <TabsContent value="grades" className="space-y-6">
              {semesters?.map((semester, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">
                      {semester.semester} - {semester.academicYear}
                      <span className="ml-4 text-blue-600">
                        GPA: {semester.gpa.toFixed(2)}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Course Code</TableHead>
                          <TableHead>Course Title</TableHead>
                          <TableHead>Credit Hours</TableHead>
                          <TableHead>Grade</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {semester.courses.map((course, courseIndex) => (
                          <TableRow key={courseIndex}>
                            <TableCell>{course.code}</TableCell>
                            <TableCell>{course.title}</TableCell>
                            <TableCell>{course.creditHours}</TableCell>
                            <TableCell className="font-semibold">
                              {course.grade}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="transcript" className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Complete Transcript</h3>
                  <p className="text-sm text-gray-600">
                    Cumulative GPA:{" "}
                    {(
                      semesters?.reduce((acc, sem) => acc + sem.gpa, 0) /
                      (semesters?.length || 1)
                    ).toFixed(2)}
                  </p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Download className="h-4 w-4 mr-2" />
                  Download Transcript
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Semester</TableHead>
                    <TableHead>Course Code</TableHead>
                    <TableHead>Course Title</TableHead>
                    <TableHead>Credit Hours</TableHead>
                    <TableHead>Grade</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {semesters?.flatMap((semester) =>
                    semester.courses.map((course, courseIndex) => (
                      <TableRow key={`${semester.semester}-${courseIndex}`}>
                        <TableCell>
                          {semester.semester} - {semester.academicYear}
                        </TableCell>
                        <TableCell>{course.code}</TableCell>
                        <TableCell>{course.title}</TableCell>
                        <TableCell>{course.creditHours}</TableCell>
                        <TableCell className="font-semibold">
                          {course.grade}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
