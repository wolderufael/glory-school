import { useQuery } from "@tanstack/react-query";
import { getStudentAssessment } from "../queries/getStudentAssessment";
import { StudentAssessment } from "../../../types/assessment";

export function useStudentAssessment(studentId: number) {
  return useQuery<StudentAssessment[], Error>({
    queryKey: ["assessment", studentId],
    queryFn: () => getStudentAssessment(studentId),
    enabled: !!studentId,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: (failureCount, error) => {
      if (error instanceof Error && error.message.includes("Network Error")) {
        return failureCount < 2;
      }
      return false;
    },
  });
}
