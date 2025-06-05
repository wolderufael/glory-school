import { useQuery } from "@tanstack/react-query";
import { Course, getCourses } from "../queries/getCourses";

interface UseCoursesOptions {
  departmentId: string;
  levelId: string;
  sectionId: string;
  academicSemesterId: string;
}

export const useCourses = ({
  departmentId,
  levelId,
  sectionId,
  academicSemesterId,
}: UseCoursesOptions) => {
  return useQuery<Course[], Error>({
    queryKey: ["courses", departmentId, levelId, sectionId, academicSemesterId],
    queryFn: () =>
      getCourses(departmentId, levelId, sectionId, academicSemesterId),
    enabled: Boolean(
      departmentId && levelId && sectionId && academicSemesterId
    ),
    staleTime: 1000 * 60 * 30, // 30 minutes before data is considered stale
    gcTime: 1000 * 60 * 60 * 24, // Keep unused data in cache for 24 hours
    refetchOnWindowFocus: false,
    refetchOnReconnect: false, // Don't refetch on reconnect
    refetchOnMount: false, // Don't refetch on component mount if data exists
    retry: (failureCount, error) => {
      // Only retry twice for network errors, don't retry for 4xx errors
      if (error instanceof Error && error.message.includes("Network Error")) {
        return failureCount < 2;
      }
      return false;
    },
  });
};
