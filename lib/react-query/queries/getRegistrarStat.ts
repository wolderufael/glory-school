import axios from "axios";

interface StatByYear {
  academicYear: string;
  students: number;
  courses: number;
  faculty: number;
  departments: number;
  graduates: number;
}

export interface RegistrarStatsResponse {
  academicYears: string[];
  stats: StatByYear[];
}

export const getRegistrarStats = async (): Promise<RegistrarStatsResponse> => {
  const { data } = await axios.get<RegistrarStatsResponse>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/stats/summary`
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
export const getStatsComparison = (data: RegistrarStatsResponse) => {
  const currentYear = data.stats[0]; // Most recent year
  const previousYear = data.stats[1]; // Previous year

  return [
    {
      title: "Total Students",
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
      title: "Active Courses",
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
      title: "Faculty Members",
      value: currentYear.faculty.toString(),
      change: calculatePercentageChange(
        currentYear.faculty,
        previousYear.faculty
      ),
      changeType:
        currentYear.faculty >= previousYear.faculty ? "positive" : "negative",
      iconName: "UserCheck",
      color: "purple",
    },
    {
      title: "Departments",
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
      title: "Graduates",
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
