import { useQuery } from "@tanstack/react-query";
import { getStudent } from "../queries/getStudent";

export const useStudent = () => {
  return useQuery({
    queryKey: ['students'],
    queryFn: getStudent,
    staleTime: 1000 * 60 * 5, 
  });
};

