import { NextResponse } from "next/server";

export async function GET() {
  // TODO: Replace with actual database query
  const semesters = [
    {
      semester: "First Semester",
      academicYear: "2023/24",
      gpa: 3.75,
      courses: [
        {
          code: "CSE 201",
          title: "Data Structures and Algorithms",
          creditHours: 3,
          grade: "A",
        },
        {
          code: "CSE 203",
          title: "Object Oriented Programming",
          creditHours: 3,
          grade: "A-",
        },
        {
          code: "MATH 201",
          title: "Linear Algebra",
          creditHours: 3,
          grade: "B+",
        },
      ],
    },
    {
      semester: "Second Semester",
      academicYear: "2023/24",
      gpa: 3.85,
      courses: [
        {
          code: "CSE 202",
          title: "Database Systems",
          creditHours: 3,
          grade: "A",
        },
        {
          code: "CSE 204",
          title: "Operating Systems",
          creditHours: 3,
          grade: "A",
        },
        {
          code: "CSE 206",
          title: "Software Engineering",
          creditHours: 3,
          grade: "A-",
        },
      ],
    },
  ];

  return NextResponse.json(semesters);
}
