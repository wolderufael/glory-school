import { useQuery } from "@tanstack/react-query";
import { getDepartment } from "../queries/getDepartment";

/* export const useDepartment = (departmentId: number) => {
    return useQuery({
        queryKey: ['studentCount', departmentId],
        queryFn: () => getDepartment(departmentId),
        refetchOnWindowFocus: false,
        retry: 1,
        staleTime: 1000 * 60 * 5,
    }); }
*/
export const useDepartment = () => {
  return useQuery({
    queryKey: ["studentCount"],
    queryFn: () => getDepartment(),
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });
};
