import { NextResponse } from "next/server";

export async function GET() {
  // TODO: Replace with actual database query
  const courses = [
    {
      id: "1",
      name: "Data Structure and Algorithm",
      code: "DSA 102",
      creditHours: 3,
    },
    {
      id: "2",
      name: "Object Oriented Programming",
      code: "OOP 201",
      creditHours: 3,
    },
  ];

  return NextResponse.json(courses);
}
