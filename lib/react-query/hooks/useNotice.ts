import { useQuery } from "@tanstack/react-query";
import {  Notice, fetchMessages, getNotice } from "../queries/getNotice";

interface UseNoticeParams {
  collegeId?: number;
  departmentId?: number;
}

interface useMessageParams  {
  userId?: number;
  userType?: string;
}



export const useNotice = (params: UseNoticeParams = {}) => {
  return useQuery<Notice[], Error>({
    queryKey: ["notices", params],
    queryFn: () => getNotice(),
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


export const useMessage = (params: useMessageParams = {}) => {
  return useQuery<Notice[], Error>({
    queryKey: ["userMessages", params],
    queryFn: () => {
      if (params.userId !== undefined && params.userType !== undefined) {
        return fetchMessages({ userId: params.userId, userType: params.userType });
      }
      // Return a resolved promise with an empty array or handle as needed
      return Promise.resolve([]);
    },
    enabled: Boolean(params.userId && params.userType),
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: (failureCount, error) => {
      return error.message.includes("Network Error") && failureCount < 2;
    },
  });
};
