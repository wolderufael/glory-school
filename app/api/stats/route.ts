import { NextResponse } from "next/server";

export async function GET() {
  try {
    // TODO: Replace with actual database queries
    const stats = [
      {
        title: "Total Students",
        value: "2,847",
        change: "+12% from last month",
        changeType: "positive",
        iconName: "Users",
        color: "blue",
      },
      {
        title: "Active Courses",
        value: "156",
        change: "+8% from last month",
        changeType: "positive",
        iconName: "BookOpen",
        color: "indigo",
      },
      {
        title: "Faculty Members",
        value: "89",
        change: "+2% from last month",
        changeType: "positive",
        iconName: "UserCheck",
        color: "purple",
      },
      {
        title: "Departments",
        value: "12",
        change: "No change",
        changeType: "neutral",
        iconName: "Building",
        color: "cyan",
      },
      {
        title: "Graduates (This Year)",
        value: "324",
        change: "+15% from last year",
        changeType: "positive",
        iconName: "GraduationCap",
        color: "blue",
      },
      {
        title: "Academic Sessions",
        value: "42",
        change: "+5% from last semester",
        changeType: "positive",
        iconName: "Calendar",
        color: "indigo",
      },
      {
        title: "Pending Applications",
        value: "127",
        change: "-8% from last week",
        changeType: "negative",
        iconName: "FileText",
        color: "orange",
      },
      {
        title: "System Usage",
        value: "94%",
        change: "+3% from last week",
        changeType: "positive",
        iconName: "TrendingUp",
        color: "green",
      },
    ];

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
