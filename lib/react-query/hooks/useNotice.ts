import { useQuery } from "@tanstack/react-query";
import { Notice, getNotice } from "../queries/getNotice";

interface UseNoticeParams {
  collegeId?: number;
  departmentId?: number;
}

export const useNotice = (params: UseNoticeParams = {}) => {
  return useQuery<Notice[], Error>({
    queryKey: ["notices", params],
    queryFn: () => getNotice(params),
    enabled: true,
    staleTime: 1000 * 60 * 30, // 30 minutes
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: (failureCount, error) => {
      if (error.message.includes("Network Error")) {
        return failureCount < 2;
      }
      return false;
    },
  });
};
