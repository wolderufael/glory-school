import { useQuery } from "@tanstack/react-query";
import { getStudentInfo } from "../queries/getStudentInfo";

export const useStudentInfo = () => {
  return useQuery({
    queryKey: ["studentInfo"],
    queryFn: () => getStudentInfo(),
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });
};
