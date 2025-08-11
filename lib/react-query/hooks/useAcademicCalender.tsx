import { useQuery } from "@tanstack/react-query";
import { getAcademicCalender } from "../queries/getAcademicCalender";
import { AcademicYear } from "@/types/types";

export const useAcademicCalender = () => {
  return useQuery({
    queryKey: ["academicCalender"],
    queryFn: getAcademicCalender as () => Promise<AcademicYear[]>,
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });
};
