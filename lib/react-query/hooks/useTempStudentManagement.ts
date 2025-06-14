import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { post, get } from "@/lib/utils/api";

interface TempStudent {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  departmentId: number;
  tempId?: string;
}

interface Department {
  id: number;
  name: string;
  code: string;
}

interface GenerateIdsPayload {
  students: (TempStudent & { generatedId: string })[];
  academicYear: string;
}

// Fetch all temporary students
export const useTempStudents = () => {
  return useQuery({
    queryKey: ["tempStudents"],
    queryFn: () => get("/api/tempstudents"),
  });
};

// Fetch departments
export const useDepartments = () => {
  return useQuery({
    queryKey: ["departments"],
    queryFn: () => get("/api/departments"),
  });
};

// Generate IDs for temporary students
export const useGenerateIds = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: GenerateIdsPayload) => {
      const response = await post("/api/tempstudents/generate-ids", payload);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tempStudents"] });
    },
  });
};

// Add a new temporary student
export const useAddTempStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (student: Omit<TempStudent, "id" | "tempId">) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/temp-students`,
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

      return response.json() as Promise<TempStudent>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tempStudents"] });
    },
  });
};
