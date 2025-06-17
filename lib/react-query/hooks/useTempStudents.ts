import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Department } from "./useDepartments";

interface TempStudent {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  departmentId: number;
  department?: Department;
  generatedId?: string;
}

interface GenerateIdsRequest {
  students: TempStudent[];
  academicYear: string;
}

const currentYear =  localStorage.getItem("academicYearId") || "2023-2024";

// Fetch all temporary students
export const useTempStudents = (academicYearID: string) => {
  return useQuery({
    queryKey: ["tempStudents"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/tempstudents?academicYearId=${currentYear}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch temporary students");
      }
      return response.json();
    },
  });
};

// Add a new temporary student
export const useAddTempStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (student: Omit<TempStudent, "id">) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/tempstudents`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(student),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add temporary student");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tempStudents"] });
    },
  });
};

// Generate IDs for all temporary students
export const useGenerateIds = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: GenerateIdsRequest) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/tempstudents/generate-all-ids`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate IDs");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tempStudents"] });
    },
  });
};

// Verify temporary student ID
export const useVerifyTempStudent = () => {
  return useMutation({
    mutationFn: async (studentMainId: string) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/tempstudents/student-main-id/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ studentMainId }),
        }
      );

      if (!response.ok) {
        throw new Error("Student ID not found");
      }

      return response.json();
    },
  });
};
