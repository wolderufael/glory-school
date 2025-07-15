"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Printer } from "lucide-react";
import { printGradeReport } from "@/utils/print";

// Grade point mapping
const GRADE_POINTS: Record<string, number> = {
  A: 4.0,
  "A-": 3.75,
  "B+": 3.5,
  B: 3.0,
  "B-": 2.75,
  "C+": 2.5,
  C: 2.0,
  "C-": 1.75,
  D: 1.5,
  "D-": 1.0,
  F: 0.0,
};

export function Results() {
  const componentRef = useRef<HTMLDivElement>(null);
  const [results, setResults] = useState<any[]>([]);

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A":
      case "A-":
        return "text-green-600 dark:text-green-400";
      case "B+":
      case "B":
      case "B-":
        return "text-blue-600 dark:text-blue-400";
      case "C+":
      case "C":
        return "text-yellow-600 dark:text-yellow-400";
      default:
        return "text-red-600 dark:text-red-400";
    }
  };

  const calculateCreditHours = (course: any) => {
    // Calculate credit hours based on total contact hours
    return course.totalNhrs;
  };

  const calculatePoints = (course: any) => {
    const gradePoint = GRADE_POINTS[course.gradeInLetter] || 0;
    const creditHours = calculateCreditHours(course);
    return gradePoint * creditHours;
  };

  const handlePrintGradeReport = () => {
    // Get student info from localStorage or state
    const studentId = localStorage.getItem("studentId");
    const studentInfo = {
      id: studentId || "",
      name: localStorage.getItem("studentName") || "",
    };

    printGradeReport(results, studentInfo);
  };

  useEffect(() => {
    const fetchResults = async () => {
      const studentId = localStorage.getItem("studentId");
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/assessments/gpa/${studentId}`
        );

        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        if (!data || !Array.isArray(data))
          throw new Error("Invalid data format");

        setResults(data);
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    };

    fetchResults();
  }, []);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Academic Results</CardTitle>
          <Button variant="outline" onClick={handlePrintGradeReport}>
            <Printer className="w-4 h-4 mr-2" />
            Print Grade Report
          </Button>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="space-y-4">
            {results.map((semester, index) => (
              <AccordionItem key={index} value={`semester-${index}`}>
                <AccordionTrigger className="text-left">
                  <div className="flex justify-between items-center w-full pr-4">
                    <div>
                      <p className="font-semibold">
                        {semester.semester.name} - {semester.academicYear.name}{" "}
                        (Level {semester.level})
                      </p>
                      <p className="text-sm text-gray-500">
                        Section: {semester.section.sectionName}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Semester GPA</p>
                      <p className="font-bold text-blue-600">
                        {semester.gpa.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Course Code</TableHead>
                        <TableHead>Course Name</TableHead>
                        <TableHead>Nominal Hrs</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead>Grade</TableHead>
                        <TableHead>Points</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {semester.courses.map(
                        (course: any, courseIndex: number) => {
                          const creditHours = calculateCreditHours(course);
                          const points = calculatePoints(course);

                          return (
                            <TableRow key={courseIndex}>
                              <TableCell>{courseIndex + 1}</TableCell>
                              <TableCell className="font-medium">
                                {course.courseCode}
                              </TableCell>
                              <TableCell>{course.title}</TableCell>
                              <TableCell>{creditHours}</TableCell>
                              <TableCell>{course.totalMark}</TableCell>
                              <TableCell>
                                <span
                                  className={`font-semibold ${getGradeColor(
                                    course.gradeInLetter
                                  )}`}
                                >
                                  {course.gradeInLetter}
                                </span>
                              </TableCell>
                              <TableCell>{points.toFixed(2)}</TableCell>
                            </TableRow>
                          );
                        }
                      )}
                    </TableBody>
                  </Table>
                  <div className="flex justify-end items-end my-6 flex-col">
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-right mt-8">
                      <p className="text-sm text-gray-500 font-semibold">
                        Total Credit Hours:
                      </p>
                      <p className="font-semibold">{semester.totalCredits}</p>

                      <p className="text-sm text-gray-500 font-semibold">
                        Semester GPA:
                      </p>
                      <p className="font-semibold">{semester.gpa.toFixed(2)}</p>

                      <p className="text-sm text-gray-500 font-semibold">
                        Cumulative GPA (CGPA):
                      </p>
                      <p className="font-semibold">
                        {semester.cgpa.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
