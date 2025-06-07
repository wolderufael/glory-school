import { useQuery } from "@tanstack/react-query";
import { getStudent, getStudentForMarkList } from "../queries/getStudent";

interface UseStudentParams {
  teacherId: string;
  academicYearId: string;
  semesterId: string;
  level: string;
  departmentId: string;
  sectionId: string;
  moduleId: string;
}

export const useStudent = (params: UseStudentParams) => {
  const areParamsReady = Object.values(params).every((value) => value !== "");

  return useQuery({
    queryKey: ["students", params],
    queryFn: () =>
      getStudentForMarkList(
        params.teacherId,
        params.academicYearId,
        params.semesterId,
        params.level,
        params.departmentId,
        params.sectionId,
        params.moduleId
      ),
    enabled: areParamsReady,
    staleTime: 1000 * 60 * 5,
  });
};
