import { NextResponse } from "next/server";

export async function GET() {
  // TODO: Replace with actual database query
  const courses = [
    {
      id: "1",
      name: "Biology",
      code: "BIO-10-01",
      creditHours: 4,
    },
    {
      id: "2",
      name: "Mathematics",
      code: "MATH-10-02",
      creditHours: 4,
    },
    {
      id: "3",
      name: "English Literature",
      code: "ENG-10-01",
      creditHours: 3,
    },
    {
      id: "4",
      name: "History",
      code: "HIST-10-01",
      creditHours: 3,
    },
    {
      id: "5",
      name: "Chemistry",
      code: "CHEM-10-01",
      creditHours: 4,
    },
    {
      id: "6",
      name: "Physical Education",
      code: "PE-10-01",
      creditHours: 1,
    },
  ];

  return NextResponse.json(courses);
}
