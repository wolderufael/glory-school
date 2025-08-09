"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select } from "@radix-ui/react-select";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";


interface ChildStudent {
  id: string;
  name: string;
  program: string;
  class:number; 
}



interface CourseResult {
  courseCode: string;
  courseName: string;
  creditHours: number;
  grade: string;
  points: number;
}

interface SemesterResult {
  semester: string;
  academicYear: string;
  gpa: number;
  courses: CourseResult[];
}

const demoChildren: ChildStudent[] = [
  { id: "stu-1001", name: "Abel Mekonnen", program: "Natural Science", class: 12 },
  { id: "stu-1002", name: "Sena Kebede", program: "Social Science", class: 11 },
];

const demoResults: Record<string, SemesterResult[]> = {
  "stu-1001": [
    {
      semester: "Semester I",
      academicYear: "2024/25",
      gpa: 3.72,
      courses: [
        {
          courseCode: "CS101",
          courseName: "Introduction to Programming",
          creditHours: 3,
          grade: "A",
          points: 4.0,
        },
        {
          courseCode: "MATH101",
          courseName: "Calculus I",
          creditHours: 3,
          grade: "A-",
          points: 3.7,
        },
        {
          courseCode: "ENG101",
          courseName: "Communication Skills",
          creditHours: 2,
          grade: "B+",
          points: 3.3,
        },
      ],
    },
    {
      semester: "Semester II",
      academicYear: "2024/25",
      gpa: 3.85,
      courses: [
        {
          courseCode: "CS102",
          courseName: "Data Structures",
          creditHours: 3,
          grade: "A",
          points: 4.0,
        },
        {
          courseCode: "MATH102",
          courseName: "Calculus II",
          creditHours: 3,
          grade: "A",
          points: 4.0,
        },
        {
          courseCode: "PHYS101",
          courseName: "Physics I",
          creditHours: 3,
          grade: "A-",
          points: 3.7,
        },
      ],
    },
  ],
  "stu-1002": [
    {
      semester: "Semester I",
      academicYear: "2024/25",
      gpa: 3.41,
      courses: [
        {
          courseCode: "CE101",
          courseName: "Engineering Drawing",
          creditHours: 3,
          grade: "B+",
          points: 3.3,
        },
        {
          courseCode: "PHYS101",
          courseName: "Physics I",
          creditHours: 3,
          grade: "A-",
          points: 3.7,
        },
        {
          courseCode: "MATH101",
          courseName: "Calculus I",
          creditHours: 3,
          grade: "B",
          points: 3.0,
        },
      ],
    },
    {
      semester: "Semester II",
      academicYear: "2024/25",
      gpa: 3.67,
      courses: [
        {
          courseCode: "CE102",
          courseName: "Structural Analysis",
          creditHours: 3,
          grade: "A-",
          points: 3.7,
        },
        {
          courseCode: "MATH202",
          courseName: "Differential Equations",
          creditHours: 3,
          grade: "B+",
          points: 3.3,
        },
        {
          courseCode: "GE101",
          courseName: "Geology",
          creditHours: 2,
          grade: "A",
          points: 4.0,
        },
      ],
    },
  ],
};

const getGradeColor = (grade: string) => {
  if (["A", "A-"].includes(grade)) return "text-green-600";
  if (["B+", "B", "B-"].includes(grade)) return "text-blue-600";
  if (["C+", "C"].includes(grade)) return "text-yellow-600";
  return "text-red-600";
};

const ParentDashboard = () => {
  const params = useSearchParams();
  const parentId = params.get("parentId") || "101";
  
  const [selectedStudentId, setSelectedStudentId] = useState(demoChildren[0].id);
  const [selectedSemester, setSelectedSemester] = useState<string>("");

  const selectedStudent = useMemo(
    () => demoChildren.find(c => c.id === selectedStudentId) || demoChildren[0],
    [selectedStudentId]
  );

  const studentResults = useMemo(
    () => demoResults[selectedStudentId] || [],
    [selectedStudentId]
  );

  const semesterResults = useMemo(() => {
    if (!selectedSemester && studentResults.length > 0) {
      return studentResults[0];
    }
    return studentResults.find(sem => sem.semester === selectedSemester);
  }, [selectedSemester, studentResults]);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Linked Students</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm mb-2">Select Student</label>
                <Select 
                  value={selectedStudentId} 
                  onValueChange={v => {
                    setSelectedStudentId(v);
                    setSelectedSemester("");
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose student" />
                  </SelectTrigger>
                  <SelectContent>
                    {demoChildren.map(child => (
                      <SelectItem key={child.id} value={child.id}>
                        {child.name} • {child.program}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex-1">
                <label className="block text-sm mb-2">Select Semester</label>
                <Select 
                  value={selectedSemester} 
                  onValueChange={setSelectedSemester}
                  disabled={studentResults.length === 0}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={studentResults.length ? "Choose semester" : "No data"}>
                        {selectedSemester || (studentResults[0]?.semester || "Select")}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {studentResults.map(sem => (
                      <SelectItem key={sem.semester} value={sem.semester}>
                        {sem.semester}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {demoChildren.map(child => (
                <Card 
                  key={child.id} 
                  className={child.id === selectedStudentId ? "border-blue-400" : ""}
                >
                  <CardHeader>
                    <CardTitle>{child.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-2">{child.program}</p>
                    <Button 
                      size="sm" 
                      onClick={() => setSelectedStudentId(child.id)}
                    >
                      View Results
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Parent Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Parent ID: {parentId}</p>
            <Button variant="outline">View School Notices</Button>
          </CardContent>
        </Card>
      </section>

      <section>
        <Card>
          <CardHeader>
            <CardTitle>
              Academic Results • {selectedStudent.name}
              {semesterResults && ` • ${semesterResults.semester}`}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!semesterResults ? (
              <p>No results available</p>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span>Academic Year: {semesterResults.academicYear}</span>
                  <span className="font-bold">
                    Semester GPA: {semesterResults.gpa.toFixed(2)}
                  </span>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Code</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Credits</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Points</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {semesterResults.courses.map((course, index) => (
                      <TableRow key={index}>
                        <TableCell>{course.courseCode}</TableCell>
                        <TableCell>{course.courseName}</TableCell>
                        <TableCell>{course.creditHours}</TableCell>
                        <TableCell className={getGradeColor(course.grade)}>
                          {course.grade}
                        </TableCell>
                        <TableCell>{course.points.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default ParentDashboard;