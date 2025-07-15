import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Student } from "@/types/types";
import { getLocalStorage, setLocalStorage } from "@/utils/localStorage";

interface ReregistrationRequest {
  studentId: string;
  academicSemesterId: number;
  academicYearId: number;
  currentStudyingLevel: string;
  currentStudyingYear: string;
  currentStudyingSemester: string;
}

interface ReregistrationResponse {
  success: boolean;
  message: string;
  registrationId?: string;
}

const reregisterStudent = async (
  data: ReregistrationRequest
): Promise<Student> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/students/re-register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  const mockResponse = {
    success: true,
    message: "Reregistration successful! You are now registered for the next semester.",
  };

  return response.json();
};

export const useUpdateReregistration = (studentId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reregisterStudent,
    onSuccess: (data: Student) => {
      setLocalStorage("currentStudyingLevel", data.currentStudyingLevel.toString());
      setLocalStorage("currentStudyingYear", data.currentStudyingYear.toString());
      setLocalStorage("currentStudyingSemester", data.currentStudyingSemester.toString());
      toast.success(
          "Reregistration successful! You are now registered for the next semester."
      );

      // Invalidate and refetch reregistration status
      queryClient.invalidateQueries({
        queryKey: ["reregistration-status"],
      });

      // Invalidate student data queries to refresh overall status
      queryClient.invalidateQueries({
        queryKey: ["student"],
      });
    },
    onError: (error: Error) => {
      console.error("Reregistration error:", error);
      toast.error(
        error.message ||
          "Reregistration failed. Please try again or contact the registrar office."
      );
    },
  });
};
