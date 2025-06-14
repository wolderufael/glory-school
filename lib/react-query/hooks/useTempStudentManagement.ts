import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface TempStudent {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  department: string;
  tempId?: string;
}

// Fetch all temporary students
export const useTempStudents = () => {
  return useQuery({
    queryKey: ["tempStudents"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/temp-students`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch temporary students");
      }
      return response.json() as Promise<TempStudent[]>;
    },
  });
};

// Generate IDs for temporary students
export const useGenerateIds = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/temp-students/generate-ids`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate IDs");
      }

      return response.json() as Promise<TempStudent[]>;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["tempStudents"], data);
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
