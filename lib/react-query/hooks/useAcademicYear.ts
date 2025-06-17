import { useQuery } from "@tanstack/react-query";
import { getSection } from "../queries/getSection";

export const useGetSection = () => {
  return useQuery({
    queryKey: ["academicYear"],
    queryFn: getSection,
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });
};
