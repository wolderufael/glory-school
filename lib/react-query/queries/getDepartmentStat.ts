import axios from "axios";

interface StatByYear {
  academicYear: string;
  students: number;
  courses: number;
  faculty: number;
  departments: number;
  graduates: number;
}

export interface DepartmentStatsResponse {
  academicYears: string[];
  stats: StatByYear[];
}

export const getDepartmentStats = async (): Promise<DepartmentStatsResponse> => {
  const { data } = await axios.get<DepartmentStatsResponse>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/stats/department-summary`
  );
  return data;
};

// Helper function to calculate percentage change between two numbers
export const calculatePercentageChange = (
  current: number,
  previous: number
): string => {
  if (previous === 0) return "N/A";
  const change = ((current - previous) / previous) * 100;
  return change === 0
    ? "No change"
    : `${change > 0 ? "+" : ""}${change.toFixed(1)}%`;
};

// Helper function to get stats comparison between years
export const getStatsComparison = (data: DepartmentStatsResponse) => {
  const currentYear = data.stats[0]; // Most recent year
  const previousYear = data.stats[1]; // Previous year

  return [
    {
      title: "Total Sections",
      value: currentYear.students.toString(),
      change: calculatePercentageChange(
        currentYear.students,
        previousYear.students
      ),
      changeType:
        currentYear.students >= previousYear.students ? "positive" : "negative",
      iconName: "Users",
      color: "blue",
    },
    {
      title: "Total Teachers",
      value: currentYear.courses.toString(),
      change: calculatePercentageChange(
        currentYear.courses,
        previousYear.courses
      ),
      changeType:
        currentYear.courses >= previousYear.courses ? "positive" : "negative",
      iconName: "BookOpen",
      color: "indigo",
    },
    {
      title: "Total Students",
      value: currentYear.departments.toString(),
      change: calculatePercentageChange(
        currentYear.departments,
        previousYear.departments
      ),
      changeType:
        currentYear.departments >= previousYear.departments
          ? "positive"
          : "negative",
      iconName: "Building",
      color: "cyan",
    },
    {
      title: "Total Courses",
      value: currentYear.graduates.toString(),
      change: calculatePercentageChange(
        currentYear.graduates,
        previousYear.graduates
      ),
      changeType:
        currentYear.graduates >= previousYear.graduates
          ? "positive"
          : "negative",
      iconName: "GraduationCap",
      color: "blue",
    },
  ];
};
