import { NextResponse } from "next/server";

export async function GET() {
  // TODO: Replace with actual database query
  const courses = [
    {
      id: "1",
      name: "Identifying and Handling Basic Veterinary Tools and Equipment",
      code: "AGR ANH2 M01 0422 ",
      creditHours: 3,
    },
    {
      id: "2",
      name: "Applying 5S Proceduress",
      code: "AGR ANH2 M02 0422 ",
      creditHours: 3,
    },
    {
      id: "2",
      name: "Handling and Restraining Animals",
      code: "AGR ANH2 M04 0422 ",
      creditHours: 3,
    },
  ];

  return NextResponse.json(courses);
}
