import { NextResponse } from "next/server";

export async function GET() {
  // TODO: Replace with actual database query
  const studentInfo = {
    department: "Automotive Engineering",
    year: "2nd Year",
    section: "Section B",
    academicYear: "2024/25",
    semester: "II",
    program: "Regular",
  };

  return NextResponse.json(studentInfo);
}
