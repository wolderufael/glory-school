import { useQuery } from "@tanstack/react-query";
import { getSection, Section } from "../queries/getSection";

export function useSection(departmentId: string,level:string) {
  return useQuery<Section[], Error>({
    queryKey: ["section", departmentId,level],
    queryFn: () => getSection(departmentId,level),
    enabled: !!departmentId,
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
