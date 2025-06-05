import { useQuery } from "@tanstack/react-query";
import { Teacher, getTeachers } from "../queries/getTeachers";

interface UseTeachersOptions {
  departmentId: string;
  searchQuery?: string;
  enabled?: boolean;
}

export const useTeachers = ({
  departmentId,
  searchQuery = "",
  enabled = true,
}: UseTeachersOptions) => {
  return useQuery<Teacher[], Error>({
    queryKey: ["teachers", departmentId, searchQuery],
    queryFn: () => getTeachers(departmentId),
    enabled: Boolean(departmentId && enabled),
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
