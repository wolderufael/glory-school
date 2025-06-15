import { useQuery } from "@tanstack/react-query";
import { getSlip } from "../queries/getSlip";
import { StudentRegistration } from "@/components/dashboard/registration/course-registration";

export function useSlip(studentId: string) {
  return useQuery<StudentRegistration[], Error>({
    queryKey: ["slip", studentId],
    queryFn: () => getSlip(studentId),
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
