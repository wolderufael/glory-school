import { useQuery } from "@tanstack/react-query";
import { get } from "@/lib/utils/api";

export interface AcceptedStudent {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  tempId: string;
  departmentId: number;
  academicYear: string;
  department: {
    id: number;
    name: string;
    code: string;
  };
}

export function useAcceptedStudents() {
  return useQuery<AcceptedStudent[]>({
    queryKey: ["acceptedStudents"],
    queryFn: () => get("/api/tempstudents/accepted"),
  });
}

export function useAcceptedStudentsByYear(year: string) {
  const { data: allStudents = [], ...rest } = useAcceptedStudents();

  const filteredStudents =
    year === "all"
      ? allStudents
      : allStudents.filter((student) => student.academicYear === year);

  return {
    ...rest,
    data: filteredStudents,
  };
}

export function useAcceptedStudentsByDepartment(departmentId: number) {
  const { data: allStudents = [], ...rest } = useAcceptedStudents();

  const filteredStudents = allStudents.filter(
    (student) => student.departmentId === departmentId
  );

  return {
    ...rest,
    data: filteredStudents,
  };
}

export function useStudentStatistics() {
  const { data: students = [] } = useAcceptedStudents();

  const statistics = {
    total: students.length,
    byYear: {} as Record<string, number>,
    byDepartment: {} as Record<string, number>,
  };

  students.forEach((student) => {
    // Count by year
    if (!statistics.byYear[student.academicYear]) {
      statistics.byYear[student.academicYear] = 0;
    }
    statistics.byYear[student.academicYear]++;

    // Count by department
    if (!statistics.byDepartment[student.department.name]) {
      statistics.byDepartment[student.department.name] = 0;
    }
    statistics.byDepartment[student.department.name]++;
  });

  return statistics;
}
